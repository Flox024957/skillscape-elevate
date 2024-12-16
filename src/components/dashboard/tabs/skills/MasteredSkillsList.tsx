import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {masteredSkills?.map((masteredSkill, index) => (
        <motion.div
          key={masteredSkill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemove(masteredSkill.skill_id)}
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