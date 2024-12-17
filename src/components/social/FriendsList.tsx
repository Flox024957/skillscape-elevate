import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Friend {
  id: string;
  pseudo: string;
  image_profile: string;
}

interface FriendsListProps {
  userId: string;
  variant?: 'full' | 'compact';
}

const FriendItem = memo(({ friend, variant, onClick }: { friend: Friend, variant: 'full' | 'compact', onClick: () => void }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (variant === 'compact') {
    return (
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className="w-full flex items-center gap-2 hover:bg-muted/50 p-2 rounded-lg transition-colors"
      >
        <Avatar className="h-8 w-8">
          <img 
            src={friend.image_profile || '/placeholder.svg'} 
            alt={friend.pseudo}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </Avatar>
        <span className="text-sm truncate">{friend.pseudo}</span>
      </motion.button>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center justify-between p-3 bg-card/50 backdrop-blur-sm rounded-lg",
        isMobile && "shadow-sm"
      )}
    >
      <button 
        onClick={onClick}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <Avatar className={cn(
          "border-2 border-border",
          isMobile ? "h-10 w-10" : "h-12 w-12"
        )}>
          <img 
            src={friend.image_profile || '/placeholder.svg'} 
            alt={friend.pseudo}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">{friend.pseudo}</h3>
        </div>
      </button>
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "default"}
        onClick={() => navigate(`/profile/${friend.id}`)}
        className="text-xs"
      >
        Voir le profil
      </Button>
    </motion.div>
  );
});

FriendItem.displayName = 'FriendItem';

export const FriendsList = ({ userId, variant = 'full' }: FriendsListProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
      
      return acceptedFriends
        .map(f => f.friend)
        .filter(friend => friend !== null) as Friend[];
    },
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-accent/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!friends?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>Aucun ami pour le moment</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/social')}
        >
          Découvrir des personnes
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="space-y-2">
        {friends.map((friend) => (
          <FriendItem 
            key={friend.id} 
            friend={friend} 
            variant="compact" 
            onClick={() => navigate(`/profile/${friend.id}`)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {friends.map((friend) => (
        <FriendItem 
          key={friend.id} 
          friend={friend} 
          variant="full"
          onClick={() => navigate(`/profile/${friend.id}`)}
        />
      ))}
    </div>
  );
};