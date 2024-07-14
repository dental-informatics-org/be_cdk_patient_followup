import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createTemplateService } from '../../services/createTemplateService';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Body is required' })
    };
  }
  const body = JSON.parse(event.body);
  try {
    const response = createTemplateService(body);
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Invalid JSON' })
    };
  }
};
