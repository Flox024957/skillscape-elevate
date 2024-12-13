import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";

const SkillDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: skill, isLoading, error } = useSkillQuery(id);

  const handleAddToDashboard = async (type: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !id) {
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
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-2xl font-semibold">Compétence non trouvée</h2>
            <p className="text-muted-foreground">
              La compétence que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Button onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-xl font-semibold">Compétence non trouvée</h2>
            <p className="text-muted-foreground">
              La compétence que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Button onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <SkillDetailContent
        skill={skill}
        onNavigateBack={() => navigate(`/category/${skill.categories?.id}`)}
        onAddToDashboard={handleAddToDashboard}
      />
    </div>
  );
};

export default SkillDetailPage;