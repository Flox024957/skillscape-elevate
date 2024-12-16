import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Trophy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SkillsTabHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <TabsList 
      className={cn(
        "w-full flex flex-col gap-2 mb-8 bg-background/50 backdrop-blur-sm border border-border/50 p-1.5",
        !isMobile && "grid grid-cols-2 gap-2"
      )}
    >
      <TabsTrigger 
        value="learning" 
        className={cn(
          "flex items-center justify-center gap-2.5 py-3.5 rounded-lg transition-all",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "hover:bg-primary/5",
          isMobile && "w-full"
        )}
      >
        <Book className="w-4 h-4" />
        <span className="font-medium">En cours d'apprentissage</span>
      </TabsTrigger>
      <TabsTrigger 
        value="mastered" 
        className={cn(
          "flex items-center justify-center gap-2.5 py-3.5 rounded-lg transition-all",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "hover:bg-primary/5",
          isMobile && "w-full"
        )}
      >
        <Trophy className="w-4 h-4" />
        <span className="font-medium">Compétences maîtrisées</span>
      </TabsTrigger>
    </TabsList>
  );
};