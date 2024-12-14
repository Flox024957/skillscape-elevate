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
      {/* Enhanced darker animated background effects */}
      <div className="absolute inset-0 z-0">
        {/* Large cosmic waves */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-1 transform-gpu opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-2 transform-gpu opacity-30 delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-3 transform-gpu opacity-20 delay-2000"></div>
        </div>

        {/* Dynamic energy pulses */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] 
                        bg-[#001E3C]/20 rounded-full filter blur-[100px] animate-energy-pulse transform-gpu"></div>
        </div>

        {/* Orbital rings */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] 
                        border border-[#001E3C]/30 rounded-full animate-orbital-spin-1 transform-gpu"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] 
                        border border-[#000A14]/20 rounded-full animate-orbital-spin-2 transform-gpu"></div>
        </div>

        {/* Nebula clusters */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#000A14]/30 rounded-full 
                        filter blur-[180px] animate-nebula-pulse-1 transform-gpu"></div>
          <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-[#001428]/30 rounded-full 
                        filter blur-[180px] animate-nebula-pulse-2 transform-gpu delay-1000"></div>
        </div>

        {/* Stellar flares */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#001832]/20 rounded-full 
                        filter blur-[150px] animate-flare-burst-1 transform-gpu"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-[#000A14]/20 rounded-full 
                        filter blur-[150px] animate-flare-burst-2 transform-gpu delay-500"></div>
        </div>
      </div>

      {/* Enhanced neon border effect */}
      <div className="absolute inset-0 border border-[#8B5CF6]/30 
                    shadow-[inset_0_0_150px_rgba(139,92,246,0.6),0_0_70px_rgba(139,92,246,0.4)] 
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