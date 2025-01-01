import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useCategories } from "@/hooks/useCategories";

export const CategoriesContent = () => {
  const { categories } = useCategories();

  return (
    <div className="max-h-fit overflow-hidden">
      <CategoriesGrid categories={categories || []} />
    </div>
  );
};