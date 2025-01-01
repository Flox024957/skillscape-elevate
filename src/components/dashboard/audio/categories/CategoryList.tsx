import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface Category {
  id: string;
  name: string;
  skills: Skill[];
}

interface CategoryListProps {
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: (skills: string[]) => void;
}

export const CategoryList = ({ onSkillSelect, onCategorySelect }: CategoryListProps) => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories-with-skills'],
    queryFn: async () => {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;

      const categoriesWithSkills = await Promise.all(
        categoriesData.map(async (category) => {
          const { data: skills, error: skillsError } = await supabase
            .from('skills')
            .select('id, titre, resume')
            .eq('category_id', category.id);

          if (skillsError) throw skillsError;

          return {
            ...category,
            skills: skills || []
          };
        })
      );

      return categoriesWithSkills;
    },
  });

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <Collapsible key={category.id}>
            <div className="flex items-center justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const skillIds = category.skills.map(skill => skill.id);
                  onCategorySelect(skillIds);
                  toast.success(`Catégorie ${category.name} ajoutée à la playlist`);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tout ajouter
              </Button>
            </div>

            <CollapsibleContent className="mt-2 space-y-2">
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="ml-8 p-4 bg-card/50 hover:bg-card/80 rounded-lg border border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{skill.titre}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {skill.resume}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onSkillSelect(skill.id);
                        toast.success(`${skill.titre} ajouté à la playlist`);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  );
};