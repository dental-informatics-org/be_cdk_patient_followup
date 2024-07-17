export interface ReceveMessage {
  messaging_product: 'whatsapp';
  to: string;
  type: 'template' | 'text';
  recipient_type: 'individual' | 'group';
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: Components[];
  };
  text?: Text;
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
