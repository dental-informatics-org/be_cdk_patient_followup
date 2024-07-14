import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { policies } from '../policies/policies';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { environment } from '../lambda/config/env/config';

export class BeCdkPatientFollowupStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iamROle = new iam.Role(this, 'ZwilioRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.ServicePrincipal('scheduler.amazonaws.com'),
        new iam.ServicePrincipal('events.amazonaws.com'),
        new iam.ServicePrincipal('cloudformation.amazonaws.com')
      ),
      roleName: 'ZwilioRole'
    });

    policies.forEach((policy) => {
      const policyStatement = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: Array.isArray(policy.Action) ? policy.Action : [policy.Action],
        resources: Array.isArray(policy.Resource)
          ? policy.Resource
          : [policy.Resource]
      });
      iamROle.addToPolicy(policyStatement);
    });

    const lambdaWebhookMeta = new lambda.Function(this, 'webhookmeta', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda', {
        exclude: ['dist', 'node_modules']
      }),
      environment: environment,
      handler: 'src/meta/webhook/webhook.handler',
      role: iamROle,
      retryAttempts: 0
    });

    const lambdaRecieveMessage = new lambda.Function(this, 'receivemessage', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda', {
        exclude: ['dist', 'node_modules']
      }),
      handler: 'src/recieveMessage/recieveMessage.handler',
      environment: environment,
      role: iamROle,
      retryAttempts: 0
    });

    const lambdaCreatetemplate = new lambda.Function(this, 'createtemplate', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda', {
        exclude: ['dist', 'node_modules']
      }),
      handler: 'src/meta/template/createTemplate.handler',
      environment: environment,
      role: iamROle,
      retryAttempts: 0
    });

    const api = new apigw.RestApi(this, 'Endpoint', {
      defaultMethodOptions: {
        authorizationType: apigw.AuthorizationType.NONE,
        apiKeyRequired: false
      }
    });

    const metaResource = api.root.addResource('meta');
    const metaTemplate = api.root.addResource('template');
    const messageResource = api.root.addResource('message');

    const postIntegrationMetaWebhool = new apigw.LambdaIntegration(
      lambdaWebhookMeta
    );
    const psotInterationMetaTemplate = new apigw.LambdaIntegration(
      lambdaCreatetemplate
    );
    const postIntegrationReceiveMessage = new apigw.LambdaIntegration(
      lambdaRecieveMessage
    );

    metaTemplate.addMethod('POST', psotInterationMetaTemplate);
    messageResource.addMethod('POST', postIntegrationReceiveMessage);
    metaResource.addMethod('POST', postIntegrationMetaWebhool);
    metaResource.addMethod('GET', postIntegrationMetaWebhool);
  }
}
