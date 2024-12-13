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
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{content}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAdd(skillId, title, content)}
          className="shrink-0 hover:bg-primary/10 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SkillSection;