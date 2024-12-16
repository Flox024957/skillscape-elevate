import { useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from 'react';

export const useLikes = (postId: string, currentUserId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('post_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
          filter: `post_id=eq.${postId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, queryClient]);

  const handleLike = async (isLiked: boolean) => {
    try {
      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUserId);
      } else {
        await supabase
          .from('post_likes')
          .insert([{ post_id: postId, user_id: currentUserId }]);
      }
      
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: "Erreur",
        description: "Impossible de liker la publication",
        variant: "destructive",
      });
    }
  };

  return { handleLike };
};