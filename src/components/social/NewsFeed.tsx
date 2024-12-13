import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Post } from './Post';
import { Loader2 } from 'lucide-react';

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
          profiles:user_id (
            pseudo,
            image_profile
          ),
          post_likes (
            user_id
          ),
          post_comments (
            id,
            content,
            user_id,
            created_at,
            profiles:user_id (
              pseudo,
              image_profile
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <Post key={post.id} post={post} currentUserId={userId} />
      ))}
    </div>
  );
};