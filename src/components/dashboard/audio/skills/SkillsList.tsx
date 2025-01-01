import { Button } from "@/components/ui/button";
import { Plus, Minus, Play } from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface SkillsListProps {
  skills: Skill[];
  onContentSelect: (content: string) => void;
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
}

export const SkillsList = ({ 
  skills, 
  onContentSelect, 
  onSkillSelect,
  selectedSkills 
}: SkillsListProps) => {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div 
          key={skill.id}
          className="flex items-start justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border"
        >
          <div className="flex-1">
            <h4 className="text-base font-medium">{skill.titre}</h4>
            {skill.resume && (
              <p className="text-sm text-muted-foreground mt-1">
                {skill.resume}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {selectedSkills.includes(skill.id) ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onSkillSelect(skill.id);
                  toast.success("Compétence retirée de la playlist");
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  onSkillSelect(skill.id);
                  toast.success("Compétence ajoutée à la playlist");
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onContentSelect(skill.resume || skill.titre)}
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};