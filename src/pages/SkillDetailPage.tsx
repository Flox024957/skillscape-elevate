import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import { SkillSection } from "@/components/skill-detail/SkillSection";
import { ExamplesSection } from "@/components/skill-detail/ExamplesSection";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";

type Skill = Database['public']['Tables']['skills']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

const SkillDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: skill, isLoading } = useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      console.log('Fetching skill with ID:', id);
      
      if (!id) {
        console.error('No skill ID provided');
        throw new Error('No skill ID provided');
      }
      
      const { data: skillData, error } = await supabase
        .from('skills')
        .select(`
          *,
          categories (
            id,
            name,
            description
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching skill:', error);
        throw error;
      }

      if (!skillData) {
        console.error('No data found for skill ID:', id);
        throw new Error('Skill not found');
      }

      console.log('Skill data received:', skillData);
      return skillData as Skill;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Compétence non trouvée</h2>
            <Button onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </div>
      </div>
    );
  }

  const examples = Array.isArray(skill.examples) ? skill.examples : [];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(`/category/${skill.categories?.id}`)}
              className="mb-4"
            >
              ← Retour à {skill.categories?.name}
            </Button>
            <h1 className="text-3xl font-bold">{skill.title}</h1>
          </div>
          <Button onClick={() => navigate("/dashboard")}>
            Tableau de bord
          </Button>
        </div>

        <div className="space-y-8">
          <SkillSection
            title="Résumé"
            content={skill.summary}
            type="Summary"
            onAdd={addToDashboard}
          />

          <SkillSection
            title="Explication"
            content={skill.explanation}
            type="Explanation"
            onAdd={addToDashboard}
          />

          <SkillSection
            title="Action Concrète"
            content={skill.concrete_action}
            type="Action"
            onAdd={addToDashboard}
          />

          {examples.length > 0 && (
            <ExamplesSection
              examples={examples}
              onAdd={addToDashboard}
            />
          )}
        </div>
      </div>
    </div>
  );

  async function addToDashboard(type: string, content: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error: existingError, data: existingSkill } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', user.id)
        .eq('skill_id', id)
        .single();

      if (existingSkill) {
        // Update selected sections if skill already exists
        const newSections = existingSkill.selected_sections || [];
        if (!newSections.includes(type)) {
          newSections.push(type);
          const { error: updateError } = await supabase
            .from('user_skills')
            .update({ selected_sections: newSections })
            .eq('user_id', user.id)
            .eq('skill_id', id);

          if (updateError) {
            console.error('Error updating sections:', updateError);
            toast.error("Impossible de mettre à jour les sections");
            return;
          }
          toast.success("Section ajoutée au tableau de bord");
        } else {
          toast.info("Cette section est déjà dans votre tableau de bord");
        }
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .insert([{
          user_id: user.id,
          skill_id: id,
          selected_sections: [type]
        }]);

      if (error) {
        console.error('Error adding skill:', error);
        toast.error("Impossible d'ajouter la compétence au tableau de bord");
        return;
      }

      toast.success("Compétence ajoutée au tableau de bord");
    } catch (error) {
      console.error('Error adding to dashboard:', error);
      toast.error("Une erreur est survenue");
    }
  }
};

export default SkillDetailPage;