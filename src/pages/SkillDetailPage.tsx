import { useParams, useNavigate } from "react-router-dom";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { toast } from "sonner";

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const { data: skill, isLoading, error } = useSkillQuery(skillId);

  console.log('SkillDetailPage rendering with:', { skillId, skill, isLoading, error });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !skill) {
    toast.error("Erreur lors du chargement de la compétence");
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
          </div>
        </div>
      </div>
    );
  }

  const handleNavigateBack = () => {
    if (skill.category_id) {
      navigate(`/category/${skill.category_id}`);
    } else {
      navigate('/');
    }
  };

  const handleAddToDashboard = (type: string, content: string) => {
    toast.success(`${type} ajouté au tableau de bord`);
  };

  return (
    <SkillDetailContent 
      skill={skill}
      onNavigateBack={handleNavigateBack}
      onAddToDashboard={handleAddToDashboard}
    />
  );
};

export default SkillDetailPage;