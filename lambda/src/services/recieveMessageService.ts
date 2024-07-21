import {
  CreateScheduleCommand,
  CreateScheduleCommandInput,
  SchedulerClient
} from '@aws-sdk/client-scheduler';
import { ReceiveMessageRequest, SendMessageBody } from '../model/receveMessage';

const { IAM_ROLE, LAMBDA_SEND_MESSAGE } = process.env;

const eventBridgeClient = new SchedulerClient({ region: 'us-east-2' });

export const recieveMessageService = async (event: ReceiveMessageRequest) => {
  const dates: Date[] = [];

  const dateNow = new Date();
  const lastDate = new Date(event.date);
  const difference = lastDate.getTime() - dateNow.getTime();
  const interval = difference / (event.recurrence - 1);
  dates.push(dateNow);
  for (let i = 1; i < event.recurrence - 1; i++) {
    let intermediateDate = new Date(dateNow.getTime() + interval * i);
    dates.push(intermediateDate);
  }
  dates.push(lastDate);

  try {
    for (let i = 0; i < dates.length; i++) {
      const sendMessage: SendMessageBody = {
        paciente_name: event.paciente_name,
        position: i + 1,
        schedule: `at(${dates[i].toLocaleDateString('en-CA').replace(/\//g, '-')}T${dates[i].toLocaleTimeString('pt-BR')})`,
        sendMessage: event.sendmessage
      };
      await createScheduler(sendMessage);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'mensagem enviada' })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error })
    };
  }
};

const createScheduler = async (event: SendMessageBody) => {
  const date = new Date();
  const ruleParams: CreateScheduleCommandInput = {
    Name: `${event.paciente_name}_${event.sendMessage.to}.${event.position}.${date.getTime()}`.replace(
      /\b(\s)\b/g,
      '_'
    ),
    ScheduleExpression: event.schedule,
    State: 'ENABLED',
    Target: {
      Arn: LAMBDA_SEND_MESSAGE,
      RoleArn: IAM_ROLE,
      Input: JSON.stringify(event.sendMessage)
    },
    ActionAfterCompletion: 'DELETE',
    FlexibleTimeWindow: { Mode: 'OFF' }
  };
  try {
    const createRuleCommand = new CreateScheduleCommand(ruleParams);
    const ruleResponse = await eventBridgeClient.send(createRuleCommand);
    console.log(ruleResponse);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: ruleResponse })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error })
    };
  }
};
