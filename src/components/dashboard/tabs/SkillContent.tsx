import { CollapsibleContent } from "@/components/ui/collapsible";
import SkillSection from "@/components/dashboard/tabs/skills/SkillSection";
import ExamplesSection from "@/components/dashboard/tabs/skills/ExamplesSection";
import { Json } from "@/integrations/supabase/types";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <CollapsibleContent className={`p-4 pt-0 space-y-4 ${isMobile ? 'text-sm' : ''}`}>
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
    </CollapsibleContent>
  );
};

export default SkillContent;