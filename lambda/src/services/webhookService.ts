import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

const { WEBHOOK_VERIFY_TOKEN, META_BEARERTOKEN, META_GRAPH_URL } = process.env;
export const handlePostRequest = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body || '{}');
  console.log('Incoming webhook message:', JSON.stringify(body, null, 2));

  const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === 'text') {
    const business_phone_number_id =
      body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    const bodyFetchOne = {
      messaging_product: 'whatsapp',
      to: message.from,
      text: { body: 'Echo: ' + message.text.body },
      context: { message_id: message.id }
    };
    try {
      await fetch(`${META_GRAPH_URL}${business_phone_number_id}/messages`, {
        method: 'POST',
        body: JSON.stringify(bodyFetchOne),
        headers: { Authorization: `Bearer ${META_BEARERTOKEN}` }
      });
      const bodyFetchTwo = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: message.id
      };
      await fetch(`${META_GRAPH_URL}${business_phone_number_id}/messages`, {
        method: 'POST',
        body: JSON.stringify(bodyFetchOne),
        headers: { Authorization: `Bearer ${META_BEARERTOKEN}` }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error processing request' })
      };
    }
  }

  return {
    statusCode: 200,
    body: ''
  };
};

export const handleGetRequest = (
  event: APIGatewayEvent
): APIGatewayProxyResult => {
  const params = event.queryStringParameters || {};
  const mode = params['hub.mode'];
  const token = params['hub.verify_token'];
  const challenge = params['hub.challenge'];
  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    return {
      statusCode: 200,
      body: challenge || ''
    };
  } else {
    return {
      statusCode: 403,
      body: ''
    };
  }
};
