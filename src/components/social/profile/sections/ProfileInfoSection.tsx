import { Card } from "@/components/ui/card";
import { MapPin, Briefcase, GraduationCap, Globe } from "lucide-react";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { Profile } from "@/integrations/supabase/types/profiles";
import { motion } from "framer-motion";

interface ProfileInfoSectionProps {
  profile: Profile;
}

export const ProfileInfoSection = ({ profile }: ProfileInfoSectionProps) => {
  if (!profile.location && !profile.current_job && !profile.dream_job && !profile.website) {
    return null;
  }

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30 border-primary/10 hover:border-primary/20 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {profile.location && (
          <ProfileInfoCard
            icon={MapPin}
            title="Localisation"
            value={profile.location}
          />
        )}
        {profile.current_job && (
          <ProfileInfoCard
            icon={Briefcase}
            title="Emploi actuel"
            value={profile.current_job}
          />
        )}
        {profile.dream_job && (
          <ProfileInfoCard
            icon={GraduationCap}
            title="Objectif professionnel"
            value={profile.dream_job}
          />
        )}
        {profile.website && (
          <ProfileInfoCard
            icon={Globe}
            title="Site web"
            value={profile.website}
            link
          />
        )}
      </motion.div>
    </Card>
  );
};