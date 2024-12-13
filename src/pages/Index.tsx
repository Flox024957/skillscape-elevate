import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const features = [
  {
    title: "Développement Personnel",
    description: "Suivez votre progression et développez vos compétences à votre rythme",
    icon: "✨",
    color: "from-[#0EA5E9] to-[#33C3F0]"
  },
  {
    title: "Objectifs Clairs",
    description: "Définissez et atteignez vos objectifs professionnels étape par étape",
    icon: "🎯",
    color: "from-[#F97316] to-[#FEC6A1]"
  },
  {
    title: "Communauté Active",
    description: "Partagez et apprenez avec une communauté de professionnels motivés",
    icon: "🤝",
    color: "from-[#9b87f5] to-[#8B5CF6]"
  }
];

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
      {/* Animated background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0EA5E9]/20 rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/20 rounded-full filter blur-[128px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/20 rounded-full filter blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Neon border effect */}
      <div className="absolute inset-0 border border-[#8B5CF6]/30 shadow-[inset_0_0_30px_rgba(139,92,246,0.3)] pointer-events-none"></div>

      <div className="container relative z-10 px-4 py-12 mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20 perspective-1000"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#F97316]
                         transform hover:scale-105 transition-transform duration-300 cursor-default
                         drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              FLAP
            </motion.h1>
            <motion.p 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#33C3F0] to-[#9b87f5]
                         drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]"
              whileHover={{ scale: 1.02 }}
            >
              Élevez Votre Potentiel Professionnel
            </motion.p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression vers l'excellence professionnelle
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#7c4ef3] hover:to-[#8b76f3]
                         shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                         transform hover:-translate-y-1 transition-all duration-300
                         border border-[#8B5CF6]/50"
              >
                Commencer Gratuitement
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl
                         bg-background/30 backdrop-blur-sm
                         border border-[#8B5CF6]/50 hover:border-[#8B5CF6]
                         shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]
                         transform hover:-translate-y-1 transition-all duration-300"
              >
                Découvrir la Plateforme
              </Button>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group p-8 rounded-2xl relative overflow-hidden
                         bg-background/30 backdrop-blur-sm
                         border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/60
                         shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
                         transform transition-all duration-300
                         perspective-1000"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color})` }}></div>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center relative overflow-hidden
                     rounded-2xl p-12
                     bg-background/40 backdrop-blur-lg
                     border border-[#8B5CF6]/30
                     shadow-[0_0_30px_rgba(139,92,246,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 via-[#8B5CF6]/5 to-[#F97316]/5"></div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#F97316]">
              Prêt à Transformer Votre Carrière ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez une communauté de professionnels motivés et commencez votre voyage vers l'excellence dès aujourd'hui.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="px-8 py-6 text-lg rounded-xl
                       bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#7c4ef3] hover:to-[#8b76f3]
                       shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                       transform hover:-translate-y-1 transition-all duration-300
                       border border-[#8B5CF6]/50"
            >
              Commencer Maintenant
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;