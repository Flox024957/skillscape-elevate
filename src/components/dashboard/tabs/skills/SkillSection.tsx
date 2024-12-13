import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Json } from "@/integrations/supabase/types";

interface SkillSectionProps {
  skillId: string;
  title: string;
  content: string | null;
  onAdd: (skillId: string, title: string, content: string | Json[] | null) => void;
}

const SkillSection = ({ skillId, title, content, onAdd }: SkillSectionProps) => {
  const isMobile = useIsMobile();
  
  if (!content) return null;
  
  return (
    <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h4 className={`font-medium mb-1 ${isMobile ? 'text-sm' : 'text-base'}`}>{title}</h4>
          <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{content}</p>
        </div>
        <Button
          size={isMobile ? "sm" : "icon"}
          variant="ghost"
          onClick={() => onAdd(skillId, title, content)}
          className="hover:bg-accent shrink-0"
        >
          <Plus className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        </Button>
      </div>
    </div>
  );
};

export default SkillSection;