import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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
