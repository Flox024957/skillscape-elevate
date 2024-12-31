import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordingSection } from "@/components/dashboard/audio/RecordingSection";
import PlaylistSelector from "@/components/dashboard/audio/PlaylistSelector";
import { usePlaylist } from "@/components/dashboard/audio/usePlaylist";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { toast } from "sonner";

const AudioTab = () => {
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
    <Tabs defaultValue="player" className="w-full space-y-6">
      <TabsList className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30">
        <TabsTrigger 
          value="player"
          className="data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-white"
        >
          Lecteur
        </TabsTrigger>
        <TabsTrigger 
          value="recorder"
          className="data-[state=active]:bg-[#0EA5E9]/20 data-[state=active]:text-white"
        >
          Enregistreur
        </TabsTrigger>
      </TabsList>

      <TabsContent value="player" className="space-y-4">
        <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-6">
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
      </TabsContent>

      <TabsContent value="recorder">
        <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-6">
          <RecordingSection />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AudioTab;