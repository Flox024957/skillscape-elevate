import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategorySelect } from "./skills/CategorySelect";
import { SkillsList } from "./skills/SkillsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface SkillsSectionProps {
  onContentSelect: (content: string) => void;
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
  filters: {
    userSkillsOnly: boolean;
    includeMastered: boolean;
    playbackSpeed: number;
    categoryId?: string;
  };
}

export const SkillsSection = ({ 
  onContentSelect, 
  onSkillSelect,
  selectedSkills,
  filters 
}: SkillsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    },
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['skills', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('skills')
        .select(`
          id,
          titre,
          resume,
          category_id,
          categories (
            id,
            name
          )
        `);

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

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