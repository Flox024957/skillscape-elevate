import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Post } from '@/components/social/Post';
import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

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
    parent_id: string | null;
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
  const { toast } = useToast();
  
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
            parent_id,
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
    staleTime: 30000,
  });

  useEffect(() => {
    const channel = supabase
      .channel('new_posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          toast({
            title: "Nouvelle publication",
            description: "Une nouvelle publication a été ajoutée",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="p-4 text-center animate-pulse space-y-4">
        <div className="h-48 bg-accent/20 rounded-lg"></div>
        <div className="h-48 bg-accent/20 rounded-lg"></div>
        <div className="h-48 bg-accent/20 rounded-lg"></div>
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
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MemoizedPost post={post} currentUserId={userId} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};