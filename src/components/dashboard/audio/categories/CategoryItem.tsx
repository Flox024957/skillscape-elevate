import { Category, Skill } from "../types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export interface CategoryItemProps {
  category: Category;
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: () => void;
}

export const CategoryItem = ({ category, onSkillSelect, onCategorySelect }: CategoryItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCategorySelect}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Tout ajouter
        </Button>
      </div>
      
      <div className="space-y-2">
        {category.skills?.map((skill: Skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent cursor-pointer"
            onClick={() => onSkillSelect(skill.id)}
          >
            <div>
              <p className="font-medium">{skill.titre}</p>
              <p className="text-sm text-muted-foreground">{skill.resume}</p>
            </div>
            <Button variant="ghost" size="sm">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};