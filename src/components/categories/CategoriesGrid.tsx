import { motion } from "framer-motion";
import { CategoryCard } from "./CategoryCard";
import { getCategoryImage, getImagePosition } from "@/utils/categoryUtils";

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-3 gap-3 max-w-[800px] mx-auto w-full px-2"
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