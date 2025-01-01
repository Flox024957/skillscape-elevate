import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AddToPlaylistDialog } from "../playlist/AddToPlaylistDialog";
import { useCategories } from "@/hooks/useCategories";
import { supabase } from "@/integrations/supabase/client";
import { CategoryItem } from "./CategoryItem";

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

  const handleAddToPlaylist = async (playlistId: string) => {
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
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            name={category.name}
            skills={category.skills}
            onAddCategory={() => {
              setSelectedCategory({
                skills: category.skills.map(skill => skill.id),
                name: category.name
              });
              setIsAddingCategory(true);
              setIsDialogOpen(true);
            }}
            onAddSkill={(skillId, title) => {
              setSelectedSkill({
                id: skillId,
                title: title
              });
              setIsAddingCategory(false);
              setIsDialogOpen(true);
            }}
          />
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
        onAdd={handleAddToPlaylist}
        title={isAddingCategory 
          ? `Catégorie : ${selectedCategory?.name}`
          : `Compétence : ${selectedSkill?.title}`
        }
      />
    </ScrollArea>
  );
};