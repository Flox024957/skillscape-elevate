import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CategoryHeaderProps {
  name: string;
  description: string;
  onBack: () => void;
}

export const CategoryHeader = ({ name, description, onBack }: CategoryHeaderProps) => {
  return (
    <div className="space-y-6">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="hover:bg-primary/10"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux catégories
      </Button>

      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                   bg-gradient-to-r from-primary to-purple-600"
        >
          {name}
        </motion.h1>
        
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};