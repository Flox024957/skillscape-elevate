import { motion } from "framer-motion";
import { Profile } from "@/integrations/supabase/types/profiles";
import { ProfileHeader } from './ProfileHeader';
import { FriendshipButton } from './FriendshipButton';
import { ProfileInfoSection } from './sections/ProfileInfoSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceTimeline } from './sections/ExperienceTimeline';
import { EducationSection } from './sections/EducationSection';
import { UserSkills } from '../UserSkills';
import { BadgesSection } from './sections/BadgesSection';
import { ProfileTabs } from './ProfileTabs';
import { ProfileBanner } from './sections/ProfileBanner';
import { ProfileStats } from './sections/ProfileStats';
import { DateTimeSection } from './sections/DateTimeSection';

interface ProfileContentProps {
  profile: Profile;
  userId: string;
  isCurrentUser: boolean;
  currentUserId: string | null;
  friendshipStatus: any;
  stats?: {
    friendsCount: number;
    skillsCount: number;
    achievementsCount: number;
  };
}

export const ProfileContent = ({ 
  profile, 
  userId, 
  isCurrentUser, 
  currentUserId,
  friendshipStatus,
  stats 
}: ProfileContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 pb-20 max-w-7xl mx-auto px-4"
    >
      <ProfileBanner
        userId={userId}
        bannerUrl={profile.banner_image}
        isCurrentUser={isCurrentUser}
      />

      <div className="relative z-10">
        <div className="-mt-16">
          <ProfileHeader 
            isCurrentUser={isCurrentUser} 
            profile={profile}
          />
        </div>

        {!isCurrentUser && currentUserId && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex justify-center"
          >
            <FriendshipButton
              currentUserId={currentUserId}
              targetUserId={userId}
              friendshipStatus={friendshipStatus}
            />
          </motion.div>
        )}

        {stats && (
          <ProfileStats 
            friendsCount={stats.friendsCount}
            skillsCount={stats.skillsCount}
            achievementsCount={stats.achievementsCount}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <ProfileInfoSection profile={profile} />
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
            <DateTimeSection />
            <BadgesSection userId={userId} />
            <ProfileTabs isCurrentUser={isCurrentUser} userId={userId} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};