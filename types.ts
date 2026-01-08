export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface FAQRule {
  id: string;
  keywords: string[];
  answer: string;
  category: string;
}

export enum ChatStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  TYPING = 'TYPING',
}
