import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

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
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};