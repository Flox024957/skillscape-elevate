import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface SkillsListProps {
  skills: Skill[];
  onMaster: (skillId: string) => void;
}

export const SkillsList = ({ skills, onMaster }: SkillsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills?.map((skill) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-4 space-y-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium">{skill.titre}</h4>
              <p className="text-sm text-muted-foreground">{skill.resume}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onMaster(skill.id)}
            >
              <Trophy className="h-4 w-4" />
              Maîtrisée
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};