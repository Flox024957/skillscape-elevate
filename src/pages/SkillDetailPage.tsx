import { useParams, useNavigate } from "react-router-dom";
import { useSkillQuery } from "@/hooks/useSkillQuery";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SkillDetailContent } from "@/components/skill-detail/SkillDetailContent";
import { Skill } from "@/types/skills";
import { toast } from "sonner";
import { PageContainer } from "@/components/layout/PageContainer";

const SkillDetailPage = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();

  const { data: skill, isLoading, error } = useSkillQuery(skillId);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageContainer>
    );
  }

  if (error || !skill) {
    return (
      <PageContainer>
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
      </PageContainer>
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
    <PageContainer>
      <SkillDetailContent 
        skill={skill as Skill}
        onNavigateBack={handleNavigateBack}
        onAddToDashboard={handleAddToDashboard}
      />
    </PageContainer>
  );
};

export default SkillDetailPage;