import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MainPage = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select();
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-futuristic-black flex items-center justify-center">
        <div className="text-futuristic-blue text-xl">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-futuristic-black bg-futuristic-grid bg-[size:50px_50px]">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-futuristic-blue to-futuristic-violet bg-clip-text text-transparent">
            Welcome to FLAP
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
            Explore skills, set goals, and track your personal development journey
          </p>
          <div className="flex flex-col gap-6 items-center mb-12">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-futuristic-blue to-futuristic-violet hover:opacity-90 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,163,255,0.5)]"
            >
              Get Started
            </Button>
            
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="relative group px-12 py-6 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-futuristic-blue via-futuristic-violet to-futuristic-blue bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-0 opacity-50 group-hover:opacity-75 blur-xl bg-gradient-to-r from-futuristic-blue via-futuristic-violet to-futuristic-blue bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-0.5 rounded-xl bg-futuristic-black" />
              <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-violet animate-pulse">
                Tableau de bord
              </span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden border-2 animate-neon-pulse transition-all duration-300 hover:scale-105">
                <div className="aspect-square relative">
                  <img
                    src={`https://source.unsplash.com/800x800/?${category.name.toLowerCase()},skill`}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-futuristic-black/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-futuristic-blue transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;