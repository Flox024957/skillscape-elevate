import { Card } from "@/components/ui/card";
import PlaylistSelector from "../PlaylistSelector";
import AudioPlayer from "../../AudioPlayer";
import { usePlaylist } from "../usePlaylist";
import { useState } from "react";
import { toast } from "sonner";

export const PlaylistManager = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const { data: currentPlaylist, isLoading } = usePlaylist(selectedPlaylist);

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

  const currentSkill = currentPlaylist?.skills?.[selectedSkillIndex];
  const selectedContent = currentSkill ? `${currentSkill.titre}. ${currentSkill.resume}` : "";

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <PlaylistSelector 
          selectedPlaylist={selectedPlaylist}
          onPlaylistChange={handlePlaylistChange}
        />

        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Chargement de la playlist...
          </div>
        ) : currentPlaylist ? (
          <AudioPlayer
            selectedContent={selectedContent}
            onContentSelect={() => {}}
            playbackSpeed={1}
            skills={currentPlaylist.skills}
            selectedSkillIndex={selectedSkillIndex}
            onSkillChange={handleSkillChange}
          />
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Sélectionnez une playlist pour commencer
          </div>
        )}
      </div>
    </Card>
  );
};