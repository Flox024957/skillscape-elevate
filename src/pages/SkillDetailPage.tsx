import { useParams, useNavigate } from "react-router-dom";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { toast } from "sonner";

const SkillDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: skill, isLoading, error } = useSkillQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">
            La compétence que vous recherchez n'existe pas ou a été supprimée.
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Retourner à l'accueil
          </button>
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
    <div className="min-h-screen bg-background">
      <SkillDetailContent 
        skill={skill}
        onNavigateBack={handleNavigateBack}
        onAddToDashboard={handleAddToDashboard}
      />
    </div>
  );
};

export default SkillDetailPage;