import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";

const MainPage = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select();
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-xl">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-[url('/lovable-uploads/a4696846-0f8d-48d5-95a4-fd2587c79699.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white neon-text">
            FLAP
          </h1>
        </motion.div>

        <CategoriesGrid categories={categories || []} />
      </div>
    </div>
  );
};

export default MainPage;