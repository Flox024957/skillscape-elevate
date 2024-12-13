import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Friend {
  id: string;
  pseudo: string;
  image_profile: string;
}

interface FriendsListProps {
  userId: string;
  variant?: 'full' | 'compact';
}

export const FriendsList = ({ userId, variant = 'full' }: FriendsListProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
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

      if (error) {
        console.error('Error fetching friends:', error);
        return;
      }

      setFriends(acceptedFriends.map(f => f.friend));
      setLoading(false);
    };

    fetchFriends();
  }, [userId]);

  if (loading) {
    return <div>Chargement des amis...</div>;
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <img src={friend.image_profile || '/placeholder.svg'} alt={friend.pseudo} />
            </Avatar>
            <span className="text-sm">{friend.pseudo}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <img src={friend.image_profile || '/placeholder.svg'} alt={friend.pseudo} />
            </Avatar>
            <div>
              <h3 className="font-medium">{friend.pseudo}</h3>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Message
          </Button>
        </div>
      ))}
    </div>
  );
};