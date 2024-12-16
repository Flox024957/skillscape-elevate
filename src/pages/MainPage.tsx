import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/social/SearchBar";
import { ArrowRight, Sparkles, Target, Users, Rocket, Brain, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    title: "Développement Personnel",
    description: "Suivez votre progression et développez vos compétences à votre rythme"
  },
  {
    icon: <Target className="w-6 h-6 text-orange-400" />,
    title: "Objectifs Clairs",
    description: "Définissez et atteignez vos objectifs professionnels étape par étape"
  },
  {
    icon: <Users className="w-6 h-6 text-blue-400" />,
    title: "Communauté Active",
    description: "Partagez et apprenez avec une communauté de professionnels motivés"
  },
  {
    icon: <Rocket className="w-6 h-6 text-pink-400" />,
    title: "Progression Rapide",
    description: "Accélérez votre apprentissage grâce à nos outils innovants"
  },
  {
    icon: <Brain className="w-6 h-6 text-green-400" />,
    title: "Apprentissage Intelligent",
    description: "Utilisez l'IA pour optimiser votre parcours d'apprentissage"
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    title: "Récompenses",
    description: "Gagnez des badges et débloquez des achievements en progressant"
  }
];

const MainPage = () => {
  const navigate = useNavigate();
  
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories...');
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          skills (
            id,
            titre,
            resume
          )
        `)
        .order('name');
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw categoriesError;
      }
      
      const transformedCategories = categoriesData?.map(category => ({
        ...category,
        skills: category.skills?.map(skill => ({
          id: skill.id,
          title: skill.titre,
          summary: skill.resume
        }))
      }));
      
      console.log('Categories fetched:', transformedCategories);
      return transformedCategories;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-purple-900/20 pointer-events-none" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full animate-cosmic-wave-1 opacity-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full animate-cosmic-wave-2 opacity-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent 
                     bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Bienvenue sur FLAP
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
            vers l'excellence professionnelle
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                       text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl
                       transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate("/auth")}
            >
              Commencer Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500/50 hover:border-purple-500 text-purple-400
                       hover:text-purple-300 font-semibold px-8 py-6 rounded-xl
                       backdrop-blur-sm transition-all duration-300"
              onClick={() => navigate("/dashboard")}
            >
              Explorer la Plateforme
            </Button>
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <SearchBar />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20
                       hover:border-purple-500/40 transition-all duration-300
                       transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-white/10 rounded-lg p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 to-pink-500">
            Explorez nos Catégories
          </h2>

          {isLoading ? (
            <div className="text-center text-gray-300">Chargement des catégories...</div>
          ) : (
            <CategoriesGrid categories={categories || []} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MainPage;
