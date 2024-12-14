import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Skill } from "@/types/skills";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div className="container max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <Button
            variant="ghost"
            onClick={onNavigateBack}
            className="w-fit hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-background to-card p-8 rounded-xl border border-border/50 
                       hover:border-primary/50 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Résumé
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {skill.resume}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-background to-card p-8 rounded-xl border border-border/50 
                       hover:border-primary/50 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-primary/5 to-card p-8 rounded-xl border border-primary/20 
                       hover:border-primary/50 shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Action Concrète
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {skill.action_concrete}
              </p>
            </motion.div>

            {examples.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-background to-card p-8 rounded-xl border border-border/50 
                         hover:border-primary/50 shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Exemples
                </h2>
                <div className="grid gap-4">
                  {examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start gap-4 group"
                    >
                      <Badge 
                        variant="outline" 
                        className="shrink-0 bg-primary/5 border-primary/20 text-primary"
                      >
                        {index + 1}
                      </Badge>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
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