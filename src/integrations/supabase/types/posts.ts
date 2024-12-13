import { Profile } from './profiles';

export type Post = {
  id: string;
  user_id: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  post_likes?: PostLike[];
  post_comments?: PostComment[];
};

export type PostLike = {
  id: string;
  post_id: string | null;
  user_id: string | null;
  created_at: string;
};

export type PostComment = {
  id: string;
  post_id: string | null;
  user_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};