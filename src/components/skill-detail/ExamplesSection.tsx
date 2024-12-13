import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ExamplesSectionProps {
  examples: Json[];
  onAdd: (type: string, content: string) => void;
}

export const ExamplesSection = ({ examples, onAdd }: ExamplesSectionProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="text-xl font-semibold mb-4">Examples</h3>
      <div className="space-y-4">
        {examples.map((example: Json, index: number) => (
          <div key={index} className="flex justify-between items-start gap-4">
            <p className="text-muted-foreground flex-1">{String(example)}</p>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onAdd('Example', String(example))}
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};