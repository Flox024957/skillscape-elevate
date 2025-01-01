import { motion } from "framer-motion";
import { Trophy, Book, Rocket, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SkillContentProps {
  resume: string;
  description: string;
  actionConcrete: string;
  examples: any[];
}

export const SkillContent = ({ resume, description, actionConcrete, examples }: SkillContentProps) => {
  const isMobile = useIsMobile();
  
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
    <div className={cn(
      "grid gap-8",
      isMobile ? "grid-cols-1" : "md:grid-cols-2"
    )}>
      {/* Left Column - Main Info */}
      <div className="space-y-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "glass-panel relative rounded-xl backdrop-blur-sm",
            "border border-white/10 bg-black/50 shadow-xl",
            isMobile ? "p-4" : "p-8"
          )}
        >
          <Trophy className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className={cn(
            "font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Résumé
          </h2>
          <p className="text-muted-foreground">{resume}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "glass-panel relative rounded-xl backdrop-blur-sm",
            "border border-white/10 bg-black/50 shadow-xl",
            isMobile ? "p-4" : "p-8"
          )}
        >
          <Book className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className={cn(
            "font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Description
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>
      </div>

      {/* Right Column - Action & Examples */}
      <div className="space-y-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "glass-panel relative rounded-xl backdrop-blur-sm",
            "border border-white/10 bg-black/50 shadow-xl",
            isMobile ? "p-4" : "p-8"
          )}
        >
          <Rocket className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
          <h2 className={cn(
            "font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
            isMobile ? "text-xl" : "text-2xl"
          )}>
            Action Concrète
          </h2>
          <p className="text-muted-foreground">{actionConcrete}</p>
        </motion.div>

        {examples.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "glass-panel relative rounded-xl backdrop-blur-sm",
              "border border-white/10 bg-black/50 shadow-xl",
              isMobile ? "p-4" : "p-8"
            )}
          >
            <Shield className="absolute top-4 right-4 w-6 h-6 text-primary/40" />
            <h2 className={cn(
              "font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
              isMobile ? "text-xl" : "text-2xl"
            )}>
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