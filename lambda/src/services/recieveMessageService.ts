import { ReceveMessage } from '../model/receveMessage';

export const recieveMessageService = async (message: ReceveMessage) => {
  const messageValidation: Validator<ReceveMessage> = {
    messaging_product: {
      type: '',
      required: false
    },
    to: {
      type: '',
      required: false
    },
    type: {
      type: '',
      required: false
    },
    recipient_type: {
      type: '',
      required: false
    },
    template: {
      type: '',
      required: false
    }
  };
  const validatot = validateObject(message, messageValidation);
  console.log(validatot);
  return {
    body: 'Message received successfully',
    statusCode: 200
  };
};
