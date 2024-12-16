import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { PlaylistSection } from "./audio/PlaylistSection";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: false,
    playbackSpeed: 1,
  });

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Lecteur Audio</span>
          <Button 
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
          >
            <Mic className="w-4 h-4 mr-2" />
            {isRecording ? "Arrêter" : "Enregistrer"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="filters">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="space-y-4">
            <SkillsSection
              onContentSelect={handleContentSelect}
              selectedSkills={selectedSkills}
              onSkillSelect={toggleSkillSelection}
            />
            
            <Button
              onClick={() => {
                if (selectedSkills.length > 0) {
                  // TODO: Implement selected skills playback
                }
              }}
              disabled={selectedSkills.length === 0}
              className="w-full"
            >
              Lire la sélection
            </Button>

            <AudioPlayer 
              selectedContent={selectedContent}
              onContentSelect={handleContentSelect}
              playbackSpeed={filters.playbackSpeed}
            />
          </TabsContent>

          <TabsContent value="playlists">
            <PlaylistSection onContentSelect={handleContentSelect} />
          </TabsContent>

          <TabsContent value="filters">
            <FiltersSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudioTab;