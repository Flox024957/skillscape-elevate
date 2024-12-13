import { CollapsibleContent } from "@/components/ui/collapsible";
import SkillSection from "./SkillSection";
import ExamplesSection from "./ExamplesSection";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillContentProps {
  skillId: string;
  selectedSections: string[] | null;
  summary: string | null;
  explanation: string | null;
  concreteAction: string | null;
  examples: any[] | null;
  onAdd: (skillId: string, title: string, content: string | any[] | null) => void;
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
      {(!selectedSections || selectedSections.includes('Résumé')) && (
        <SkillSection
          skillId={skillId}
          title="Résumé"
          content={summary}
          onAdd={onAdd}
        />
      )}
      {(!selectedSections || selectedSections.includes('Explication')) && (
        <SkillSection
          skillId={skillId}
          title="Explication"
          content={explanation}
          onAdd={onAdd}
        />
      )}
      {(!selectedSections || selectedSections.includes('Action Concrète')) && (
        <SkillSection
          skillId={skillId}
          title="Action Concrète"
          content={concreteAction}
          onAdd={onAdd}
        />
      )}
      {(!selectedSections || selectedSections.includes('Exemples')) && (
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