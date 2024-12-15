import { Profile } from '@/integrations/supabase/types/profiles';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

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
      <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
        <CardHeader className="flex flex-row items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.description && (
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {profile.description}
            </p>
          )}
          
          {profile.interests && profile.interests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Centres d'intérêt</h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/10 hover:bg-primary/20 text-primary"
                  >
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