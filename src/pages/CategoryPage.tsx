import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface Skill {
  id: string;
  titre: string;
  resume?: string;
  description?: string;
  exemples?: any[];
  action_concrete?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading, error } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      console.log('Fetching category with ID:', id);
      
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
        .single();

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

      console.log('Category data:', categoryData);
      return categoryData as Category;
    },
  });

  const handleSkillClick = (skillId: string) => {
    navigate(`/skill/${skillId}`);
  };

  const handleAddSkill = async (skillId: string, title: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .upsert({
          user_id: user.id,
          skill_id: skillId,
        });

      if (error) {
        console.error('Error adding skill:', error);
        toast.error("Impossible d'ajouter la compétence");
        return;
      }

      toast.success(`Compétence "${title}" ajoutée avec succès`);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-background">
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
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <Button 
          onClick={() => navigate('/main')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux catégories
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 to-pink-600">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.skills?.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer group"
            >
              <div className="bg-card p-6 rounded-lg border border-border hover:border-primary 
                            transition-all duration-300 h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary 
                               transition-colors flex-1">
                    {skill.titre}
                  </h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSkill(skill.id, skill.titre);
                    }}
                    className="shrink-0 hover:bg-primary/10 hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div onClick={() => handleSkillClick(skill.id)}>
                  {skill.resume && (
                    <p className="text-muted-foreground">{skill.resume}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;