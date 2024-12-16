import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MasteredSkill {
  id: string;
  skill_id: string;
  mastered_at: string;
  skill: {
    titre: string;
    resume: string;
  };
}

interface MasteredSkillsListProps {
  masteredSkills: MasteredSkill[];
}

export const MasteredSkillsList = ({ masteredSkills }: MasteredSkillsListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const removeMasteredSkillMutation = useMutation({
    mutationFn: async (skillId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non authentifié");

      const { error } = await supabase
        .from('user_mastered_skills')
        .delete()
        .eq('user_id', user.id)
        .eq('skill_id', skillId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masteredSkills'] });
      toast({
        title: "Succès",
        description: "Compétence retirée des compétences maîtrisées",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de retirer la compétence",
        variant: "destructive",
      });
    },
  });

  if (!masteredSkills.length) {
    return (
      <div className="text-center p-8 bg-card/50 rounded-lg border border-border">
        <p className="text-muted-foreground">
          Aucune compétence maîtrisée pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {masteredSkills.map((masteredSkill, index) => (
        <motion.div
          key={masteredSkill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {masteredSkill.skill.titre}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {masteredSkill.skill.resume}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Maîtrisée le {format(new Date(masteredSkill.mastered_at), "d MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeMasteredSkillMutation.mutate(masteredSkill.skill_id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};