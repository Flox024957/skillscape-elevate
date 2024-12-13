import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Post } from '@/components/social/Post';
import { memo } from 'react';

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

const MemoizedPost = memo(Post);

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
    staleTime: 30000, // Cache pendant 30 secondes
  });

  if (isLoading) {
    return (
      <div className="p-4 text-center neon-text animate-pulse">
        Chargement des publications...
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Aucune publication pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <MemoizedPost key={post.id} post={post} currentUserId={userId} />
      ))}
    </div>
  );
};