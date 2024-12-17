import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Trophy } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const SkillsTabHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={cn(
        "w-full flex flex-col gap-6 mb-24 p-4 sticky top-20 z-20",
        "transform hover:scale-[1.01] transition-all duration-300",
        !isMobile && "grid grid-cols-2 gap-6"
      )}
    >
      <TabsTrigger 
        value="learning" 
        className={cn(
          "flex items-center justify-center gap-3 py-6 rounded-xl transition-all",
          "backdrop-blur-sm border border-border/50",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "data-[state=active]:border-primary/50",
          "hover:bg-primary/5 transform hover:scale-[1.02] transition-all duration-300",
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
          "backdrop-blur-sm border border-border/50",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none",
          "data-[state=active]:border-primary/50",
          "hover:bg-primary/5 transform hover:scale-[1.02] transition-all duration-300",
          isMobile && "w-full"
        )}
      >
        <Trophy className="w-5 h-5" />
        <span className="font-medium">Compétences maîtrisées</span>
      </TabsTrigger>
    </div>
  );
};