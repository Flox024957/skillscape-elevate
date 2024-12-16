import { AuthUser } from './auth';
import { Profile } from './profiles';
import { Post, PostLike, PostComment } from './posts';
import { Message } from './messages';
import { Friendship } from './friendships';
import { UserDream } from './dreams';

export * from './auth';
export * from './profiles';
export * from './posts';
export * from './messages';
export * from './friendships';
export * from './dreams';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      posts: {
        Row: Post;
        Insert: Partial<Post>;
        Update: Partial<Post>;
      };
      messages: {
        Row: Message;
        Insert: Partial<Message>;
        Update: Partial<Message>;
      };
      friendships: {
        Row: Friendship;
        Insert: Partial<Friendship>;
        Update: Partial<Friendship>;
      };
      user_dreams: {
        Row: UserDream;
        Insert: Partial<UserDream>;
        Update: Partial<UserDream>;
      };
    };
  };
};