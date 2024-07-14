export interface Template {
  name: string;
  category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';
  allow_category_change?: boolean;
  language: string;
  components: Components[];
}

export interface Components {
  type: 'BODY' | 'HEADER' | 'FOOTER' | 'BUTTON';
  text?: TextComponent;
  button?: ButtonComponent;
  image?: ImageComponent;
}

export interface TextComponent {
  text: string;
}

export interface ButtonComponent {
  type: 'QUICK_REPLY' | 'URL';
  title: string;
  payload?: string;
  url?: string;
}

export interface ImageComponent {
  link: string;
}
