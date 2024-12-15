import { Profile } from '@/integrations/supabase/types/profiles';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  if (!profile.description && !profile.interests?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.description && (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {profile.description}
            </p>
          )}
          
          {profile.interests && profile.interests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Centres d'intérêt</h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};