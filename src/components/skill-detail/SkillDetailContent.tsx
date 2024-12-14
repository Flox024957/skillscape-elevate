import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle, Trophy, Book, Rocket, Shield } from "lucide-react";
import { Skill } from "@/types/skills";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

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

  // Fetch existing illustration
  const { data: illustration, isLoading: isLoadingIllustration } = useQuery({
    queryKey: ['skillIllustration', skill.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('skill_illustrations')
          .select('image_url')
          .eq('skill_id', skill.id);
        
        if (error) throw error;
        return data?.[0] || null;
      } catch (error) {
        console.error('Error fetching illustration:', error);
        return null;
      }
    },
  });

  // Generate illustration if none exists
  useEffect(() => {
    if (!isLoadingIllustration && !illustration) {
      const generateImage = async () => {
        try {
          await supabase.functions.invoke('generate-skill-image', {
            body: {
              skillId: skill.id,
              skillTitle: skill.titre,
              skillDescription: skill.description
            }
          });
        } catch (error) {
          console.error('Error generating image:', error);
        }
      };
      generateImage();
    }
  }, [skill, illustration, isLoadingIllustration]);

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

  const panelVariants = {
    initial: { 
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      scale: 1
    },
    hover: { 
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="container max-w-6xl px-4 py-8 relative overflow-hidden">
      {/* Background Illustration */}
      {illustration?.image_url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${illustration.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            zIndex: -1
          }}
        />
      )}

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
              initial="initial"
              whileHover="hover"
              animate="visible"
              className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                       border border-white/10 bg-black/50 shadow-xl"
            >
              <Trophy className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                Résumé
              </h2>
              <p className="text-muted-foreground leading-relaxed transition-colors duration-300 hover:text-foreground">
                {skill.resume}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
              animate="visible"
              className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                       border border-white/10 bg-black/50 shadow-xl"
            >
              <Book className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed transition-colors duration-300 hover:text-foreground">
                {skill.description}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Action & Examples */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
              animate="visible"
              className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                       border border-white/10 bg-black/50 shadow-xl"
            >
              <Rocket className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Action Concrète
              </h2>
              <p className="text-muted-foreground leading-relaxed transition-colors duration-300 hover:text-foreground">
                {skill.action_concrete}
              </p>
            </motion.div>

            {examples.length > 0 && (
              <motion.div
                variants={itemVariants}
                initial="initial"
                whileHover="hover"
                animate="visible"
                className="glass-panel p-8 relative rounded-xl backdrop-blur-sm 
                         border border-white/10 bg-black/50 shadow-xl"
              >
                <Shield className="absolute top-4 right-4 w-6 h-6 text-primary/40 group-hover:text-primary/60 transition-colors" />
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