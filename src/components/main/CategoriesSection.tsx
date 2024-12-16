import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

      {isLoading ? (
        <div className="text-center text-gray-300">Chargement des catégories...</div>
      ) : (
        <ScrollArea className={cn(
          isMobile && "h-[400px]"
        )}>
          <CategoriesGrid categories={categories || []} />
        </ScrollArea>
      )}
    </motion.div>
  );
};