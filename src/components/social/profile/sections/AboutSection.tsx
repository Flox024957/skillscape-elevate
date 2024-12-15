import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface AboutSectionProps {
  profile: {
    description?: string | null;
    languages?: string[] | null;
  };
}

export const AboutSection = ({ profile }: AboutSectionProps) => {
  if (!profile.description && (!profile.languages || profile.languages.length === 0)) {
    return null;
  }

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30 border-primary/10 hover:border-primary/20 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">À propos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {profile.description && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-muted-foreground leading-relaxed"
          >
            {profile.description}
          </motion.p>
        )}

        {profile.languages && profile.languages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Langues
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language, index) => (
                <motion.div
                  key={language}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {language}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};