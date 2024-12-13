import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SkillSectionProps {
  title: string;
  content: string | null;
  type: string;
  onAdd: (type: string, content: string) => void;
}

export const SkillSection = ({ title, content, type, onAdd }: SkillSectionProps) => {
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
          variant="outline"
          onClick={() => onAdd(type, content)}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};