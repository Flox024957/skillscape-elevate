import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { FriendSuggestionList } from './FriendSuggestionList';

interface FriendSuggestionsProps {
  userId: string;
}

export const FriendSuggestions = ({ userId }: FriendSuggestionsProps) => {
  const { toast } = useToast();

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['friend-suggestions', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('friend_suggestions')
        .select(`
          suggested_friend_id,
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

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Suggestions d'amis</h3>
      <FriendSuggestionList
        suggestions={suggestions || []}
        onSendRequest={sendFriendRequest}
        onDismiss={dismissSuggestion}
      />
    </div>
  );
};