import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CallToAction from "@/components/landing/CallToAction";

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Enhanced neon background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0EA5E9]/30 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/30 rounded-full filter blur-[128px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/30 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced neon border effect */}
      <div className="absolute inset-0 border border-[#8B5CF6]/30 shadow-[inset_0_0_50px_rgba(139,92,246,0.5)] pointer-events-none"></div>

      <div className="container relative z-10 px-4 py-12 mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <HeroSection />
          <FeaturesSection />
          <CallToAction />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;