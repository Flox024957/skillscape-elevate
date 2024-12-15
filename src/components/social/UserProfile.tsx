import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { useFriendshipStatus } from './profile/useFriendshipStatus';
import { useToast } from '@/hooks/use-toast';
import { LoadingProfile } from './profile/LoadingProfile';
import { ErrorProfile } from './profile/ErrorProfile';
import { ProfileContent } from './profile/ProfileContent';
import { AnimatePresence } from 'framer-motion';
import { Profile, Education, Experience } from '@/integrations/supabase/types/profiles';

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  console.log('UserProfile component mounted with userId:', userId);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user data:', user);
      setCurrentUserId(user?.id || null);
      setIsCurrentUser(user?.id === userId);
    };
    checkCurrentUser();
  }, [userId]);

  const { data: profile, isLoading: profileLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      console.log('Starting profile fetch for userId:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil: " + error.message,
          variant: "destructive",
        });
        throw error;
      }

      console.log('Raw profile data received:', data);

      // Ensure the data matches our Profile type
      const formattedProfile: Profile = {
        ...data,
        education: Array.isArray(data?.education) ? data.education as Education[] : [],
        experience: Array.isArray(data?.experience) ? data.experience as Experience[] : [],
        interests: Array.isArray(data?.interests) ? data.interests : [],
        languages: Array.isArray(data?.languages) ? data.languages : [],
        social_links: data?.social_links || {},
        personal_goals: data?.personal_goals || [],
        theme_preferences: data?.theme_preferences || {},
        achievements: data?.achievements || [],
        privacy_settings: data?.privacy_settings || {
          show_email: false,
          show_skills: true,
          show_friends: true,
          show_activity: true
        },
        certifications: data?.certifications || []
      };

      console.log('Formatted profile data:', formattedProfile);
      return formattedProfile;
    },
  });

  const { data: friendshipStatus } = useFriendshipStatus(userId, currentUserId);

  console.log('Component state:', {
    profile,
    profileLoading,
    error,
    isCurrentUser,
    currentUserId,
    friendshipStatus
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
    </AnimatePresence>
  );
};