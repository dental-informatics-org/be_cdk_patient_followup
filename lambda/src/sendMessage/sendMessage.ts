import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sendMessageService } from '../services/sendMessageService';
import { SendMessage } from '../model/receveMessage';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let message: SendMessage | undefined;
  if (!event.body) {
    const resolver = event as unknown as SendMessage;
    if (resolver.to) {
      message = resolver;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Body is required' })
      };
    }
  }
  if (message) {
    console.log('depois do if');
    try {
      const response = await sendMessageService(message);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Message Enviada`, response })
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error })
      };
    }
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'erro ao enviar a mensagem' })
  };
};
