import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoryItemProps {
  name: string;
  skills: { id: string; titre: string; resume: string }[];
  onAddCategory: () => void;
  onAddSkill: (skillId: string, title: string) => void;
}

export const CategoryItem = ({ 
  name, 
  skills, 
  onAddCategory, 
  onAddSkill 
}: CategoryItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border">
        <h3 className="text-lg font-medium">{name}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddCategory}
        >
          <Plus className="h-4 w-4 mr-2" />
          Tout ajouter
        </Button>
      </div>

      <div className="ml-8 space-y-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="p-4 bg-card/50 hover:bg-card/80 rounded-lg border border-border/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{skill.titre}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {skill.resume}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddSkill(skill.id, skill.titre)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};