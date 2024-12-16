import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Trophy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SkillsTabHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <TabsList 
      className={cn(
        "w-full flex flex-col gap-4 mb-8 bg-background/50 backdrop-blur-sm border border-border/50 p-3",
        !isMobile && "grid grid-cols-2 gap-4"
      )}
    >
      <TabsTrigger 
        value="learning" 
        className={cn(
          "flex items-center justify-center gap-3 py-4 rounded-lg transition-all",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "hover:bg-primary/5",
          isMobile && "w-full"
        )}
      >
        <Book className="w-5 h-5" />
        <span className="font-medium">En cours d'apprentissage</span>
      </TabsTrigger>
      <TabsTrigger 
        value="mastered" 
        className={cn(
          "flex items-center justify-center gap-3 py-4 rounded-lg transition-all",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "hover:bg-primary/5",
          isMobile && "w-full"
        )}
      >
        <Trophy className="w-5 h-5" />
        <span className="font-medium">Compétences maîtrisées</span>
      </TabsTrigger>
    </TabsList>
  );
};