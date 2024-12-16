import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/main/HeroSection";
import { FeaturesSection } from "@/components/main/FeaturesSection";
import { CategoriesSection } from "@/components/main/CategoriesSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background/50 backdrop-blur-sm">
      <div className="absolute inset-0 z-0">
        {/* Effet de fond amélioré */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-purple/10 via-background to-background" />
        
        {/* Cercles animés */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border border-neon-purple/20 rounded-full 
                       animate-pulse transform-gpu opacity-30" />
        </div>

        {/* Motifs géométriques */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] border border-neon-purple/10 
                       rounded-full animate-spin-slow transform-gpu" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] border border-neon-purple/10 
                       rounded-full animate-spin-slow-reverse transform-gpu" />
        </div>

        {/* Superpositions de dégradés */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Effet de bordure néon */}
      <div className="absolute inset-0 border border-neon-purple/20 
                    shadow-[inset_0_0_100px_rgba(139,92,246,0.2)] pointer-events-none" />

      <div className="container relative z-10 px-4 py-12 mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-20"
        >
          <motion.div
            className="glass-panel neon-frame overflow-hidden p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection />
          </motion.div>

          <motion.div
            className="glass-panel neon-frame overflow-hidden p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeaturesSection />
          </motion.div>

          <motion.div
            className="glass-panel neon-frame overflow-hidden p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CategoriesSection />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;