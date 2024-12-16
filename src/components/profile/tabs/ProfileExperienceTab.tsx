import { motion } from "framer-motion";
import { ProfileExperienceEducation } from "@/components/profile/ProfileExperienceEducation";
import { Profile } from "@/integrations/supabase/types/profiles";

interface ProfileExperienceTabProps {
  profile: Profile;
}

export const ProfileExperienceTab = ({ profile }: ProfileExperienceTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-panel rounded-lg p-6"
    >
      <ProfileExperienceEducation profile={profile} />
    </motion.div>
  );
};