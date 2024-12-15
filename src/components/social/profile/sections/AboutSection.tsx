import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Briefcase, GraduationCap, Languages, Heart, Link as LinkIcon, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  profile: {
    description?: string | null;
    current_job?: string | null;
    dream_job?: string | null;
    location?: string | null;
    languages?: string[] | null;
    interests?: string[] | null;
    website?: string | null;
    social_links?: Record<string, string> | null;
  };
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          À propos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {profile.description && (
            <motion.p 
              variants={item}
              className="text-muted-foreground leading-relaxed"
            >
              {profile.description}
            </motion.p>
          )}

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {profile.location && (
              <motion.div variants={item} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile.location}</span>
              </motion.div>
            )}

            {profile.current_job && (
              <motion.div variants={item} className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>{profile.current_job}</span>
              </motion.div>
            )}

            {profile.dream_job && (
              <motion.div variants={item} className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>Objectif : {profile.dream_job}</span>
              </motion.div>
            )}

            {profile.website && (
              <motion.div variants={item} className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <a 
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Site web personnel
                </a>
              </motion.div>
            )}

            {profile.social_links && Object.entries(profile.social_links).length > 0 && (
              <motion.div variants={item} className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                <div className="flex gap-2">
                  {Object.entries(profile.social_links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {profile.languages && profile.languages.length > 0 && (
            <motion.div variants={item} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Languages className="w-4 h-4" />
                Langues
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="bg-primary/10">
                    {language}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          {profile.interests && profile.interests.length > 0 && (
            <motion.div variants={item} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Heart className="w-4 h-4" />
                Centres d'intérêt
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="hover:bg-primary/5">
                    {interest}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};