import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { AddToPlaylistDialog } from "../playlist/AddToPlaylistDialog";
import { useCategories } from "@/hooks/useCategories";
import { supabase } from "@/integrations/supabase/client";

interface CategoryListProps {
  onSkillSelect: (skillId: string) => void;
  onCategorySelect: (skills: string[]) => void;
}

export const CategoryList = ({ onSkillSelect, onCategorySelect }: CategoryListProps) => {
  const [selectedSkill, setSelectedSkill] = useState<{ id: string; title: string } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{ skills: string[]; name: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const { categories } = useCategories();

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
                  setSelectedCategory({
                    skills: category.skills.map(skill => skill.id),
                    name: category.name
                  });
                  setIsAddingCategory(true);
                  setIsDialogOpen(true);
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
                        setSelectedSkill({
                          id: skill.id,
                          title: skill.titre
                        });
                        setIsAddingCategory(false);
                        setIsDialogOpen(true);
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

      <AddToPlaylistDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedSkill(null);
          setSelectedCategory(null);
          setIsAddingCategory(false);
        }}
        onAdd={async (playlistId) => {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              toast.error("Vous devez être connecté");
              return;
            }

            if (playlistId === "current") {
              const { data: currentPlaylist } = await supabase
                .from('skill_playlists')
                .select()
                .eq('user_id', user.id)
                .eq('name', 'Lecture en cours')
                .single();

              if (currentPlaylist) {
                const skillsToAdd = isAddingCategory ? selectedCategory?.skills : [selectedSkill?.id];
                const updatedSkills = [...(currentPlaylist.skills || []), ...(skillsToAdd || [])];
                
                await supabase
                  .from('skill_playlists')
                  .update({ 
                    skills: updatedSkills,
                    skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
                  })
                  .eq('id', currentPlaylist.id);

                toast.success(isAddingCategory ? "Catégorie ajoutée à la playlist" : "Compétence ajoutée à la playlist");
              } else {
                const skillsToAdd = isAddingCategory ? selectedCategory?.skills : [selectedSkill?.id];
                await supabase
                  .from('skill_playlists')
                  .insert([{
                    user_id: user.id,
                    name: 'Lecture en cours',
                    skills: skillsToAdd,
                    skill_order: Array.from({ length: skillsToAdd?.length || 0 }, (_, i) => i)
                  }]);

                toast.success(isAddingCategory ? "Catégorie ajoutée à la playlist" : "Compétence ajoutée à la playlist");
              }
            } else {
              const { data: playlist } = await supabase
                .from('skill_playlists')
                .select()
                .eq('id', playlistId)
                .single();

              if (playlist) {
                const skillsToAdd = isAddingCategory ? selectedCategory?.skills : [selectedSkill?.id];
                const updatedSkills = [...(playlist.skills || []), ...(skillsToAdd || [])];
                
                await supabase
                  .from('skill_playlists')
                  .update({ 
                    skills: updatedSkills,
                    skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
                  })
                  .eq('id', playlistId);

                toast.success(isAddingCategory ? "Catégorie ajoutée à la playlist" : "Compétence ajoutée à la playlist");
              }
            }

            if (isAddingCategory) {
              onCategorySelect(selectedCategory?.skills || []);
            } else {
              onSkillSelect(selectedSkill?.id || '');
            }
          } catch (error) {
            console.error('Error:', error);
            toast.error("Une erreur est survenue");
          }
        }}
        title={isAddingCategory 
          ? `Catégorie : ${selectedCategory?.name}`
          : `Compétence : ${selectedSkill?.title}`
        }
      />
    </ScrollArea>
  );
};