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

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-futuristic-black bg-futuristic-grid bg-[size:50px_50px]">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-violet">
            Welcome to <span className="font-black">FLAP</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Explore skills, set goals, and track your personal development journey
          </p>
          <div className="flex flex-col gap-6 items-center">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-futuristic-blue to-futuristic-violet hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,163,255,0.5)]"
            >
              Get Started
            </Button>
            
            {/* Nouveau bouton lumineux pour le tableau de bord */}
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="relative group px-12 py-6 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Fond animé */}
              <div className="absolute inset-0 bg-gradient-to-r from-futuristic-blue via-futuristic-violet to-futuristic-blue bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              
              {/* Effet de lueur */}
              <div className="absolute inset-0 opacity-50 group-hover:opacity-75 blur-xl bg-gradient-to-r from-futuristic-blue via-futuristic-violet to-futuristic-blue bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              
              {/* Bordure lumineuse */}
              <div className="absolute inset-0.5 rounded-xl bg-futuristic-black" />
              
              {/* Texte avec effet de lueur */}
              <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-violet animate-pulse">
                Tableau de bord
              </span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative bg-futuristic-gray/30 backdrop-blur-md rounded-lg p-6 border-2 border-transparent hover:border-futuristic-blue/50 transition-all duration-300">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-futuristic-black/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-futuristic-blue transition-colors">
                  {category.name}
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-futuristic-violet hover:text-futuristic-blue hover:bg-futuristic-violet/10"
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