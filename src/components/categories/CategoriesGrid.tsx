import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";
import { getCategoryImage, getImagePosition } from "@/utils/categoryUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Category } from "@/components/dashboard/audio/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CategoriesGrid = () => {
  const isMobile = useIsMobile();

  const { data: categories = [] } = useQuery({
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

      return data || [];
    },
  });

  const displayedCategories = categories?.slice(0, 9);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "grid w-full mx-auto gap-3",
        isMobile 
          ? "grid-cols-1 px-2 max-w-[100vw]" 
          : "grid-cols-3 px-4 max-w-[1200px] gap-4"
      )}
    >
      {displayedCategories?.map((category, index) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description || ""}
          imageUrl={getCategoryImage(category.name)}
          imagePosition={getImagePosition(category.name)}
          index={index}
          skills={category.skills}
        />
      ))}
    </motion.div>
  );
};