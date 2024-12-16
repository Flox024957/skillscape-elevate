import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Play } from "lucide-react";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: false,
    playbackSpeed: 1,
  });

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
  };

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      }
      return [...prev, skillId];
    });
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
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compétences disponibles</h3>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <SkillsSection
                onContentSelect={handleContentSelect}
                onSkillSelect={handleSkillSelect}
                selectedSkills={selectedSkills}
                filters={filters}
              />
            </ScrollArea>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lecture</h3>
            <Card className="p-4">
              <AudioPlayer 
                selectedContent={selectedContent}
                onContentSelect={handleContentSelect}
                playbackSpeed={filters.playbackSpeed}
              />
            </Card>

            <FiltersSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioTab;