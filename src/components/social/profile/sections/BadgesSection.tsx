import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface BadgesSectionProps {
  userId: string;
}

export const BadgesSection = ({ userId }: BadgesSectionProps) => {
  const { data: badges } = useQuery({
    queryKey: ['user-badges', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data;
    },
  });

  if (!badges?.length) return null;

  return (
    <Card className="overflow-hidden backdrop-blur-sm bg-card/30">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Award className="w-5 h-5" />
          Badges et réalisations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {badge.icon_url ? (
                <img
                  src={badge.icon_url}
                  alt={badge.name}
                  className="w-12 h-12 mb-2"
                />
              ) : (
                <Award className="w-12 h-12 mb-2 text-primary" />
              )}
              <h4 className="font-medium text-sm">{badge.name}</h4>
              {badge.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};