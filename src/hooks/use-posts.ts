import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from 'react';
import { useToast } from './use-toast';

export const usePosts = (userId: string, profileFeed = false) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery({
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
      return data;
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
          toast({
            title: "Nouvelle publication",
            description: "Une nouvelle publication a été ajoutée",
          });
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  return {
    posts,
    isLoading
  };
};