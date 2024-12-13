import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ExamplesSectionProps {
  skillId: string;
  examples: Json[] | null;
  onAdd: (skillId: string, title: string, examples: Json[] | null) => void;
}

const ExamplesSection = ({ skillId, examples, onAdd }: ExamplesSectionProps) => {
  if (!examples || examples.length === 0) return null;
  
  return (
    <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-sm text-muted-foreground mb-2">Examples</h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <p key={index} className="text-sm pl-4 border-l-2 border-border">
                {String(example)}
              </p>
            ))}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAdd(skillId, "Examples", examples)}
          className="hover:bg-accent ml-2"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExamplesSection;