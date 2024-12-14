import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/layout/PageContainer";

const MainPage = () => {
  const { data: categories, isLoading } = useQuery({
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
            resume
          )
        `)
        .order('name');
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw categoriesError;
      }
      
      const transformedCategories = categoriesData?.map(category => ({
        ...category,
        skills: category.skills?.map(skill => ({
          id: skill.id,
          title: skill.titre,
          summary: skill.resume
        }))
      }));
      
      console.log('Categories fetched:', transformedCategories);
      return transformedCategories;
    },
  });

  return (
    <PageContainer>
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
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explorez nos catégories et commencez votre voyage de développement personnel
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-300">Chargement des catégories...</div>
        ) : (
          <CategoriesGrid categories={categories || []} />
        )}
      </motion.div>
    </PageContainer>
  );
};

export default MainPage;