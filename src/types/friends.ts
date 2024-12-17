export interface Friend {
  id: string;
  pseudo: string;
  image_profile: string | null;
}

export interface FriendRequest {
  id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  friend: Friend;
}