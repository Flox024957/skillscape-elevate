import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Trophy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SkillsTabHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <TabsList 
      className={cn(
        "w-full flex flex-col gap-4 mb-8 bg-background/50 backdrop-blur-sm border border-border/50 p-3 sticky top-20 z-20",
        !isMobile && "grid grid-cols-2 gap-4"
      )}
    >
      <TabsTrigger 
        value="learning" 
        className={cn(
          "flex items-center justify-center gap-3 py-6 rounded-xl transition-all",
          "bg-card/50 backdrop-blur-sm border border-border/50",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "data-[state=active]:border-primary/50",
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
          "flex items-center justify-center gap-3 py-6 rounded-xl transition-all",
          "bg-card/50 backdrop-blur-sm border border-border/50",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "data-[state=active]:border-primary/50",
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