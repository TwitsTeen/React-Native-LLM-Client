export interface Message {
  id: string;
  text: string;
  isSender: boolean;
  timestamp?: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  title: string;
  createdAt: Date;
}
