import { CategoryCard } from "./CategoryCard";
import { getCategoryImage, getImagePosition } from "@/utils/categoryUtils";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoriesGridProps {
  categories: Category[];
}

export const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {categories?.map((category, index) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          imageUrl={getCategoryImage(category.name)}
          imagePosition={getImagePosition(category.name)}
          index={index}
        />
      ))}
    </div>
  );
};