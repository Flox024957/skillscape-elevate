import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const categories = [
  { id: 1, name: "Mindfulness", image: "/placeholder.svg" },
  { id: 2, name: "Productivity", image: "/placeholder.svg" },
  { id: 3, name: "Leadership", image: "/placeholder.svg" },
  { id: 4, name: "Communication", image: "/placeholder.svg" },
  { id: 5, name: "Creativity", image: "/placeholder.svg" },
  { id: 6, name: "Emotional Intelligence", image: "/placeholder.svg" },
  { id: 7, name: "Decision Making", image: "/placeholder.svg" },
  { id: 8, name: "Time Management", image: "/placeholder.svg" },
  { id: 9, name: "Goal Setting", image: "/placeholder.svg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
              Bienvenue sur FLAP
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Explorez vos compétences, fixez des objectifs et suivez votre développement personnel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate("/auth")}
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground 
                         shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Commencer
              </Button>
              
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-lg border-primary/50 hover:bg-primary/10 
                         shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Tableau de bord
              </Button>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group cursor-pointer bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 
                         hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg 
                              bg-gradient-to-br from-primary/20 to-primary/5">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;