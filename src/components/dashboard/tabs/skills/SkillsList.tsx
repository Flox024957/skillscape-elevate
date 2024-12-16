import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

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
      {skills?.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h4 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {skill.titre}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.resume}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 hover:bg-primary/10 hover:text-primary"
                    onClick={() => onMaster(skill.id)}
                  >
                    <Trophy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 hover:bg-primary/10 hover:text-primary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};