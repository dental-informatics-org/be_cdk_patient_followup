import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { recieveMessageService } from '../services/recieveMessageService';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Body is required' })
    };
  }
  try {
    const response = await recieveMessageService(JSON.parse(event.body));
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
};
