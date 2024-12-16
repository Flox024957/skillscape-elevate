import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";
import { getCategoryImage, getImagePosition } from "@/utils/categoryUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  title: string;
  summary?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

interface CategoriesGridProps {
  categories: Category[];
}

export const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  const displayedCategories = categories?.slice(0, 9);
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "grid w-full mx-auto gap-3",
        isMobile 
          ? "grid-cols-2 px-2 max-w-[100vw]" 
          : "grid-cols-3 px-4 max-w-[1200px] gap-4"
      )}
    >
      {displayedCategories?.map((category, index) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          imageUrl={getCategoryImage(category.name)}
          imagePosition={getImagePosition(category.name)}
          index={index}
          skills={category.skills}
        />
      ))}
    </motion.div>
  );
};