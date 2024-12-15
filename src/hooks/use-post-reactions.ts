import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from './use-toast';

export const usePostReactions = (postId: string, userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reactions, isLoading } = useQuery({
    queryKey: ['post-reactions', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_likes')
        .select(`
          id,
          user_id,
          reaction_type,
          profiles (
            pseudo,
            image_profile
          )
        `)
        .eq('post_id', postId);

      if (error) throw error;
      return data;
    },
    staleTime: 30000,
  });

  const addReaction = async (type: string) => {
    try {
      const { error } = await supabase
        .from('post_likes')
        .upsert([
          { 
            post_id: postId, 
            user_id: userId,
            reaction_type: type
          }
        ]);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['post-reactions'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      toast({
        title: "Réaction ajoutée",
        description: "Votre réaction a été ajoutée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter votre réaction",
        variant: "destructive",
      });
    }
  };

  const removeReaction = async () => {
    try {
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .match({ post_id: postId, user_id: userId });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['post-reactions'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      toast({
        title: "Réaction retirée",
        description: "Votre réaction a été retirée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de retirer votre réaction",
        variant: "destructive",
      });
    }
  };

  return {
    reactions,
    isLoading,
    addReaction,
    removeReaction
  };
};