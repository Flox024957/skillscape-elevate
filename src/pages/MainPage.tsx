import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const getCategoryImage = (categoryName: string) => {
  const images = {
    'Négociation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#cowboy',
    'Motivation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#flame',
    'Finance': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#money',
    'Relation': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#owl',
    'Gestion du stress': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#feather',
    'Évolution': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#book',
    'Entreprenariat': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#scale',
    'Bien-être': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#hourglass',
    'Confiance en soi': '/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png#tree'
  };
  return images[categoryName as keyof typeof images];
};

const getImagePosition = (categoryName: string): string => {
  const positions = {
    'Négociation': 'object-[0%_54%]',
    'Motivation': 'object-[50%_54%]',
    'Finance': 'object-[100%_54%]',
    'Relation': 'object-[0%_71%]',
    'Gestion du stress': 'object-[50%_71%]',
    'Évolution': 'object-[100%_71%]',
    'Entreprenariat': 'object-[0%_88%]',
    'Bien-être': 'object-[50%_88%]',
    'Confiance en soi': 'object-[100%_88%]'
  };
  return positions[categoryName as keyof typeof positions];
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
    <div className="min-h-screen bg-background bg-[url('/lovable-uploads/e9c7503e-7d72-442d-88b3-fb71c139dd55.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            FLAP
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Journal de bord
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
              className="group cursor-pointer relative h-[400px] overflow-hidden rounded-xl"
              onClick={() => {
                const element = document.querySelector(`#category-${category.id}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => navigate(`/category/${category.id}`), 500);
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-[url('${getCategoryImage(category.name)}')] bg-cover ${getImagePosition(category.name)} transition-transform duration-500 ease-out`}
                whileHover={{ scale: 1.1 }}
                id={`category-${category.id}`}
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/75 line-clamp-2 group-hover:text-white/90 transition-colors">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;