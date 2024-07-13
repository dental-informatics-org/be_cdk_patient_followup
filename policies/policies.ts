export const policies = [
  {
    Effect: 'Allow',
    Resource: 'arn:aws:scheduler:us-east-2:851725500352:schedule/default/*',
    Action: 'scheduler:CreateSchedule'
  },
  {
    Effect: 'Allow',
    Action: ['lambda:InvokeFunction'],
    Resource: 'arn:aws:lambda:us-east-2:851725500352:function:*'
  },
  {
    Effect: 'Allow',
    Resource: 'arn:aws:iam::851725500352:role/ZwilioRole',
    Action: 'sts:AssumeRole'
  },
  {
    Effect: 'Allow',
    Resource: 'arn:aws:iam::851725500352:role/ZwilioRole',
    Action: 'iam:PassRole'
  },
  {
    Effect: 'Allow',
    Resource: '*',
    Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents']
  }
];
