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
    <div className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* Enhanced background effects with more prominent gradients */}
      <div className="absolute inset-0 z-0">
        {/* Primary orbs with enhanced animations and opacity */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#0C4A6E]/40 rounded-full 
                      filter blur-[150px] animate-[float-slow_40s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-[#6E59A5]/30 rounded-full 
                      filter blur-[150px] animate-[float-medium_35s_ease-in-out_infinite] transform-gpu delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[1200px] h-[1200px] bg-[#F97316]/20 rounded-full 
                      filter blur-[200px] animate-[float-fast_30s_ease-in-out_infinite] transform-gpu delay-500"></div>
        
        {/* Additional animated elements */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0C4A6E]/30 rounded-full 
                      filter blur-[100px] animate-pulse-slow transform-gpu"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-[#6E59A5]/25 rounded-full 
                      filter blur-[120px] animate-pulse-medium transform-gpu delay-700"></div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A6E]/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6E59A5]/10 via-transparent to-[#F97316]/10"></div>
      </div>

      {/* Refined glass border effect */}
      <div className="absolute inset-0 border border-[#0369A1]/15 
                    shadow-[inset_0_0_150px_rgba(3,105,161,0.3),0_0_70px_rgba(3,105,161,0.2)] 
                    pointer-events-none"></div>

      <div className="container relative z-10 px-4 py-16 mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto space-y-24"
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