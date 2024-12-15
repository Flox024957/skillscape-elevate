import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { ProfileHeader } from './profile/ProfileHeader';
import { FriendshipButton } from './profile/FriendshipButton';
import { ProfileTabs } from './profile/ProfileTabs';
import { useFriendshipStatus } from './profile/useFriendshipStatus';
import { ProfileBanner } from './profile/sections/ProfileBanner';
import { AboutSection } from './profile/sections/AboutSection';
import { ExperienceTimeline } from './profile/sections/ExperienceTimeline';
import { EducationSection } from './profile/sections/EducationSection';
import { BadgesSection } from './profile/sections/BadgesSection';
import { UserSkills } from './UserSkills';
import { Profile, Education, Experience } from '@/integrations/supabase/types/profiles';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

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

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le profil",
          variant: "destructive",
        });
        throw error;
      }

      // Transform the raw data to match our Profile type
      const transformedData: Profile = {
        ...data,
        education: (data.education || []) as Education[],
        experience: (data.experience || []) as Experience[],
      };

      return transformedData;
    },
  });

  const { data: friendshipStatus } = useFriendshipStatus(userId, currentUserId);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Profil introuvable</h2>
          <p className="text-muted-foreground">
            Le profil que vous recherchez n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-20"
    >
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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <FriendshipButton
              currentUserId={currentUserId}
              targetUserId={userId}
              friendshipStatus={friendshipStatus}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <AboutSection profile={profile} />
            <ExperienceTimeline experience={profile.experience} />
            <EducationSection education={profile.education} />
            <UserSkills userId={userId} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <BadgesSection userId={userId} />
            <ProfileTabs isCurrentUser={isCurrentUser} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};