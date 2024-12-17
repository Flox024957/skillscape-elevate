import { Friend } from './friends';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  profiles: {
    pseudo: string;
    image_profile: string | null;
  };
}

export interface ChatConversation {
  friend: Friend;
  unreadCount: number;
  lastMessage: Message | undefined;
}