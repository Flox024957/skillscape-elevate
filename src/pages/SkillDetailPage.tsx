import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  
  const { data: skill, isLoading, error } = useSkillQuery(skillId);

  useEffect(() => {
    console.log('SkillDetailPage rendering with:', { skillId, skill, isLoading, error });
    
    if (!skillId) {
      toast.error("ID de compétence manquant");
      navigate(-1);
    }
  }, [skillId, skill, isLoading, error, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-red-500">
              La compétence que vous recherchez n'existe pas ou a été supprimée.
            </h1>
            <p className="text-muted-foreground">
              Veuillez vérifier l'URL ou retourner à la page précédente.
            </p>
            <button 
              onClick={() => navigate(-1)}
              className="text-primary hover:underline"
            >
              Retourner à la page précédente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <SkillDetailContent 
        skill={skill}
        onNavigateBack={() => navigate(-1)}
        onAddToDashboard={handleAddToDashboard}
      />
    </TooltipProvider>
  );
};

export default SkillDetailPage;