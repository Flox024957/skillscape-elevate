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
  // Limit to 9 categories
  const displayedCategories = categories?.slice(0, 9);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-8">
      {displayedCategories?.map((category, index) => (
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