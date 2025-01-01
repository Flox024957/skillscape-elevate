import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  titre: string;
  resume: string;
  categories?: {
    name: string;
  };
}

interface SkillsListProps {
  skills: Skill[];
  onContentSelect: (content: string) => void;
}

export const SkillsList = ({ skills, onContentSelect }: SkillsListProps) => {
  const handleAddToPlaylist = async (skillId: string, title: string) => {
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

    toast.success(`${title} ajouté à la playlist de lecture`);
  };

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div 
          key={skill.id}
          className="flex items-start justify-between p-4 bg-card hover:bg-card/80 rounded-lg border border-border group"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}.
              </span>
              <div>
                <h4 className="text-base font-medium group-hover:text-primary transition-colors">
                  {skill.titre}
                </h4>
                {skill.categories?.name && (
                  <span className="text-sm text-muted-foreground">
                    {skill.categories.name}
                  </span>
                )}
              </div>
            </div>
            {skill.resume && (
              <p className="text-sm text-muted-foreground mt-1 ml-6">
                {skill.resume}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleAddToPlaylist(skill.id, skill.titre)}
              className="hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onContentSelect(skill.resume || skill.titre)}
              className="hover:bg-primary/10"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};