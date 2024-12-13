import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface Skill {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  examples: any[];
  concrete_action: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
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
      
      const { data: categoryData, error: categoryError } = await supabase
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

      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        throw categoryError;
      }

      console.log('Category data received:', categoryData);
      return categoryData as Category;
    },
  });

  const addSkillToDashboard = async (skillId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter une compétence");
        return;
      }

      const { error } = await supabase
        .from('user_skills')
        .upsert({
          user_id: user.id,
          skill_id: skillId,
        });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error("Cette compétence est déjà dans votre tableau de bord");
        } else {
          toast.error("Erreur lors de l'ajout de la compétence");
        }
        return;
      }

      toast.success("Compétence ajoutée au tableau de bord");
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error("Une erreur est survenue");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto p-4">
        <Card className="bg-background border-border">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-foreground mb-4">{category.name}</h1>
            <p className="text-muted-foreground mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill) => (
                <Card 
                  key={skill.id} 
                  className="p-4 hover:border-primary/50 transition-colors cursor-pointer group relative"
                  onClick={() => navigate(`/skill/${skill.id}`)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{skill.title}</h3>
                      {skill.summary && (
                        <p className="text-sm text-muted-foreground">{skill.summary}</p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        addSkillToDashboard(skill.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;