import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
          <h2 className="text-2xl font-bold text-foreground">Catégorie non trouvée</h2>
          <p className="text-muted-foreground mt-2">La catégorie que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-background border-border">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">{category.name}</h1>
          <p className="text-muted-foreground mb-8">{category.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skills.map((skill) => (
              <Card key={skill.id} className="p-4 hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-semibold text-foreground mb-2">{skill.title}</h3>
                {skill.summary && (
                  <p className="text-sm text-muted-foreground">{skill.summary}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CategoryPage;