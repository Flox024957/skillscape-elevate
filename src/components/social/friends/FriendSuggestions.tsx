import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FriendSuggestionsProps {
  userId: string;
}

export const FriendSuggestions = ({ userId }: FriendSuggestionsProps) => {
  const navigate = useNavigate();
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

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
        <div className="h-16 bg-accent/20 rounded-lg"></div>
      </div>
    );
  }

  if (!suggestions?.length) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Aucune suggestion pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Suggestions d'amis</h3>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.suggested_friend_id}
            className="flex items-center justify-between p-3 bg-card/50 backdrop-blur-sm rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-border">
                <AvatarImage src={suggestion.profiles.image_profile} />
                <AvatarFallback>
                  {suggestion.profiles.pseudo?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{suggestion.profiles.pseudo}</p>
                {suggestion.profiles.current_job && (
                  <p className="text-sm text-muted-foreground">
                    {suggestion.profiles.current_job}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => sendFriendRequest(suggestion.suggested_friend_id)}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};