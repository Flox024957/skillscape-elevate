import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useCategories } from "@/hooks/useCategories";
import { Category } from "@/components/dashboard/audio/types";

export const CategoriesContent = () => {
  const { categories } = useCategories();
  
  // Transform the categories to match the expected type
  const transformedCategories: Category[] = categories?.map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    created_at: cat.created_at,
    skills: cat.skills?.map(skill => ({
      id: skill.id,
      titre: skill.titre,
      resume: skill.resume,
      description: skill.resume, // Using resume as description if not provided
      exemples: [],
      action_concrete: "",
      category_id: cat.id,
      created_at: cat.created_at,
      updated_at: cat.created_at
    })) || []
  })) || [];

  return (
    <div className="max-h-fit overflow-hidden">
      <CategoriesGrid categories={transformedCategories} />
    </div>
  );
};