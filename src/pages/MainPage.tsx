import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Category, Skill } from "@/types/skills";

const MainPage = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories...');
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
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
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw categoriesError;
      }
      
      const transformedCategories: Category[] = categoriesData?.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description || "",
        skills: category.skills?.map(skill => ({
          id: skill.id,
          titre: skill.titre,
          resume: skill.resume,
          description: skill.description,
          action_concrete: skill.action_concrete,
          exemples: skill.exemples,
          category_id: skill.category_id,
          created_at: skill.created_at,
          updated_at: skill.updated_at
        })) || []
      })) || [];

      console.log('Categories transformed:', transformedCategories);
      return transformedCategories;
    },
  });

  if (error) {
    console.error('Error in categories query:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Une erreur est survenue lors du chargement des catégories.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 to-pink-600">
              Bienvenue sur FLAP
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explorez nos catégories et commencez votre voyage de développement personnel
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <CategoriesGrid categories={categories || []} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;