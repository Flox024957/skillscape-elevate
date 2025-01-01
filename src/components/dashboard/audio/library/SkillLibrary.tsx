import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface SkillLibraryProps {
  onContentSelect: (content: string) => void;
  onSkillSelect: (skillId: string) => void;
  selectedSkills: string[];
}

export const SkillLibrary = ({ 
  onContentSelect, 
  onSkillSelect,
  selectedSkills 
}: SkillLibraryProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

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

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddToPlaylist = async (skillId: string, title: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour ajouter à la playlist");
        return;
      }

      const { data: existingPlaylist } = await supabase
        .from('skill_playlists')
        .select()
        .eq('user_id', user.id)
        .eq('name', 'Lecture en cours')
        .single();

      if (existingPlaylist) {
        const updatedSkills = [...(existingPlaylist.skills || []), skillId];
        const { error } = await supabase
          .from('skill_playlists')
          .update({ 
            skills: updatedSkills,
            skill_order: [...(existingPlaylist.skill_order || []), updatedSkills.length - 1]
          })
          .eq('id', existingPlaylist.id);

        if (error) {
          toast.error("Erreur lors de l'ajout à la playlist");
          return;
        }
      } else {
        const { error } = await supabase
          .from('skill_playlists')
          .insert([{
            user_id: user.id,
            name: 'Lecture en cours',
            skills: [skillId],
            skill_order: [0]
          }]);

        if (error) {
          toast.error("Erreur lors de la création de la playlist");
          return;
        }
      }

      onSkillSelect(skillId);
      toast.success(`${title} ajouté à la playlist de lecture`);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <Collapsible
            key={category.id}
            open={openCategories.includes(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <div className="flex items-center justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  category.skills.forEach(skill => {
                    if (!selectedSkills.includes(skill.id)) {
                      handleAddToPlaylist(skill.id, skill.titre);
                    }
                  });
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
                      onClick={() => handleAddToPlaylist(skill.id, skill.titre)}
                      disabled={selectedSkills.includes(skill.id)}
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