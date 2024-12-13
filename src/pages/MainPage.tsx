import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/skills";

const MainPage = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          skills (
            id,
            titre,
            resume,
            explication,
            exemples,
            action_concrete,
            created_at,
            updated_at
          )
        `)
        .order('name');
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw categoriesError;
      }
      
      return categoriesData as Category[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] 
                   bg-cover bg-center opacity-10 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
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
      </div>
    </div>
  );
};

export default MainPage;