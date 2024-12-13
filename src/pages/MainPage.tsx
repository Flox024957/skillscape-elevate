import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CategoryModel } from "@/components/3d/CategoryModel";
import { Suspense } from "react";

const getModelType = (index: number) => {
  const types = ['collaboration', 'infrastructure', 'workspace', 'data'] as const;
  return types[index % types.length];
};

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-xl">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-futuristic-grid bg-[size:50px_50px]">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-[#8B5CF6] bg-clip-text text-transparent">
            Welcome to FLAP
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Explore skills, set goals, and track your personal development journey
          </p>
          <div className="flex flex-col gap-6 items-center mb-12">
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary/90 hover:bg-primary/95 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              Get Started
            </Button>
            
            <motion.button
              onClick={() => navigate("/dashboard")}
              className="relative group px-12 py-6 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#8B5CF6] to-primary bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-0 opacity-50 group-hover:opacity-75 blur-xl bg-gradient-to-r from-primary via-[#8B5CF6] to-primary bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
              <div className="absolute inset-0.5 rounded-xl bg-background" />
              <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#8B5CF6] animate-pulse">
                Dashboard
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
              <div className="relative rounded-xl overflow-hidden backdrop-blur-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 bg-background/40">
                <div className="aspect-square relative">
                  <Canvas className="absolute inset-0">
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <OrbitControls 
                      enableZoom={false}
                      enablePan={false}
                      minPolarAngle={Math.PI / 3}
                      maxPolarAngle={Math.PI / 1.5}
                    />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Suspense fallback={null}>
                      <CategoryModel
                        modelType={getModelType(index)}
                        onClick={() => navigate(`/category/${category.id}`)}
                      />
                    </Suspense>
                  </Canvas>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
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