import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Post } from '@/components/social/Post';

interface PostType {
  id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  updated_at: string;
  user_id: string;
  profiles: {
    pseudo: string;
    image_profile: string;
  };
  post_likes: Array<{
    user_id: string;
  }>;
  post_comments: Array<{
    id: string;
    content: string;
    created_at: string;
    profiles: {
      pseudo: string;
      image_profile: string;
    };
  }>;
}

interface NewsFeedProps {
  userId: string;
}

export const NewsFeed = ({ userId }: NewsFeedProps) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            pseudo,
            image_profile
          ),
          post_likes (
            user_id
          ),
          post_comments (
            id,
            content,
            created_at,
            profiles (
              pseudo,
              image_profile
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PostType[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} currentUserId={userId} />
      ))}
    </div>
  );
};