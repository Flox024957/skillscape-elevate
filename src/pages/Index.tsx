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
      {/* Enhanced background effects with subtle gradients */}
      <div className="absolute inset-0 z-0">
        {/* Primary orbs with refined animations */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0C4A6E]/30 rounded-full 
                      filter blur-[200px] animate-[float-slow_35s_ease-in-out_infinite] transform-gpu"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#8B5CF6]/20 rounded-full 
                      filter blur-[200px] animate-[float-medium_30s_ease-in-out_infinite] transform-gpu delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[1000px] h-[1000px] bg-[#F97316]/15 rounded-full 
                      filter blur-[250px] animate-[float-fast_25s_ease-in-out_infinite] transform-gpu delay-500"></div>
        
        {/* Secondary subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C4A6E]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 via-transparent to-[#F97316]/5"></div>
      </div>

      {/* Refined glass border effect */}
      <div className="absolute inset-0 border border-[#0369A1]/10 
                    shadow-[inset_0_0_100px_rgba(3,105,161,0.2),0_0_50px_rgba(3,105,161,0.1)] 
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