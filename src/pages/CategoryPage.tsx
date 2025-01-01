import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CategoryHeader } from "./components/CategoryHeader";
import { CategorySkillsList } from "./components/CategorySkillsList";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading, error } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Category ID is undefined');
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select(`
          *,
          skills (
            id,
            titre,
            resume,
            description,
            exemples,
            action_concrete
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        toast.error("La catégorie n'a pas pu être chargée");
        throw categoryError;
      }

      if (!categoryData) {
        console.error('No category found with ID:', id);
        toast.error("La catégorie n'existe pas");
        throw new Error('Category not found');
      }

      return categoryData;
    },
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background/50 backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-background/50 backdrop-blur-sm">
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              La catégorie que vous recherchez n'existe pas ou a été supprimée.
            </h1>
            <Button onClick={() => navigate('/main')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="container relative z-10 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <CategoryHeader 
            name={category.name} 
            description={category.description}
            onBack={() => navigate('/main')}
          />
          
          <CategorySkillsList 
            skills={category.skills || []} 
            onSkillClick={(skillId) => navigate(`/skill/${skillId}`)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;