import { CategoryItem } from "./CategoryItem";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category, Skill } from "../types";

interface CategoryListProps {
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: (categoryId: string) => void;
  selectedSkills: string[];
}

export const CategoryList = ({ 
  onSkillSelect, 
  onCategorySelect,
  selectedSkills 
}: CategoryListProps) => {
  const { data: categories = [], isLoading } = useQuery({
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
            category_id,
            created_at,
            updated_at
          )
        `)
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return data as Category[];
    },
  });

  if (isLoading) {
    return <div>Chargement des catégories...</div>;
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description || ""}
          skills={category.skills}
          onSkillSelect={onSkillSelect}
          onCategorySelect={onCategorySelect}
          selectedSkills={selectedSkills}
        />
      ))}
    </div>
  );
};