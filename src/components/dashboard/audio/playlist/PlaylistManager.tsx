import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { usePlaylist } from "../usePlaylist";
import { toast } from "sonner";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { PlaylistControls } from "./PlaylistControls";
import { PlaylistItem } from "./PlaylistItem";

export const PlaylistManager = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const { data: currentPlaylist, error, isLoading } = usePlaylist(selectedPlaylist);

  const handleSkillChange = (index: number) => {
    if (currentPlaylist?.skills && index < currentPlaylist.skills.length) {
      setSelectedSkillIndex(index);
    }
  };

  const handlePlaylistChange = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
    setSelectedSkillIndex(0);
    toast.success("Playlist sélectionnée");
  };

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

  const currentSkill = currentPlaylist?.skills?.[selectedSkillIndex];
  const selectedContent = currentSkill ? 
    typeof currentSkill === 'object' ? 
      `${currentSkill.titre}. ${currentSkill.resume}` : 
      "" : 
    "";

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <PlaylistControls
          selectedPlaylist={selectedPlaylist}
          onPlaylistChange={handlePlaylistChange}
        />

        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Chargement de la playlist...
          </div>
        ) : currentPlaylist ? (
          <>
            <AudioPlayer
              selectedContent={selectedContent}
              onContentSelect={() => {}}
              playbackSpeed={1}
              skills={currentPlaylist.skills}
              selectedSkillIndex={selectedSkillIndex}
              onSkillChange={handleSkillChange}
            />

            <ScrollArea className="h-[500px]">
              {currentPlaylist?.skills?.map((skill, index) => {
                const skillData = typeof skill === 'object' ? skill : {
                  id: skill,
                  titre: '',
                  resume: ''
                };

                return (
                  <PlaylistItem
                    key={skillData.id}
                    id={skillData.id}
                    titre={skillData.titre}
                    resume={skillData.resume}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === currentPlaylist.skills.length - 1}
                    onMoveUp={(id) => handleMoveSkill(id, 'up')}
                    onMoveDown={(id) => handleMoveSkill(id, 'down')}
                    onRemove={handleRemoveSkill}
                  />
                );
              })}
            </ScrollArea>
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Sélectionnez une playlist pour commencer
          </div>
        )}
      </div>
    </Card>
  );
};