import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skill } from "../types";

interface CategoryItemProps {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: (categoryId: string) => void;
  selectedSkills: string[];
}

export const CategoryItem = ({
  id,
  name,
  description,
  skills,
  onSkillSelect,
  onCategorySelect,
  selectedSkills,
}: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 space-y-2 bg-card">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            onCategorySelect(id);
          }}
          className="flex items-center gap-2 text-left"
        >
          <h3 className="text-lg font-medium">{name}</h3>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {isExpanded && skills && skills.length > 0 && (
        <div className="space-y-2 pt-2">
          {skills.map((skill) => (
            <Button
              key={skill.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left",
                selectedSkills.includes(skill.id) &&
                  "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              onClick={() => onSkillSelect(skill.id)}
            >
              {skill.titre}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};