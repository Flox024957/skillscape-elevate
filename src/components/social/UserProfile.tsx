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
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Briefcase, GraduationCap, Globe, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du profil...</p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-bold text-destructive">Profil introuvable</h2>
          <p className="text-muted-foreground">
            Le profil que vous recherchez n'existe pas ou a été supprimé.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
              <Card className="overflow-hidden backdrop-blur-sm bg-card/30 border-primary/10 hover:border-primary/20 transition-colors">
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Localisation</h3>
                        <p className="text-muted-foreground">{profile.location}</p>
                      </div>
                    </div>
                  )}
                  {profile.current_job && (
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Emploi actuel</h3>
                        <p className="text-muted-foreground">{profile.current_job}</p>
                      </div>
                    </div>
                  )}
                  {profile.dream_job && (
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Objectif professionnel</h3>
                        <p className="text-muted-foreground">{profile.dream_job}</p>
                      </div>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Site web</h3>
                        <a 
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {profile.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

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
              {profile.interests && profile.interests.length > 0 && (
                <Card className="overflow-hidden backdrop-blur-sm bg-card/30 border-primary/10 hover:border-primary/20 transition-colors">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Centres d'intérêt</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                        >
                          {interest}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
              <BadgesSection userId={userId} />
              <ProfileTabs isCurrentUser={isCurrentUser} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};