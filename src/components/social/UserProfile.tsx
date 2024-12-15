import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserSkills } from './UserSkills';
import { useQuery } from '@tanstack/react-query';
import { ProfileHeader } from './profile/ProfileHeader';
import { ProfileInfo } from './profile/ProfileInfo';
import { FriendshipButton } from './profile/FriendshipButton';
import { ProfileTabs } from './profile/ProfileTabs';
import { useFriendshipStatus } from './profile/useFriendshipStatus';

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
        .select('pseudo, image_profile, description, current_job, dream_job')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Profile;
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
      <Card>
        <CardHeader>
          <ProfileHeader 
            isCurrentUser={isCurrentUser} 
            profile={profile} 
          />
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.current_job && (
            <ProfileInfo 
              label="Emploi actuel" 
              value={profile.current_job} 
            />
          )}
          {profile.dream_job && (
            <ProfileInfo 
              label="Emploi rêvé" 
              value={profile.dream_job} 
            />
          )}
          {!isCurrentUser && currentUserId && (
            <FriendshipButton
              currentUserId={currentUserId}
              targetUserId={userId}
              friendshipStatus={friendshipStatus}
            />
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <ProfileTabs isCurrentUser={isCurrentUser} />
        </CardContent>
      </Card>
      
      <UserSkills userId={userId} />
    </div>
  );
};