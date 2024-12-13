import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-background bg-[url('/lovable-uploads/a4696846-0f8d-48d5-95a4-fd2587c79699.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white neon-text">
            FLAP
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer relative aspect-square w-full min-h-[200px] overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500"
              onClick={() => {
                const element = document.querySelector(`#category-${category.id}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => navigate(`/category/${category.id}`), 500);
              }}
            >
              <motion.div
                className={`absolute inset-0 bg-[url('${getCategoryImage(category.name)}')] bg-cover ${getImagePosition(category.name)} transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3`}
                whileHover={{ scale: 1.1 }}
                id={`category-${category.id}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-all duration-300">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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