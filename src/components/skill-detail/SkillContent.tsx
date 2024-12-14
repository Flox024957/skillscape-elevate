import { motion } from "framer-motion";
import { Trophy, Book, Rocket, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillContentProps {
  resume: string;
  description: string;
  actionConcrete: string;
  examples: any[];
}

export const SkillContent = ({ resume, description, actionConcrete, examples }: SkillContentProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Left Column - Main Info */}
      <div className="space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                   border border-white/10 bg-black/50 shadow-xl"
        >
          <Trophy className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Résumé
          </h2>
          <p className="text-muted-foreground">{resume}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                   border border-white/10 bg-black/50 shadow-xl"
        >
          <Book className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Description
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>
      </div>

      {/* Right Column - Action & Examples */}
      <div className="space-y-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                   border border-white/10 bg-black/50 shadow-xl"
        >
          <Rocket className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Action Concrète
          </h2>
          <p className="text-muted-foreground">{actionConcrete}</p>
        </motion.div>

        {examples.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                     border border-white/10 bg-black/50 shadow-xl"
          >
            <Shield className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Exemples
            </h2>
            <div className="grid gap-4">
              {examples.map((example, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 group/item hover:bg-primary/5 p-4 rounded-lg transition-colors"
                >
                  <Badge 
                    variant="outline" 
                    className="shrink-0 bg-primary/5 border-primary/20 text-primary"
                  >
                    {index + 1}
                  </Badge>
                  <p className="text-muted-foreground">{String(example)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};