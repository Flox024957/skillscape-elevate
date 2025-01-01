import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/components/dashboard/audio/types";

export const CategoriesContent = () => {
  const { categories } = useCategories();
  
  return (
    <div className="max-h-fit overflow-hidden">
      <CategoriesGrid categories={categories || []} />
    </div>
  );
};