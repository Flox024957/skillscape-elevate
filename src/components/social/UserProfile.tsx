import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserSkills } from './UserSkills';
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPlus, UserMinus, UserX, Check, Loader2 } from 'lucide-react';

interface UserProfileProps {
  userId: string;
}

interface Profile {
  pseudo: string;
  image_profile: string;
  description: string;
  current_job: string;
  dream_job: string;
}

interface FriendshipStatus {
  status: 'not_friends' | 'pending_sent' | 'pending_received' | 'accepted';
  friendshipId?: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
      setIsCurrentUser(user?.id === userId);
    };
    checkCurrentUser();
  }, [userId]);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('pseudo, image_profile, description, current_job, dream_job')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  const { data: friendshipStatus, isLoading: friendshipLoading } = useQuery({
    queryKey: ['friendshipStatus', userId, currentUserId],
    queryFn: async () => {
      if (!currentUserId || isCurrentUser) return { status: 'not_friends' as const };

      const { data: sentRequest } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('user_id', currentUserId)
        .eq('friend_id', userId)
        .single();

      if (sentRequest) {
        return {
          status: sentRequest.status as FriendshipStatus['status'],
          friendshipId: sentRequest.id
        };
      }

      const { data: receivedRequest } = await supabase
        .from('friendships')
        .select('id, status')
        .eq('user_id', userId)
        .eq('friend_id', currentUserId)
        .single();

      if (receivedRequest) {
        return {
          status: receivedRequest.status as FriendshipStatus['status'],
          friendshipId: receivedRequest.id
        };
      }

      return { status: 'not_friends' as const };
    },
    enabled: !!currentUserId && !isCurrentUser,
  });

  const sendFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('friendships')
        .insert([{
          user_id: currentUserId,
          friend_id: userId,
          status: 'pending'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', userId, currentUserId] });
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
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', userId, currentUserId] });
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
      queryClient.invalidateQueries({ queryKey: ['friendshipStatus', userId, currentUserId] });
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

  const renderFriendshipButton = () => {
    if (isCurrentUser || !currentUserId || friendshipLoading) return null;

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
    }
  };

  if (profileLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-48 bg-muted rounded-lg"></div>
      <div className="h-24 bg-muted rounded-lg"></div>
    </div>;
  }

  if (!profile) {
    return <div className="text-center text-muted-foreground">Profil introuvable</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="h-24 w-24 mx-auto">
            <img src={profile.image_profile || '/placeholder.svg'} alt={profile.pseudo} />
          </Avatar>
          <h2 className="text-xl font-semibold mt-2">{profile.pseudo}</h2>
          {profile.description && (
            <p className="text-muted-foreground">{profile.description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.current_job && (
            <div>
              <h3 className="font-medium">Emploi actuel</h3>
              <p className="text-muted-foreground">{profile.current_job}</p>
            </div>
          )}
          {profile.dream_job && (
            <div>
              <h3 className="font-medium">Emploi rêvé</h3>
              <p className="text-muted-foreground">{profile.dream_job}</p>
            </div>
          )}
          {isCurrentUser ? (
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/edit-profile')}
            >
              Modifier le profil
            </Button>
          ) : (
            renderFriendshipButton()
          )}
        </CardContent>
      </Card>
      
      <UserSkills userId={userId} />
    </div>
  );
};