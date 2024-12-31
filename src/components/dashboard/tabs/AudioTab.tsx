import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordingSection } from "@/components/dashboard/audio/RecordingSection";
import PlaylistSelector from "@/components/dashboard/audio/PlaylistSelector";
import { usePlaylist } from "@/components/dashboard/audio/usePlaylist";
import AudioPlayer from "@/components/dashboard/AudioPlayer";

const AudioTab = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const { toast } = useToast();

  const { data: currentPlaylist, isLoading: isPlaylistLoading } = usePlaylist(selectedPlaylist);

  const handleSkillChange = (index: number) => {
    if (currentPlaylist?.skills && index < currentPlaylist.skills.length) {
      setSelectedSkillIndex(index);
    }
  };

  const handlePlaylistChange = (playlistId: string) => {
    setSelectedPlaylist(playlistId);
    setSelectedSkillIndex(0);
  };

  return (
    <Tabs defaultValue="player" className="w-full space-y-6">
      <TabsList>
        <TabsTrigger value="player">Lecteur</TabsTrigger>
        <TabsTrigger value="recorder">Enregistreur</TabsTrigger>
      </TabsList>

      <TabsContent value="player" className="space-y-4">
        <Card className="p-6">
          <div className="space-y-4">
            <PlaylistSelector 
              selectedPlaylist={selectedPlaylist}
              onPlaylistChange={handlePlaylistChange}
            />

            {currentPlaylist && (
              <AudioPlayer
                skills={currentPlaylist.skills}
                selectedSkillIndex={selectedSkillIndex}
                onSkillChange={handleSkillChange}
              />
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="recorder">
        <Card className="p-6">
          <RecordingSection />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AudioTab;