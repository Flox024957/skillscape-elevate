import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileInfo } from './profile/ProfileInfo';
import { FriendshipButton } from './profile/FriendshipButton';
import { ProfileTabs } from './profile/ProfileTabs';
import { useFriendshipStatus } from './profile/useFriendshipStatus';
import { ProfileBanner } from './profile/sections/ProfileBanner';
import { AboutSection } from './profile/sections/AboutSection';
import { ExperienceTimeline } from './profile/sections/ExperienceTimeline';
import { EducationSection } from './profile/sections/EducationSection';
import { BadgesSection } from './profile/sections/BadgesSection';
import { UserSkills } from './UserSkills';

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
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
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: friendshipStatus } = useFriendshipStatus(userId, currentUserId);

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
    <div className="space-y-6">
      <ProfileBanner
        userId={userId}
        bannerUrl={profile.banner_image}
        isCurrentUser={isCurrentUser}
      />

      <div className="px-4 -mt-16 relative z-10">
        <ProfileHeader 
          isCurrentUser={isCurrentUser} 
          profile={profile}
        />

        {!isCurrentUser && currentUserId && (
          <div className="mt-4">
            <FriendshipButton
              currentUserId={currentUserId}
              targetUserId={userId}
              friendshipStatus={friendshipStatus}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <AboutSection profile={profile} />
            <ExperienceTimeline experience={profile.experience || []} />
            <EducationSection education={profile.education || []} />
            <UserSkills userId={userId} />
          </div>

          <div className="space-y-6">
            <BadgesSection userId={userId} />
            <ProfileTabs isCurrentUser={isCurrentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};