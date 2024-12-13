import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { CategoryError } from "@/components/categories/detail/CategoryError";
import { CategoryLoading } from "@/components/categories/detail/CategoryLoading";
import { CategoryHeader } from "@/components/categories/detail/CategoryHeader";
import { SkillsList } from "@/components/categories/detail/SkillsList";

const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { data: category, isError: isCategoryError } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      if (!categoryId || !isValidUUID(categoryId)) {
        throw new Error('Invalid category ID');
      }

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: Boolean(categoryId) && isValidUUID(categoryId),
  });

  const { data: skills = [], isError: isSkillsError } = useQuery({
    queryKey: ['categorySkills', categoryId],
    queryFn: async () => {
      if (!categoryId || !isValidUUID(categoryId)) {
        throw new Error('Invalid category ID');
      }

      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('category_id', categoryId);

      if (error) throw error;
      return data;
    },
    enabled: Boolean(categoryId) && isValidUUID(categoryId),
  });

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  if (isCategoryError || isSkillsError) {
    return <CategoryError />;
  }

  if (!category) {
    return <CategoryLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <CategoryHeader name={category.name} />
          <SkillsList skills={skills} onSkillClick={handleSkillClick} />
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;