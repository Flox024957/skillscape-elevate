import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Skill {
  id: string;
  titre: string;
  resume: string;
  description: string;
  action_concrete: string;
  exemples: string[];
  category_id: string;
}

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

  const handleAddSkill = async (skillId: string, skillTitle: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error: existingSkillError, data: existingSkill } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', user.id)
        .eq('skill_id', skillId)
        .single();

      if (existingSkill) {
        toast.info("Cette compétence est déjà dans votre tableau de bord");
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .insert([
          {
            user_id: user.id,
            skill_id: skillId,
          },
        ]);

      if (error) throw error;

      toast.success(`${skillTitle} a été ajouté à votre tableau de bord`);
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error("Une erreur est survenue lors de l'ajout de la compétence");
    }
  };

  if (isCategoryError || isSkillsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-red-500">Une erreur est survenue</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
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
          <div className="flex flex-col gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {category.name}
            </h1>
          </div>

          <div className="grid gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-card border border-border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-colors flex-1">
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
                      <p className="text-muted-foreground line-clamp-2">
                        {skill.resume}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;