import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Post } from '@/components/social/Post';
import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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
  profileFeed?: boolean;
}

const MemoizedPost = memo(Post);

export const NewsFeed = ({ userId, profileFeed = false }: NewsFeedProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [hasNewPosts, setHasNewPosts] = useState(false);
  
  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['posts', userId, profileFeed],
    queryFn: async () => {
      let query = supabase
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

      if (profileFeed) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

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
        () => {
          setHasNewPosts(true);
          toast({
            title: "Nouvelle publication",
            description: "De nouveaux contenus sont disponibles",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleRefresh = async () => {
    await refetch();
    setHasNewPosts(false);
    toast({
      title: "Fil d'actualité mis à jour",
      description: "Les dernières publications ont été chargées",
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="h-12 bg-accent/20 rounded-lg w-3/4"></div>
            <div className="h-48 bg-accent/20 rounded-lg"></div>
            <div className="h-8 bg-accent/20 rounded-lg w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Aucune publication</h3>
        <p className="text-muted-foreground">
          {profileFeed 
            ? "Vous n'avez pas encore publié de contenu"
            : "Commencez à suivre des personnes pour voir leurs publications"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hasNewPosts && (
        <Button
          className="w-full gap-2"
          variant="outline"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
          Nouvelles publications disponibles
        </Button>
      )}
      
      <div className="space-y-4 p-4">
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <MemoizedPost post={post} currentUserId={userId} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};