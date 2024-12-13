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
      {/* Enhanced animated background effects */}
      <div className="absolute inset-0 z-0">
        {/* Primary orbs with enhanced animations */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0EA5E9]/20 rounded-full 
                      filter blur-[150px] animate-float-slow transform-gpu"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F97316]/20 rounded-full 
                      filter blur-[150px] animate-float-medium transform-gpu delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[800px] h-[800px] bg-[#8B5CF6]/20 rounded-full 
                      filter blur-[180px] animate-float-fast transform-gpu delay-500"></div>
        
        {/* Secondary orbs for depth */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#0EA5E9]/15 rounded-full 
                      filter blur-[120px] animate-pulse-slow transform-gpu delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#F97316]/15 rounded-full 
                      filter blur-[120px] animate-pulse-medium transform-gpu delay-1500"></div>
        
        {/* Accent orbs */}
        <div className="absolute top-1/3 left-2/3 w-[300px] h-[300px] bg-[#8B5CF6]/10 rounded-full 
                      filter blur-[100px] animate-pulse-fast transform-gpu delay-300"></div>
        <div className="absolute bottom-1/3 right-2/3 w-[300px] h-[300px] bg-[#0EA5E9]/10 rounded-full 
                      filter blur-[100px] animate-float-slow transform-gpu delay-1200"></div>
      </div>

      {/* Enhanced neon border effect */}
      <div className="absolute inset-0 border border-[#8B5CF6]/30 
                    shadow-[inset_0_0_100px_rgba(139,92,246,0.5),0_0_50px_rgba(139,92,246,0.3)] 
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