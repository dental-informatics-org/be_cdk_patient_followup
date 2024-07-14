import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  handleGetRequest,
  handlePostRequest
} from '../../services/webhookService';

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === 'POST') {
    return handlePostRequest(event);
  } else if (event.httpMethod === 'GET') {
    return handleGetRequest(event);
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: `Método ${event} não permitido`
      })
    };
  }
};
