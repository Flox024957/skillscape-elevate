import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      const { data, error } = await supabase
        .from('categories')
        .select()
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Category fetch error:', error);
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });

  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ['categorySkills', id],
    queryFn: async () => {
      if (!id) throw new Error('Category ID is required');
      const { data, error } = await supabase
        .from('skills')
        .select()
        .eq('category_id', id);
      
      if (error) {
        console.error('Skills fetch error:', error);
        throw error;
      }
      return data;
    },
    enabled: !!id,
  });

  const addToDashboard = async (skillId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour ajouter une compétence",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_skills')
      .insert([{ 
        user_id: user.id, 
        skill_id: skillId,
        selected_sections: [] 
      }]);

    if (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la compétence",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Compétence ajoutée au tableau de bord",
      });
    }
  };

  if (categoryLoading || skillsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Chargement...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-destructive">Catégorie non trouvée</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/main")}
              className="mb-4"
            >
              ← Retour
            </Button>
            <h1 className={cn(
              "font-bold text-foreground",
              isMobile ? "text-2xl" : "text-3xl"
            )}>
              {category.name}
            </h1>
            {category.description && (
              <p className="text-muted-foreground mt-2">
                {category.description}
              </p>
            )}
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
          >
            Dashboard
          </Button>
        </div>

        <div className="grid gap-6">
          {skills?.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "bg-card/50 p-6 rounded-lg border border-border relative group",
                "hover:bg-card/80 transition-all duration-300"
              )}
              onClick={() => navigate(`/skill/${skill.id}`)}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold text-foreground group-hover:text-primary transition-colors",
                    isMobile ? "text-lg" : "text-xl"
                  )}>
                    {skill.title}
                  </h3>
                  {skill.summary && (
                    <p className={cn(
                      "text-muted-foreground mt-2",
                      isMobile ? "text-sm" : "text-base"
                    )}>
                      {skill.summary}
                    </p>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToDashboard(skill.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
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

export default CategoryPage;