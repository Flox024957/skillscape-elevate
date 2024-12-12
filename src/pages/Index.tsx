import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="min-h-screen bg-gradient-to-b from-flap-black to-flap-black/95">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-flap-white">
            Welcome to <span className="text-flap-neon">FLAP</span>
          </h1>
          <p className="text-flap-white/80 max-w-2xl mx-auto mb-8">
            Explore skills, set goals, and track your personal development journey
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/auth")}
              className="glass-panel hover:bg-flap-neon/20 transition-colors duration-300"
            >
              Get Started
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="glass-panel p-6 hover-lift cursor-pointer h-full">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-radial from-transparent to-flap-black/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;