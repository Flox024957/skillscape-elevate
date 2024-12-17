import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface SkillSectionProps {
  skillId: string;
  title: string;
  content: string | null;
  onAdd: (skillId: string, title: string, content: string | null) => void;
}

const SkillSection = ({ skillId, title, content, onAdd }: SkillSectionProps) => {
  if (!content) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-background to-card p-8 rounded-xl border border-border/50 hover:border-primary/50 
                 shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 space-y-4">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            {title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground leading-relaxed"
          >
            {content}
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onAdd(skillId, title, content)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full 
                     bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px]
                     transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
            <Plus className="h-5 w-5 relative z-10 text-white group-hover:text-primary transition-colors" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillSection;