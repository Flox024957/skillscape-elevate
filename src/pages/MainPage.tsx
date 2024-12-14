import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CallToAction from "@/components/landing/CallToAction";

const MainPage = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories...');
      const { data, error } = await supabase
        .from('categories')
        .select('*, skills(*)');

      if (error) {
        console.error('Error fetching categories:', error);
        toast.error("Erreur lors du chargement des catégories");
        throw error;
      }

      console.log('Categories fetched:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('Error in component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Une erreur est survenue lors du chargement des catégories.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Catégories de compétences
            </h2>
            {categories && categories.length > 0 ? (
              <CategoriesGrid categories={categories} />
            ) : (
              <div className="text-center text-muted-foreground">
                Aucune catégorie disponible pour le moment.
              </div>
            )}
          </div>

          <FeaturesSection />
          <CallToAction />
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;