import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ExamplesSectionProps {
  examples: string[];
  onAdd: (type: string, content: string) => void;
}

export const ExamplesSection = ({ examples, onAdd }: ExamplesSectionProps) => {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-semibold mb-4">Examples</h3>
      <div className="space-y-4">
        {examples.map((example: string, index: number) => (
          <div key={index} className="flex justify-between items-start">
            <p className="text-gray-400 flex-1 mr-4">{example}</p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onAdd('Example', example)}
              className="hover:bg-futuristic-blue/20"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};