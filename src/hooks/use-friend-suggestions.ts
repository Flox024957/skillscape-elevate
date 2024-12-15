import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from './use-toast';

export const useFriendSuggestions = (userId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['friend-suggestions', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('friend_suggestions')
        .select(`
          suggested_friend_id,
          score,
          profiles!friend_suggestions_suggested_friend_id_fkey(
            id,
            pseudo,
            image_profile,
            current_job
          )
        `)
        .eq('user_id', userId)
        .order('score', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    staleTime: 30000,
  });

  const sendFriendRequest = async (friendId: string) => {
    try {
      const { error } = await supabase
        .from('friendships')
        .insert([
          { user_id: userId, friend_id: friendId, status: 'pending' }
        ]);

      if (error) throw error;

      // Créer une notification pour l'utilisateur ciblé
      await supabase
        .from('notifications')
        .insert([{
          user_id: friendId,
          type: 'friend_request',
          content: 'Vous avez reçu une nouvelle demande d\'ami',
          link: `/profile/${userId}`
        }]);

      queryClient.invalidateQueries({ queryKey: ['friend-suggestions'] });
      
      toast({
        title: "Demande envoyée",
        description: "Votre demande d'ami a été envoyée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande d'ami",
        variant: "destructive",
      });
    }
  };

  const dismissSuggestion = async (friendId: string) => {
    try {
      const { error } = await supabase
        .from('friend_suggestions')
        .delete()
        .match({ user_id: userId, suggested_friend_id: friendId });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['friend-suggestions'] });
      
      toast({
        title: "Suggestion ignorée",
        description: "La suggestion a été retirée de votre liste",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ignorer la suggestion",
        variant: "destructive",
      });
    }
  };

  return {
    suggestions,
    isLoading,
    sendFriendRequest,
    dismissSuggestion
  };
};