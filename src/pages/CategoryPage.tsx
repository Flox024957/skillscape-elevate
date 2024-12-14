import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

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
      <PageContainer>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageContainer>
    );
  }

  if (error || !category) {
    return (
      <PageContainer>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            La catégorie que vous recherchez n'existe pas ou a été supprimée.
          </h1>
          <Button onClick={() => navigate('/main')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
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
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSkill(skill.id, skill.titre);
                  }}
                  className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                >
                  <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
                  <PlusCircle className="w-6 h-6 text-white relative z-10 group-hover:text-primary transition-colors" />
                </motion.button>
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
    </PageContainer>
  );
};

export default CategoryPage;