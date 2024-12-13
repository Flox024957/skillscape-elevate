import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, UserMinus, UserX, Check, Loader2 } from 'lucide-react';

interface FriendshipButtonProps {
  currentUserId: string | null;
  friendshipStatus: {
    status: 'not_friends' | 'pending_sent' | 'pending_received' | 'accepted';
    friendshipId?: string;
  };
  targetUserId: string;
}

export const FriendshipButton = ({ currentUserId, friendshipStatus, targetUserId }: FriendshipButtonProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('friendships')
        .insert([{
          user_id: currentUserId,
          friend_id: targetUserId,
          status: 'pending'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', targetUserId, currentUserId] });
      toast({
        title: "Demande envoyée",
        description: "Votre demande d'ami a été envoyée avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande d'ami",
        variant: "destructive",
      });
    },
  });

  const acceptFriendRequestMutation = useMutation({
    mutationFn: async () => {
      if (!friendshipStatus?.friendshipId) return;
      
      const { error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('id', friendshipStatus.friendshipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', targetUserId, currentUserId] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast({
        title: "Ami ajouté",
        description: "Vous êtes maintenant amis",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'accepter la demande d'ami",
        variant: "destructive",
      });
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: async () => {
      if (!friendshipStatus?.friendshipId) return;
      
      const { error } = await supabase
        .from('friendships')
        .delete()
        .eq('id', friendshipStatus.friendshipId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', targetUserId, currentUserId] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      toast({
        title: "Ami retiré",
        description: "L'utilisateur a été retiré de vos amis",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de retirer l'ami",
        variant: "destructive",
      });
    },
  });

  switch (friendshipStatus?.status) {
    case 'not_friends':
      return (
        <Button
          onClick={() => sendFriendRequestMutation.mutate()}
          disabled={sendFriendRequestMutation.isPending}
          className="w-full"
        >
          {sendFriendRequestMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <UserPlus className="h-4 w-4 mr-2" />
          )}
          Ajouter en ami
        </Button>
      );
    case 'pending_sent':
      return (
        <Button
          variant="secondary"
          onClick={() => removeFriendMutation.mutate()}
          disabled={removeFriendMutation.isPending}
          className="w-full"
        >
          {removeFriendMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <UserX className="h-4 w-4 mr-2" />
          )}
          Annuler la demande
        </Button>
      );
    case 'pending_received':
      return (
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => acceptFriendRequestMutation.mutate()}
            disabled={acceptFriendRequestMutation.isPending}
            className="w-full"
          >
            {acceptFriendRequestMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Accepter
          </Button>
          <Button
            variant="destructive"
            onClick={() => removeFriendMutation.mutate()}
            disabled={removeFriendMutation.isPending}
            className="w-full"
          >
            {removeFriendMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <UserX className="h-4 w-4 mr-2" />
            )}
            Refuser
          </Button>
        </div>
      );
    case 'accepted':
      return (
        <Button
          variant="destructive"
          onClick={() => removeFriendMutation.mutate()}
          disabled={removeFriendMutation.isPending}
          className="w-full"
        >
          {removeFriendMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <UserMinus className="h-4 w-4 mr-2" />
          )}
          Retirer des amis
        </Button>
      );
    default:
      return null;
  }
};