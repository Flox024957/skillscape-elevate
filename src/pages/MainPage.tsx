import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Category } from "@/types/skills";
import { toast } from "sonner";

const MainPage = () => {
  console.log('Rendu initial de MainPage');
  
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Début de la requête des catégories');
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        console.log('Réponse brute de Supabase:', { categoriesData, categoriesError });
        
        if (categoriesError) {
          console.error('Erreur Supabase:', categoriesError);
          toast.error("Erreur lors du chargement des catégories");
          throw categoriesError;
        }
        
        if (!categoriesData) {
          console.log('Pas de données reçues de Supabase');
          return [];
        }
        
        console.log('Données des catégories reçues:', categoriesData);
        return categoriesData as Category[];
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
        toast.error("Erreur inattendue lors du chargement");
        throw error;
      }
    },
  });

  console.log('État actuel:', { isLoading, error, categoriesCount: categories?.length });

  if (isLoading) {
    console.log('Affichage du loader');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('Erreur détectée:', error);
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        <div className="text-red-500">Une erreur est survenue lors du chargement des catégories.</div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    console.log('Aucune catégorie trouvée');
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        <div>Aucune catégorie disponible.</div>
      </div>
    );
  }

  console.log('Rendu du composant avec les catégories:', categories);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 to-pink-600">
              Bienvenue sur FLAP
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explorez nos catégories et commencez votre voyage de développement personnel
            </p>
          </div>

          <CategoriesGrid categories={categories} />
        </motion.div>
      </div>
    </main>
  );
};

export default MainPage;