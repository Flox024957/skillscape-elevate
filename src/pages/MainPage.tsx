import { motion } from "framer-motion";
import { CategoriesGrid } from "@/components/categories/CategoriesGrid";

const categories = [
  {
    id: "1",
    name: "Mindfulness",
    description: "Développez votre conscience et votre présence au quotidien"
  },
  {
    id: "2",
    name: "Productivity",
    description: "Optimisez votre temps et atteignez vos objectifs"
  },
  {
    id: "3",
    name: "Leadership",
    description: "Développez vos compétences en leadership"
  },
  {
    id: "4",
    name: "Communication",
    description: "Améliorez vos compétences en communication"
  },
  {
    id: "5",
    name: "Creativity",
    description: "Libérez votre potentiel créatif"
  },
  {
    id: "6",
    name: "Emotional Intelligence",
    description: "Développez votre intelligence émotionnelle"
  },
  {
    id: "7",
    name: "Decision Making",
    description: "Prenez de meilleures décisions"
  },
  {
    id: "8",
    name: "Time Management",
    description: "Gérez votre temps efficacement"
  },
  {
    id: "9",
    name: "Goal Setting",
    description: "Fixez et atteignez vos objectifs"
  }
];

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] 
                   bg-cover bg-center opacity-10 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
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
    </div>
  );
};

export default MainPage;