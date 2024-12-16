import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useProfileData } from '@/hooks/useProfileData';
import { useFriendshipStatus } from './profile/useFriendshipStatus';
import { LoadingProfile } from './profile/LoadingProfile';
import { ErrorProfile } from './profile/ErrorProfile';
import { ProfileContent } from './profile/ProfileContent';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const { toast } = useToast();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        setIsCurrentUser(user.id === userId);
      }
    };
    checkCurrentUser();
  }, [userId]);

  const { 
    data: profile, 
    isLoading: profileLoading, 
    error: profileError 
  } = useProfileData(userId);

  const { data: friendshipStatus } = useFriendshipStatus(userId, currentUserId);

  const { data: stats } = useQuery({
    queryKey: ['profile-stats', userId],
    queryFn: async () => {
      try {
        const [friendsCount, skillsCount, achievementsCount] = await Promise.all([
          supabase
            .from('friendships')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'accepted')
            .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
            .then(({ count }) => count || 0),
          supabase
            .from('user_skills')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .then(({ count }) => count || 0),
          supabase
            .from('user_achievements')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .then(({ count }) => count || 0)
        ]);

        return { friendsCount, skillsCount, achievementsCount };
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les statistiques du profil",
          variant: "destructive",
        });
        throw error;
      }
    },
    retry: 1,
  });

  if (profileLoading) {
    return <LoadingProfile />;
  }

  if (profileError || !profile) {
    return <ErrorProfile userId={userId} />;
  }

  return (
    <AnimatePresence>
      <ProfileContent 
        profile={profile}
        userId={userId}
        isCurrentUser={isCurrentUser}
        currentUserId={currentUserId}
        friendshipStatus={friendshipStatus}
        stats={stats}
      />
    </AnimatePresence>
  );
};