export interface SendMessageBody {
  paciente_name: string;
  schedule: string;
  position: number;
  sendMessage: SendMessage;
}

export interface ReceiveMessageRequest {
  sendmessage: SendMessage;
  date: Date;
  process_number: number;
  paciente_name: string;
  recurrence: number;
}

export interface SendMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'template' | 'text';
  recipient_type: 'individual' | 'group';
  text?: Text;
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: Components[];
  };
}

export interface Components {
  type: string;
  parameters: Parameters[];
}

export interface Parameters {
  type: 'body' | 'header' | 'button' | 'footer';
  text?: string;
  location?: Location;
  image?: Image;
}

export interface Location {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
}

export interface Image {
  link: string;
}

export interface Current {
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export interface Text {
  body: string;
  preview_url?: boolean;
}
