export interface Template {
  name: string;
  category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';
  allow_category_change?: boolean;
  language: string;
  components: Components[];
}

export interface Components {
  type: 'BODY' | 'HEADER' | 'FOOTER' | 'BUTTONS';
  format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LOCATION';
  text?: TextComponent;
  example?: ExampleComponent;
  buttons?: ButtonComponent[];
  image?: MediaComponent;
  video?: MediaComponent;
  document?: MediaComponent;
}

export interface TextComponent {
  text: string;
  example?: { [key: string]: string[] | string[][] };
}

export interface MediaComponent {
  link?: string;
}

export interface ExampleComponent {
  header_text?: string[];
  header_handle?: string[];
  body_text?: string[][];
}

export interface ButtonComponent {
  type: 'PHONE_NUMBER' | 'URL' | 'QUICK_REPLY' | 'COPY_CODE' | 'FLOW';
  text: string;
  phone_number?: string;
  url?: string;
  example?: string[];
  flow_id?: string;
  flow_action?: 'navigate' | 'data_exchange';
  navigate_screen?: string;
}
