import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle } from "lucide-react";

interface SkillHeaderProps {
  title: string;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
}

export const SkillHeader = ({ title, onNavigateBack, onAddToDashboard }: SkillHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        onClick={onNavigateBack}
        className="w-fit hover:bg-primary/5 transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour
      </Button>
      
      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToDashboard("skill", title)}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full 
                   bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px] 
                   transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
        >
          <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
          <PlusCircle className="w-6 h-6 text-white relative z-10 group-hover:text-primary transition-colors" />
        </motion.button>
      </div>
    </div>
  );
};