import { SendMessage } from '../model/receveMessage';

const { META_BEARERTOKEN } = process.env;
export const sendMessageService = async (message: SendMessage) => {
  try {
    console.log(message);
    const envite = await fetch(
      'https://graph.facebook.com/v20.0/386635361188949/messages',
      {
        headers: {
          Authorization: `Bearer ${META_BEARERTOKEN}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(message),
        method: 'POST'
      }
    );
    console.log(envite);
    if (envite.status !== 200) {
      throw new Error(envite.statusText);
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
