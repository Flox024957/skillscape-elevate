import { useParams, useNavigate } from "react-router-dom";
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

  console.log('Current skill ID:', id);

  const { data: skill, isLoading, error } = useQuery({
    queryKey: ['skill', id],
    queryFn: async () => {
      if (!id) throw new Error('No skill ID provided');
      
      console.log('Fetching skill with ID:', id);
      
      const { data, error } = await supabase
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
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.error('No data found for skill ID:', id);
        throw new Error('Skill not found');
      }

      console.log('Skill data received:', data);
      return data as Skill;
    },
    enabled: !!id,
    retry: 1
  });

  const addToDashboard = async (type: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error } = await supabase
        .from('user_notes')
        .insert([{
          user_id: user.id,
          content: `${type}: ${content}`,
        }]);

      if (error) {
        toast.error("Impossible d'ajouter le contenu au tableau de bord");
      } else {
        toast.success("Ajouté au profil");
      }
    } catch (error) {
      console.error('Error adding to dashboard:', error);
      toast.error("Une erreur est survenue");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    console.error('Error or no skill data:', error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Erreur lors du chargement de la compétence</h2>
            <Button onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering skill:', skill);
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
          <Button
            onClick={() => navigate("/dashboard")}
          >
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
};

export default SkillDetailPage;