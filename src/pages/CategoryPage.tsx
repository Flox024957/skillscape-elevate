import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Skill } from "@/components/dashboard/audio/types";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      
      const { data, error } = await supabase
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
            category_id,
            created_at,
            updated_at
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Category not found');
      }

      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-red-500">
              La catégorie que vous recherchez n'existe pas ou a été supprimée.
            </h1>
            <Button onClick={() => navigate('/main')} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSkillClick = (skill: Skill) => {
    try {
      navigate(`/skill/${skill.id}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("Erreur lors de la navigation");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Button onClick={() => navigate('/main')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold">{category.name}</h1>
            {category.description && (
              <p className="text-lg text-muted-foreground">{category.description}</p>
            )}

            <div className="grid gap-4 mt-8">
              {category.skills?.map((skill: Skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 rounded-lg border bg-card hover:border-primary cursor-pointer transition-all"
                  onClick={() => handleSkillClick(skill)}
                >
                  <h3 className="text-xl font-semibold mb-2">{skill.titre}</h3>
                  <p className="text-muted-foreground">{skill.resume}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;