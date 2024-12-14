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
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/app");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/app");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-background/95">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-1 transform-gpu opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-2 transform-gpu opacity-30 delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000A14] via-[#001428] to-[#001E3C] 
                        animate-cosmic-wave-3 transform-gpu opacity-20 delay-2000"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-4 border-[#001E3C]/50 
                       animate-circle-pulse transform-gpu 
                       shadow-[0_0_100px_rgba(0,30,60,0.6)] backdrop-blur-sm"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] border-2 border-[#001E3C]/30 
                        animate-hexagon-spin transform-gpu rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] border-2 border-[#001E3C]/20 
                        animate-hexagon-spin-reverse transform-gpu rotate-45 delay-1000"></div>
          
          <div className="absolute top-1/3 right-1/3 w-0 h-0 
                        border-l-[100px] border-l-transparent
                        border-b-[173.2px] border-b-[#001E3C]/20
                        border-r-[100px] border-r-transparent
                        animate-triangle-float transform-gpu"></div>
          <div className="absolute bottom-1/3 left-1/3 w-0 h-0 
                        border-l-[50px] border-l-transparent
                        border-b-[86.6px] border-b-[#001E3C]/30
                        border-r-[50px] border-r-transparent
                        animate-triangle-float-reverse transform-gpu delay-500"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] 
                        bg-[#001E3C]/20 rounded-full filter blur-[100px] animate-energy-pulse transform-gpu"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] 
                        border-2 border-[#001E3C]/30 rounded-full animate-orbital-spin-1 transform-gpu
                        shadow-[0_0_30px_#001E3C]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] 
                        border-2 border-[#000A14]/20 rounded-full animate-orbital-spin-2 transform-gpu
                        shadow-[0_0_20px_#000A14] delay-500"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#000A14]/30 rounded-full 
                        filter blur-[180px] animate-nebula-pulse-1 transform-gpu
                        shadow-[inset_0_0_50px_#000A14]"></div>
          <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-[#001428]/30 rounded-full 
                        filter blur-[180px] animate-nebula-pulse-2 transform-gpu delay-1000
                        shadow-[inset_0_0_50px_#001428]"></div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[#001832]/20 rounded-full 
                        filter blur-[150px] animate-flare-burst-1 transform-gpu
                        shadow-[0_0_100px_#001832]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-[#000A14]/20 rounded-full 
                        filter blur-[150px] animate-flare-burst-2 transform-gpu delay-500
                        shadow-[0_0_100px_#000A14]"></div>
        </div>
      </div>

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
