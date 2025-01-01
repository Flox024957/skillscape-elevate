import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CategorySelect } from "../skills/CategorySelect";
import { SkillsList } from "../skills/SkillsList";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SkillLibraryProps {
  onContentSelect: (content: string) => void;
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
}

export const SkillLibrary = ({ 
  onContentSelect, 
  onSkillSelect,
  selectedSkills 
}: SkillLibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <div className="space-y-4">
      <CategorySelect 
        categories={categories} 
        onSelect={setSelectedCategory}
      />
      <Card className="p-4">
        <ScrollArea className="h-[600px]">
          <SkillsList 
            skills={skills} 
            onContentSelect={onContentSelect}
            onSkillSelect={onSkillSelect}
            selectedSkills={selectedSkills}
          />
        </ScrollArea>
      </Card>
    </div>
  );
};