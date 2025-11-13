export interface UserMessage {
  role: 'user';
  text?: string;
  imageUrl?: string;
}

export interface ModelMessage {
  role: 'model';
  text: string;
}

export type ChatMessage = UserMessage | ModelMessage;