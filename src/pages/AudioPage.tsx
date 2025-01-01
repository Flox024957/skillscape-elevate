import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistSelector from "@/components/dashboard/audio/PlaylistSelector";
import { usePlaylist } from "@/components/dashboard/audio/usePlaylist";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "@/components/dashboard/tabs/audio/SkillsSection";
import { PlaylistSection } from "@/components/dashboard/tabs/audio/PlaylistSection";
import { toast } from "sonner";

const AudioPage = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="container mx-auto p-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Lecteur Audio
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <Tabs defaultValue="skills" className="w-full space-y-6">
                <TabsList>
                  <TabsTrigger value="skills">Compétences</TabsTrigger>
                  <TabsTrigger value="playlist">Playlist</TabsTrigger>
                </TabsList>

                <TabsContent value="skills" className="space-y-4">
                  <SkillsSection 
                    onContentSelect={() => {}}
                    onSkillSelect={() => {}}
                    selectedSkills={currentPlaylist?.skills?.map(s => s.id) || []}
                    filters={{
                      userSkillsOnly: false,
                      includeMastered: true,
                      playbackSpeed: 1
                    }}
                  />
                </TabsContent>

                <TabsContent value="playlist" className="space-y-4">
                  <PlaylistSection />
                </TabsContent>
              </Tabs>
            </Card>

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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioPage;