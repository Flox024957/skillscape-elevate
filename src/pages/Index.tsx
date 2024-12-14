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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617]/95 to-[#020617]">
      {/* Enhanced animated background effects with increased opacity */}
      <div className="absolute inset-0 z-0">
        {/* Primary orbs with enhanced animations and opacity */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0C4A6E]/60 rounded-full 
                      filter blur-[180px] animate-[float-slow_30s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#0369A1]/60 rounded-full 
                      filter blur-[180px] animate-[float-medium_25s_ease-in-out_infinite] transform-gpu delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[1000px] h-[1000px] bg-[#0C4A6E]/60 rounded-full 
                      filter blur-[200px] animate-[float-fast_20s_ease-in-out_infinite] transform-gpu delay-500"></div>
        
        {/* Secondary orbs for depth with increased opacity */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0369A1]/50 rounded-full 
                      filter blur-[150px] animate-[pulse-slow_15s_ease-in-out_infinite] transform-gpu delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#0C4A6E]/50 rounded-full 
                      filter blur-[150px] animate-[pulse-medium_12s_ease-in-out_infinite] transform-gpu delay-1500"></div>
        
        {/* Accent orbs with increased opacity */}
        <div className="absolute top-1/3 left-2/3 w-[400px] h-[400px] bg-[#0369A1]/45 rounded-full 
                      filter blur-[120px] animate-[pulse-fast_10s_ease-in-out_infinite] transform-gpu delay-300"></div>
        <div className="absolute bottom-1/3 right-2/3 w-[400px] h-[400px] bg-[#0C4A6E]/45 rounded-full 
                      filter blur-[120px] animate-[float-slow_18s_ease-in-out_infinite] transform-gpu delay-1200"></div>
      </div>

      {/* Enhanced neon border effect with reduced opacity */}
      <div className="absolute inset-0 border border-[#0369A1]/20 
                    shadow-[inset_0_0_150px_rgba(3,105,161,0.4),0_0_70px_rgba(3,105,161,0.3)] 
                    pointer-events-none"></div>

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