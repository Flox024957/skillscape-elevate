export * from './auth';
export * from './profiles';
export * from './posts';
export * from './messages';
export * from './friendships';

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
    };
  };
};