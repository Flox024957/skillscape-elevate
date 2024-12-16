import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Trash2, Trophy } from "lucide-react";

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
  onRemove: (skillId: string) => void;
}

export const MasteredSkillsList = ({ masteredSkills, onRemove }: MasteredSkillsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Trophy className="h-5 w-5 text-primary" />
        Compétences maîtrisées
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masteredSkills?.map((masteredSkill) => (
          <motion.div
            key={masteredSkill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg border border-border p-4 space-y-2 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-medium">{masteredSkill.skill.titre}</h4>
                <p className="text-sm text-muted-foreground">{masteredSkill.skill.resume}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Maîtrisée le {format(new Date(masteredSkill.mastered_at), "d MMMM yyyy", { locale: fr })}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(masteredSkill.skill_id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};