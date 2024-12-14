import { useParams, useNavigate } from "react-router-dom";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { Skill } from "@/types/skills";
import { toast } from "sonner";

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();

  const { data: skill, isLoading, error } = useSkillQuery(skillId);

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
            <Button onClick={() => navigate(-1)} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
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