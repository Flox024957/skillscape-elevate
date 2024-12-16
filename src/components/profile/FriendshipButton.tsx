import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";

interface FriendshipButtonProps {
  currentUserId: string;
  targetUserId: string;
}

export const FriendshipButton = ({ currentUserId, targetUserId }: FriendshipButtonProps) => {
  const [status, setStatus] = useState<'not_friends' | 'pending_sent' | 'pending_received' | 'accepted' | 'loading'>('loading');
  const { toast } = useToast();

  useEffect(() => {
    checkFriendshipStatus();
  }, [currentUserId, targetUserId]);

  const checkFriendshipStatus = async () => {
    try {
      const { data: sentRequest } = await supabase
        .from('friendships')
        .select('status')
        .eq('user_id', currentUserId)
        .eq('friend_id', targetUserId)
        .single();

      if (sentRequest) {
        setStatus(sentRequest.status as any);
        return;
      }

      const { data: receivedRequest } = await supabase
        .from('friendships')
        .select('status')
        .eq('user_id', targetUserId)
        .eq('friend_id', currentUserId)
        .single();

      if (receivedRequest) {
        setStatus(receivedRequest.status === 'pending' ? 'pending_received' : receivedRequest.status as any);
        return;
      }

      setStatus('not_friends');
    } catch (error) {
      console.error('Error checking friendship status:', error);
      setStatus('not_friends');
    }
  };

  const sendFriendRequest = async () => {
    try {
      const { error } = await supabase
        .from('friendships')
        .insert([
          { user_id: currentUserId, friend_id: targetUserId, status: 'pending' }
        ]);

      if (error) throw error;

      toast({
        title: "Demande envoyée",
        description: "Votre demande d'ami a été envoyée avec succès",
      });

      setStatus('pending_sent');
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande d'ami",
        variant: "destructive",
      });
    }
  };

  const acceptFriendRequest = async () => {
    try {
      const { error } = await supabase
        .from('friendships')
        .update({ status: 'accepted' })
        .eq('user_id', targetUserId)
        .eq('friend_id', currentUserId);

      if (error) throw error;

      toast({
        title: "Demande acceptée",
        description: "Vous êtes maintenant amis",
      });

      setStatus('accepted');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'accepter la demande d'ami",
        variant: "destructive",
      });
    }
  };

  if (status === 'loading') {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Chargement...
      </Button>
    );
  }

  if (status === 'accepted') {
    return (
      <Button variant="secondary" disabled>
        <UserCheck className="mr-2 h-4 w-4" />
        Amis
      </Button>
    );
  }

  if (status === 'pending_sent') {
    return (
      <Button variant="secondary" disabled>
        <Loader2 className="mr-2 h-4 w-4" />
        Demande envoyée
      </Button>
    );
  }

  if (status === 'pending_received') {
    return (
      <Button onClick={acceptFriendRequest}>
        <UserPlus className="mr-2 h-4 w-4" />
        Accepter la demande
      </Button>
    );
  }

  return (
    <Button onClick={sendFriendRequest}>
      <UserPlus className="mr-2 h-4 w-4" />
      Ajouter en ami
    </Button>
  );
};