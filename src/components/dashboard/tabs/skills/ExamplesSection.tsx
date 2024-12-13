import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ExamplesSectionProps {
  skillId: string;
  examples: Json;
  onAdd: (skillId: string, title: string, content: Json) => void;
}

const ExamplesSection = ({ skillId, examples, onAdd }: ExamplesSectionProps) => {
  // Convert examples to array if it's not already
  const examplesArray = Array.isArray(examples) ? examples : [examples];
  
  if (!examples || examplesArray.length === 0) return null;

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Exemples</h3>
          <ul className="list-disc pl-4 space-y-2">
            {examplesArray.map((example, index) => (
              <li key={index} className="text-muted-foreground">
                {String(example)}
              </li>
            ))}
          </ul>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onAdd(skillId, "Examples", examples)}
          className="shrink-0 hover:bg-primary/10 hover:text-primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ExamplesSection;