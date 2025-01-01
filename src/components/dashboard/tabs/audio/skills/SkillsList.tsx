import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

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

export const SkillsList = ({ skills }: SkillsListProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: playlists } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const handleAddToPlaylist = async (playlistId: string) => {
    if (!selectedSkill) return;

    const playlist = playlists?.find(p => p.id === playlistId);
    if (!playlist) return;

    const updatedSkills = [...(playlist.skills || []), selectedSkill.id];
    const { error } = await supabase
      .from('skill_playlists')
      .update({ 
        skills: updatedSkills,
        skill_order: [...(playlist.skill_order || []), updatedSkills.length - 1]
      })
      .eq('id', playlistId);

    if (error) {
      toast.error("Erreur lors de l'ajout à la playlist");
      return;
    }

    toast.success(`${selectedSkill.titre} ajouté à la playlist`);
    setIsDialogOpen(false);
    setSelectedSkill(null);
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
              onClick={() => {
                setSelectedSkill(skill);
                setIsDialogOpen(true);
              }}
              className="hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter à une playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {playlists?.map((playlist) => (
              <Button
                key={playlist.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddToPlaylist(playlist.id)}
              >
                {playlist.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};