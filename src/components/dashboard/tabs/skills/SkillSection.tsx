import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SkillSectionProps {
  skillId: string;
  title: string;
  content: string | null;
  onAdd: (skillId: string, title: string, content: string | null) => void;
}

const SkillSection = ({ skillId, title, content, onAdd }: SkillSectionProps) => {
  if (!content) return null;
  
  return (
    <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-sm text-muted-foreground mb-1">{title}</h4>
          <p className="text-sm">{content}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAdd(skillId, title, content)}
          className="hover:bg-accent ml-2"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SkillSection;