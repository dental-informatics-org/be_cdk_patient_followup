import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { policies } from '../policies/policies';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

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
      code: lambda.Code.fromAsset('lambda/dist/meta'),
      handler: 'webhook.handler',
      role: iamROle,
      retryAttempts: 0
    });

    const lambdaRecieveMessage = new lambda.Function(this, 'receivemessage', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda/dist/recieveMessage'),
      handler: 'recieveMessage.handler',
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
    const messageResource = api.root.addResource('message');

    const postIntegrationMeta = new apigw.LambdaIntegration(lambdaWebhookMeta);
    const postIntegrationReceiveMessage = new apigw.LambdaIntegration(
      lambdaRecieveMessage
    );

    messageResource.addMethod('POST', postIntegrationReceiveMessage);
    metaResource.addMethod('POST', postIntegrationMeta);
    metaResource.addMethod('GET', postIntegrationMeta);
  }
}
