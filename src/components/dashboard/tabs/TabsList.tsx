import { TabsList as BaseTabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Calendar, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const TabsList = () => {
  const isMobile = useIsMobile();

  return (
    <BaseTabsList className={cn(
      "w-full flex gap-2 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg sticky top-0 z-50",
      "shadow-lg shadow-purple-500/5",
      "transform hover:scale-[1.01] transition-all duration-300",
      isMobile ? "p-2 mb-20 mx-4 justify-center" : "p-1 mb-12"
    )}>
      <TabsTrigger 
        value="skills" 
        className={cn(
          "flex items-center justify-center gap-2",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
          "transition-all duration-300 py-3",
          "hover:bg-primary/5",
          "transform hover:scale-[1.02]",
          isMobile ? "text-sm flex-1 max-w-[110px]" : "text-base flex-1"
        )}
      >
        <Book className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
        {isMobile ? "Compétences" : "Compétences"}
      </TabsTrigger>
      <TabsTrigger 
        value="notes" 
        className={cn(
          "flex items-center justify-center gap-2",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
          "transition-all duration-300 py-3",
          "hover:bg-primary/5",
          "transform hover:scale-[1.02]",
          isMobile ? "text-sm flex-1 max-w-[110px]" : "text-base flex-1"
        )}
      >
        <Calendar className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
        Notes
      </TabsTrigger>
      <TabsTrigger 
        value="canvas" 
        className={cn(
          "flex items-center justify-center gap-2",
          "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
          "transition-all duration-300 py-3",
          "hover:bg-primary/5",
          "transform hover:scale-[1.02]",
          isMobile ? "text-sm flex-1 max-w-[110px]" : "text-base flex-1"
        )}
      >
        <PenTool className={cn("w-4 h-4", isMobile && "w-3.5 h-3.5")} />
        Canvas
      </TabsTrigger>
    </BaseTabsList>
  );
};