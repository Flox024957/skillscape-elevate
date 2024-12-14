import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle, Sparkles, Target, Book, Lightbulb } from "lucide-react";
import { Skill } from "@/types/skills";
import { Badge } from "@/components/ui/badge";

type SkillDetailContentProps = {
  skill: Skill;
  onNavigateBack: () => void;
  onAddToDashboard: (type: string, content: string) => void;
};

export const SkillDetailContent = ({ 
  skill, 
  onNavigateBack,
  onAddToDashboard 
}: SkillDetailContentProps) => {
  const examples = Array.isArray(skill.exemples) ? skill.exemples : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const decorativeElements = {
    topLeft: {
      initial: { scale: 0.8, opacity: 0.3 },
      animate: {
        scale: [0.8, 1.1, 0.8],
        opacity: [0.3, 0.6, 0.3],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    bottomRight: {
      initial: { scale: 0.8, rotate: 0, opacity: 0.3 },
      animate: {
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 360],
        opacity: [0.3, 0.5, 0.3],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  };

  return (
    <div className="container max-w-6xl px-4 py-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl"
        initial={decorativeElements.topLeft.initial}
        animate={decorativeElements.topLeft.animate}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-primary/20 via-purple-500/20 to-orange-500/20 rounded-full blur-3xl"
        initial={decorativeElements.bottomRight.initial}
        animate={decorativeElements.bottomRight.animate}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 relative"
      >
        {/* Header Section */}
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
              variants={itemVariants}
              className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              {skill.titre}
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToDashboard("skill", skill.id)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full 
                       bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-[2px] 
                       transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              <div className="absolute inset-[1px] rounded-full bg-black/90 group-hover:bg-black/70 transition-colors" />
              <PlusCircle className="w-6 h-6 text-white relative z-10 group-hover:text-primary transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Main Info */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 relative group"
            >
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                Résumé
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {skill.resume}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 relative group"
            >
              <Book className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Action & Examples */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 relative group"
            >
              <Target className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Action Concrète
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {skill.action_concrete}
              </p>
            </motion.div>

            {examples.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="glass-panel p-8 relative group"
              >
                <Lightbulb className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
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
                        className="shrink-0 bg-primary/5 border-primary/20 text-primary group-hover/item:bg-primary/10 group-hover/item:border-primary/30 transition-colors"
                      >
                        {index + 1}
                      </Badge>
                      <p className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
                        {String(example)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};