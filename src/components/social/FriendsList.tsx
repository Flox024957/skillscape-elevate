import { useEffect, useState, memo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';

interface Friend {
  id: string;
  pseudo: string;
  image_profile: string;
}

interface FriendsListProps {
  userId: string;
  variant?: 'full' | 'compact';
}

const FriendItem = memo(({ friend, variant }: { friend: Friend, variant: 'full' | 'compact' }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <img 
            src={friend.image_profile || '/placeholder.svg'} 
            alt={friend.pseudo}
            loading="lazy"
          />
        </Avatar>
        <span className="text-sm">{friend.pseudo}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-card rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <img 
            src={friend.image_profile || '/placeholder.svg'} 
            alt={friend.pseudo}
            loading="lazy"
          />
        </Avatar>
        <div>
          <h3 className="font-medium">{friend.pseudo}</h3>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        Message
      </Button>
    </div>
  );
});

FriendItem.displayName = 'FriendItem';

export const FriendsList = ({ userId, variant = 'full' }: FriendsListProps) => {
  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends', userId],
    queryFn: async () => {
      const { data: acceptedFriends, error } = await supabase
        .from('friendships')
        .select(`
          friend:profiles!friendships_friend_id_fkey(
            id,
            pseudo,
            image_profile
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'accepted');

      if (error) throw error;
      return acceptedFriends.map(f => f.friend);
    },
    staleTime: 30000, // Cache pendant 30 secondes
  });

  if (isLoading) {
    return <div className="animate-pulse">Chargement des amis...</div>;
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {friends?.map((friend) => (
          <FriendItem key={friend.id} friend={friend} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friends?.map((friend) => (
        <FriendItem key={friend.id} friend={friend} variant="full" />
      ))}
    </div>
  );
};