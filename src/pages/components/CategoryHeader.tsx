import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface CategoryHeaderProps {
  name: string;
  description: string;
  onBack: () => void;
}

export const CategoryHeader = ({ name, description, onBack }: CategoryHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "space-y-4",
      isMobile && "px-4 pt-2"
    )}>
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className={cn(
          "hover:bg-primary/10 group",
          isMobile && "px-2 py-1 h-8"
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour
      </Button>

      <div className="text-center space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "font-bold bg-clip-text text-transparent",
            "bg-gradient-to-r from-primary to-purple-600",
            isMobile ? "text-2xl" : "text-4xl md:text-5xl"
          )}
        >
          {name}
        </motion.h1>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "text-muted-foreground max-w-2xl mx-auto",
              isMobile ? "text-sm px-2" : "text-lg"
            )}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};