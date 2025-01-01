import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SkillHeaderProps {
  title: string;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
}

export const SkillHeader = ({ title, onNavigateBack, onAddToDashboard }: SkillHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        onClick={onNavigateBack}
        className={cn(
          "w-fit hover:bg-primary/5 transition-colors group",
          isMobile && "absolute top-2 left-2 z-10"
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour
      </Button>
      
      <div className={cn(
        "flex items-center justify-between",
        isMobile && "mt-8"
      )}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
            isMobile ? "text-2xl" : "text-4xl",
            "leading-tight"
          )}
        >
          {title}
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToDashboard("skill", title)}
          className={cn(
            "group relative flex items-center justify-center rounded-full",
            "bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px]",
            "transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]",
            isMobile ? "w-10 h-10" : "w-12 h-12"
          )}
        >
          <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
          <PlusCircle className={cn(
            "relative z-10 text-white group-hover:text-primary transition-colors",
            isMobile ? "w-5 h-5" : "w-6 h-6"
          )} />
        </motion.button>
      </div>
    </div>
  );
};