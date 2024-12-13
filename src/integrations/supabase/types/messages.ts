export type Message = {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  content: string;
  read: boolean | null;
  created_at: string;
  profiles?: {
    pseudo: string | null;
    image_profile: string | null;
  } | null;
};

export type ChatConversation = {
  friend: {
    id: string;
    pseudo: string | null;
    image_profile: string | null;
  };
  lastMessage?: Message;
  unreadCount: number;
};