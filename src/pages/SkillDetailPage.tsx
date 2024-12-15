import { useParams, useNavigate } from "react-router-dom";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { toast } from "sonner";

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  
  const { data: skill, isLoading, error } = useSkillQuery(skillId);

  useEffect(() => {
    console.log('SkillDetailPage rendering with:', { skillId, skill, isLoading, error });
  }, [skillId, skill, isLoading, error]);

  if (!skillId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-red-500">
              ID de compétence manquant
            </h1>
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
    <SkillDetailContent 
      skill={skill}
      onNavigateBack={() => navigate(-1)}
      onAddToDashboard={(type: string, content: string) => {
        toast.success(`${type} ajouté au tableau de bord`);
      }}
    />
  );
};

export default SkillDetailPage;