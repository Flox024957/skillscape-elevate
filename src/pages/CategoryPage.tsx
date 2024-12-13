import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryContent } from "@/components/categories/CategoryContent";

interface Skill {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  examples: any[];
  concrete_action: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

const CategoryPage = () => {
  const { categoryId } = useParams();

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      console.log('Fetching category with ID:', categoryId);
      
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          skills (
            id,
            title,
            summary,
            explanation,
            examples,
            concrete_action
          )
        `)
        .eq('id', categoryId)
        .single();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        throw categoryError;
      }

      console.log('Category data received:', categoryData);
      return categoryData as Category;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Catégorie non trouvée</h2>
          <p className="text-gray-600 mt-2">La catégorie que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <CategoryContent 
      name={category.name}
      description={category.description || ""}
      skillsCount={category.skills?.length || 0}
      isMobile={window.innerWidth < 768}
    />
  );
};

export default CategoryPage;