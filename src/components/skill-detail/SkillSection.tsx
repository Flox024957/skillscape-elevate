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
    <div className="glass-panel p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400">{content}</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAdd(type, content)}
          className="hover:bg-futuristic-blue/20"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};