import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

interface Skill {
  id: string;
  titre: string;
  resume: string;
}

interface Playlist {
  id: string;
  name: string;
  skills: string[];
  skill_order: number[];
}

export const PlaylistManager = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
  });

  const { data: currentPlaylist } = useQuery({
    queryKey: ['playlist', selectedPlaylist],
    enabled: !!selectedPlaylist,
    queryFn: async () => {
      const { data: playlist, error: playlistError } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('id', selectedPlaylist)
        .single();

      if (playlistError) throw playlistError;

      if (playlist.skills && playlist.skills.length > 0) {
        const { data: skills, error: skillsError } = await supabase
          .from('skills')
          .select('id, titre, resume')
          .in('id', playlist.skills);

        if (skillsError) throw skillsError;

        return {
          ...playlist,
          skills: skills || []
        };
      }

      return playlist;
    },
  });

  const handleMoveSkill = async (skillId: string, direction: 'up' | 'down') => {
    if (!currentPlaylist?.skills) return;

    const currentIndex = currentPlaylist.skills.findIndex(skill => 
      typeof skill === 'object' ? skill.id === skillId : skill === skillId
    );
    
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= currentPlaylist.skills.length) return;

    const newSkills = [...currentPlaylist.skills];
    [newSkills[currentIndex], newSkills[newIndex]] = [newSkills[newIndex], newSkills[currentIndex]];

    const { error } = await supabase
      .from('skill_playlists')
      .update({
        skills: newSkills.map(skill => typeof skill === 'object' ? skill.id : skill),
        skill_order: newSkills.map((_, i) => i)
      })
      .eq('id', currentPlaylist.id);

    if (error) {
      toast.error("Erreur lors du déplacement de la compétence");
      return;
    }

    toast.success("Ordre mis à jour");
  };

  const handleRemoveSkill = async (skillId: string) => {
    if (!currentPlaylist?.skills) return;

    const updatedSkills = currentPlaylist.skills.filter(skill => 
      typeof skill === 'object' ? skill.id !== skillId : skill !== skillId
    );
    
    const { error } = await supabase
      .from('skill_playlists')
      .update({
        skills: updatedSkills.map(skill => typeof skill === 'object' ? skill.id : skill),
        skill_order: updatedSkills.map((_, i) => i)
      })
      .eq('id', currentPlaylist.id);

    if (error) {
      toast.error("Erreur lors de la suppression de la compétence");
      return;
    }

    toast.success("Compétence retirée de la playlist");
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Playlists</h3>
          <Button
            onClick={async () => {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) {
                toast.error("Vous devez être connecté");
                return;
              }

              const name = prompt("Nom de la nouvelle playlist :");
              if (!name) return;

              const { error } = await supabase
                .from('skill_playlists')
                .insert([{
                  user_id: user.id,
                  name,
                  skills: [],
                  skill_order: []
                }]);

              if (error) {
                toast.error("Erreur lors de la création de la playlist");
                return;
              }

              toast.success("Playlist créée");
            }}
          >
            Nouvelle playlist
          </Button>
        </div>

        <ScrollArea className="h-[500px]">
          {currentPlaylist?.skills?.map((skill, index) => {
            const skillData = typeof skill === 'object' ? skill : { id: skill, titre: '', resume: '' };
            return (
              <div
                key={skillData.id}
                className="flex items-center justify-between p-4 bg-card/50 hover:bg-card/80 rounded-lg border border-border/50 mb-2"
              >
                <div>
                  <h4 className="font-medium">{skillData.titre}</h4>
                  <p className="text-sm text-muted-foreground">{skillData.resume}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveSkill(skillData.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveSkill(skillData.id, 'down')}
                    disabled={index === currentPlaylist.skills.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSkill(skillData.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </Card>
  );
};