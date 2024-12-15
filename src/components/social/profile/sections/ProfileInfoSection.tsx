import { Profile } from '@/integrations/supabase/types/profiles';
import { Card, CardContent } from "@/components/ui/card";
import { ProfileInfo } from '../ProfileInfo';
import { Briefcase, MapPin, Globe, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileInfoSectionProps {
  profile: Profile;
}

export const ProfileInfoSection = ({ profile }: ProfileInfoSectionProps) => {
  const hasAdditionalInfo = profile.current_job || profile.location || profile.website;

  if (!hasAdditionalInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="grid gap-4 p-6">
          {profile.current_job && (
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{profile.current_job}</span>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a 
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.website}
              </a>
            </div>
          )}

          {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => (
            <div key={platform} className="flex items-center gap-3">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <a 
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {platform}
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};