import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import { SkillSection } from "@/components/skill-detail/SkillSection";
import { ExamplesSection } from "@/components/skill-detail/ExamplesSection";
import { Toaster } from "@/components/ui/sonner";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: skill, isLoading } = useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*, categories(*)')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as Skill;
    },
  });

  const addToDashboard = async (type: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter du contenu à votre tableau de bord");
        return;
      }

      const { error } = await supabase
        .from('user_notes')
        .insert([{
          user_id: user.id,
          content: `${type}: ${content}`,
        }]);

      if (error) {
        console.error('Error adding to dashboard:', error);
        toast.error("Impossible d'ajouter le contenu au tableau de bord");
      } else {
        toast.success(`${type} ajouté à votre tableau de bord`);
      }
    } catch (error) {
      console.error('Error in addToDashboard:', error);
      toast.error("Une erreur inattendue s'est produite");
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!skill) {
    return <div>Compétence non trouvée</div>;
  }

  const examples = Array.isArray(skill.examples) ? skill.examples : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-futuristic-black to-futuristic-black/95">
      <Toaster />
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(`/category/${skill.category_id}`)}
              className="mb-4"
            >
              ← Retour à {skill.categories?.name}
            </Button>
            <h1 className="text-3xl font-bold text-white">
              {skill.title}
            </h1>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="glass-panel hover:bg-futuristic-blue/20"
          >
            Tableau de bord
          </Button>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SkillSection
              title="Résumé"
              content={skill.summary}
              type="Summary"
              onAdd={addToDashboard}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SkillSection
              title="Explication"
              content={skill.explanation}
              type="Explanation"
              onAdd={addToDashboard}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SkillSection
              title="Action Concrète"
              content={skill.concrete_action}
              type="Action"
              onAdd={addToDashboard}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ExamplesSection
              examples={examples}
              onAdd={addToDashboard}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;