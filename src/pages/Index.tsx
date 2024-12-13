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
    icon: "✨"
  },
  {
    title: "Objectifs Clairs",
    description: "Définissez et atteignez vos objectifs professionnels étape par étape",
    icon: "🎯"
  },
  {
    title: "Communauté Active",
    description: "Partagez et apprenez avec une communauté de professionnels motivés",
    icon: "🤝"
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container px-4 py-12 mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
              FLAP
            </h1>
            <p className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-purple-500/80">
              Élevez Votre Potentiel Professionnel
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression vers l'excellence professionnelle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground 
                         shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Commencer Gratuitement
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl border-primary/50 hover:bg-primary/10 
                         shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 
                         hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 
                     rounded-2xl p-12 backdrop-blur-sm border border-primary/20"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Prêt à Transformer Votre Carrière ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez une communauté de professionnels motivés et commencez votre voyage vers l'excellence dès aujourd'hui.
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="px-8 py-6 text-lg rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground 
                       shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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