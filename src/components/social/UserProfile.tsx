import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useProfileData } from '@/hooks/useProfileData';
import { useFriendshipStatus } from './profile/useFriendshipStatus';
import { LoadingProfile } from './profile/LoadingProfile';
import { ErrorProfile } from './profile/ErrorProfile';
import { ProfileContent } from './profile/ProfileContent';
import { AnimatePresence } from 'framer-motion';
import { ProfileStats } from './profile/sections/ProfileStats';
import { useQuery } from '@tanstack/react-query';

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  console.log('UserProfile component mounted with userId:', userId);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user data:', user);
      setCurrentUserId(user?.id || null);
      setIsCurrentUser(user?.id === userId);
    };
    checkCurrentUser();
  }, [userId]);

  const { data: profile, isLoading: profileLoading, error } = useProfileData(userId);
  const { data: friendshipStatus } = useFriendshipStatus(userId, currentUserId);

  // Fetch additional stats
  const { data: friendsCount = 0 } = useQuery({
    queryKey: ['friendsCount', userId],
    queryFn: async () => {
      const { count } = await supabase
        .from('friendships')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'accepted')
        .or(`user_id.eq.${userId},friend_id.eq.${userId}`);
      return count || 0;
    },
  });

  const { data: skillsCount = 0 } = useQuery({
    queryKey: ['skillsCount', userId],
    queryFn: async () => {
      const { count } = await supabase
        .from('user_skills')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
      return count || 0;
    },
  });

  const { data: achievementsCount = 0 } = useQuery({
    queryKey: ['achievementsCount', userId],
    queryFn: async () => {
      const { count } = await supabase
        .from('user_achievements')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);
      return count || 0;
    },
  });

  console.log('Component state:', {
    profile,
    profileLoading,
    error,
    isCurrentUser,
    currentUserId,
    friendshipStatus,
    friendsCount,
    skillsCount,
    achievementsCount
  });

  if (profileLoading) {
    return <LoadingProfile />;
  }

  if (error || !profile) {
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
      />
      <ProfileStats 
        friendsCount={friendsCount}
        skillsCount={skillsCount}
        achievementsCount={achievementsCount}
      />
    </AnimatePresence>
  );
};