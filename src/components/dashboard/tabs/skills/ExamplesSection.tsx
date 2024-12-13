import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Json } from "@/integrations/supabase/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExamplesSectionProps {
  skillId: string;
  examples: Json[] | null;
  onAdd: (skillId: string, title: string, content: string | Json[] | null) => void;
}

const ExamplesSection = ({ skillId, examples, onAdd }: ExamplesSectionProps) => {
  const isMobile = useIsMobile();
  
  if (!examples || examples.length === 0) return null;
  
  return (
    <div className="bg-card/50 p-4 rounded-lg border border-border mb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className={`font-medium mb-2 ${isMobile ? 'text-sm' : 'text-base'}`}>Examples</h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <p 
                key={index} 
                className={`pl-4 border-l-2 border-border ${isMobile ? 'text-xs' : 'text-sm'}`}
              >
                {String(example)}
              </p>
            ))}
          </div>
        </div>
        <Button
          size={isMobile ? "sm" : "icon"}
          variant="ghost"
          onClick={() => onAdd(skillId, "Examples", examples)}
          className="hover:bg-accent ml-2 shrink-0"
        >
          <Plus className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        </Button>
      </div>
    </div>
  );
};

export default ExamplesSection;