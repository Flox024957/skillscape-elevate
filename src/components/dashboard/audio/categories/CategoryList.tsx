import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryItem } from "./CategoryItem";
import { Skill } from "@/components/dashboard/audio/types";

interface CategoryListProps {
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: (skillIds: string[]) => void;
}

export const CategoryList = ({ onSkillSelect, onCategorySelect }: CategoryListProps) => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          created_at,
          skills (
            id,
            titre,
            resume,
            description,
            exemples,
            action_concrete,
            created_at,
            updated_at
          )
        `)
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories?.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onSkillSelect={onSkillSelect}
          onCategorySelect={() => {
            const skillIds = category.skills?.map((skill: Skill) => skill.id) || [];
            onCategorySelect(skillIds);
          }}
        />
      ))}
    </div>
  );
};