import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const CategoriesSection = () => {
  const isMobile = useIsMobile();
  
  const { data: categories, isLoading } = useQuery({
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
        .order('name');
      
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="px-4"
    >
      <h2 className={cn(
        "text-center mb-8 bg-clip-text text-transparent",
        "bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B]",
        "drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]",
        isMobile ? "text-2xl" : "text-3xl",
        "font-bold"
      )}>
        Explorez nos Catégories
      </h2>

      {isLoading ? (
        <div className="text-center text-gray-300">Chargement des catégories...</div>
      ) : (
        <CategoriesGrid categories={categories || []} />
      )}
    </motion.div>
  );
};