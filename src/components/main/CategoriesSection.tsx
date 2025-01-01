import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Category } from "@/components/dashboard/audio/types";

export const CategoriesSection = () => {
  const isMobile = useIsMobile();
  
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
            resume,
            description,
            exemples,
            action_concrete,
            created_at,
            updated_at
          )
        `)
        .order('name')
        .limit(9);
      
      if (categoriesError) throw categoriesError;
      
      return (categoriesData || []).map(category => ({
        ...category,
        skills: (category.skills || []).map(skill => ({
          ...skill,
          description: skill.description || skill.resume,
          exemples: skill.exemples || [],
          action_concrete: skill.action_concrete || "",
          category_id: category.id,
        }))
      })) as Category[];
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
        "text-center mb-8",
        "relative z-10",
        "bg-clip-text text-transparent",
        "bg-gradient-to-r from-white via-primary/90 to-white",
        "after:content-[''] after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-primary/20 after:via-primary/10 after:to-primary/20",
        "after:blur-xl after:-z-10",
        "drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]",
        "tracking-wide",
        isMobile ? "text-2xl" : "text-4xl",
        "font-bold"
      )}>
        Explorez nos Catégories
      </h2>

      <div className="max-h-fit overflow-hidden">
        <CategoriesGrid categories={categories || []} />
      </div>
    </motion.div>
  );
};