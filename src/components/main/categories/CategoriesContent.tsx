import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";

export const CategoriesContent = () => {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          skills (
            id,
            titre,
            resume
          )
        `)
        .order('name')
        .limit(9);
      
      if (categoriesError) throw categoriesError;
      
      return categoriesData?.map(category => ({
        ...category,
        skills: category.skills?.map(skill => ({
          id: skill.id,
          title: skill.titre,
          summary: skill.resume
        }))
      }));
    },
  });

  return (
    <div className="max-h-fit overflow-hidden">
      <CategoriesGrid categories={categories || []} />
    </div>
  );
};