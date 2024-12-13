import { ChevronDown } from "lucide-react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import SkillActions from "./SkillActions";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillHeaderProps {
  title: string;
  selectedSections: string[] | null;
  skillId: string;
  onAdd: (skillId: string, title: string, content: string | null) => void;
  isMastered?: boolean;
}

const SkillHeader = ({ title, selectedSections, skillId, onAdd, isMastered }: SkillHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-accent/50">
      <div className="text-left">
        <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
          {title}
        </h3>
        {selectedSections && (
          <p className={`text-muted-foreground ${isMobile ? 'text-xs line-clamp-1' : 'text-sm'}`}>
            Sections sélectionnées : {selectedSections.join(', ')}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <SkillActions
          skillId={skillId}
          onAdd={onAdd}
          isMastered={isMastered}
        />
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
      </div>
    </CollapsibleTrigger>
  );
};

export default SkillHeader;