import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Skill {
  id: string;
  title: string;
  summary?: string;
  explanation?: string;
  examples?: any[];
  concrete_action?: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
}

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      console.log('Fetching category with ID:', categoryId);
      
      if (!categoryId) {
        throw new Error('Category ID is required');
      }

      const { data, error } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          description,
          skills (
            id,
            title,
            summary,
            explanation,
            examples,
            concrete_action
          )
        `)
        .eq('id', categoryId)
        .single();

      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }

      if (!data) {
        console.error('No category found with ID:', categoryId);
        throw new Error('Category not found');
      }

      console.log('Category data received:', data);
      return data as Category;
    },
    enabled: !!categoryId,
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleSkillClick = (skillId: string) => {
    console.log('Navigating to skill:', skillId);
    navigate(`/skill/${skillId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Catégorie non trouvée</h2>
          <p className="text-muted-foreground mt-2">La catégorie que vous recherchez n'existe pas.</p>
          <Button 
            onClick={() => navigate('/main')} 
            className="mt-4"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 to-pink-600">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.skills?.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border 
                         shadow-lg relative group cursor-pointer hover:border-primary/50 
                         transition-all duration-300"
                onClick={() => handleSkillClick(skill.id)}
              >
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {skill.title}
                </h3>
                {skill.summary && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {skill.summary}
                  </p>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                             from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 
                             transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;