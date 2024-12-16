import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: false,
    playbackSpeed: 1,
  });

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
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
      <CardContent className="space-y-4">
        <SkillsSection
          onContentSelect={handleContentSelect}
          filters={filters}
        />

        <AudioPlayer 
          selectedContent={selectedContent}
          onContentSelect={handleContentSelect}
          playbackSpeed={filters.playbackSpeed}
        />

        <FiltersSection
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </CardContent>
    </Card>
  );
};

export default AudioTab;