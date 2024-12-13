export type Friendship = {
  id: string;
  user_id: string | null;
  friend_id: string | null;
  status: string;
  created_at: string;
};