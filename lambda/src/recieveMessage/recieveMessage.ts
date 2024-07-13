import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda';
import { teste } from '../util/teste';

export const handle = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Body is required' })
    };
  }
  try {
    teste();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Agendamento criado` })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Invalid JSON' })
    };
  }
};
