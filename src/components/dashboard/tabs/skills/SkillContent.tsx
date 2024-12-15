import { CollapsibleContent } from "@/components/ui/collapsible";
import SkillSection from "./SkillSection";
import ExamplesSection from "./ExamplesSection";
import { Json } from "@/integrations/supabase/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SkillContentProps {
  skillId: string;
  selectedSections: string[] | null;
  summary: string | null;
  explanation: string | null;
  concreteAction: string | null;
  examples: Json[] | null;
  onAdd: (skillId: string, title: string, content: string | Json[] | null) => void;
}

const SkillContent = ({
  skillId,
  selectedSections,
  summary,
  explanation,
  concreteAction,
  examples,
  onAdd,
}: SkillContentProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSkillClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navigating to skill with ID:", skillId);
    navigate(`/skill/${skillId}`);
  };

  return (
    <CollapsibleContent>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`p-6 space-y-6 ${isMobile ? 'text-sm' : ''} cursor-pointer`}
        onClick={handleSkillClick}
      >
        {(!selectedSections || selectedSections.includes('Summary')) && (
          <SkillSection
            skillId={skillId}
            title="Résumé"
            content={summary}
            onAdd={onAdd}
          />
        )}
        {(!selectedSections || selectedSections.includes('Explanation')) && (
          <SkillSection
            skillId={skillId}
            title="Explication"
            content={explanation}
            onAdd={onAdd}
          />
        )}
        {(!selectedSections || selectedSections.includes('Concrete Action')) && (
          <SkillSection
            skillId={skillId}
            title="Action Concrète"
            content={concreteAction}
            onAdd={onAdd}
          />
        )}
        {(!selectedSections || selectedSections.includes('Examples')) && (
          <ExamplesSection
            skillId={skillId}
            examples={examples}
            onAdd={onAdd}
          />
        )}
      </motion.div>
    </CollapsibleContent>
  );
};

export default SkillContent;