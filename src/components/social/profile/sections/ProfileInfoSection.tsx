import { Profile } from '@/integrations/supabase/types/profiles';
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Globe, Link2, GraduationCap, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

interface ProfileInfoSectionProps {
  profile: Profile;
}

export const ProfileInfoSection = ({ profile }: ProfileInfoSectionProps) => {
  const hasBasicInfo = profile.current_job || profile.location || profile.website;
  const hasEducation = profile.education && profile.education.length > 0;
  const hasExperience = profile.experience && profile.experience.length > 0;

  if (!hasBasicInfo && !hasEducation && !hasExperience) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Informations</h3>
          </div>

          {hasBasicInfo && (
            <div className="space-y-4">
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
            </div>
          )}

          {hasEducation && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h4 className="font-medium">Formation</h4>
                </div>
                {profile.education.map((edu, index) => (
                  <div key={index} className="ml-7 space-y-1">
                    <p className="font-medium">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.degree} - {edu.field}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.start_date} - {edu.end_date || 'Présent'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {profile.social_links && Object.entries(profile.social_links).length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                {Object.entries(profile.social_links).map(([platform, url]) => (
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
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};