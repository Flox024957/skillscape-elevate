import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";
import { PlaylistSection } from "./audio/PlaylistSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import VoiceRecordingsSection from "./audio/recordings/VoiceRecordingsSection";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: false,
    playbackSpeed: 1,
    categoryId: undefined as string | undefined,
  });
  const isMobile = useIsMobile();

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

  return (
    <Card className="bg-[#0A1E3D]/40 border-[#1E3D7B]/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-[#E5DEFF]">
          Lecteur Audio
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "space-y-6",
        isMobile && "px-2"
      )}>
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-2"
        )}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#E5DEFF]">Compétences disponibles</h3>
            <ScrollArea className={cn(
              "rounded-md border border-[#1E3D7B]/30 bg-[#1E3D7B]/10 p-4",
              isMobile ? "h-[600px]" : "h-full min-h-[800px]"
            )}>
              <SkillsSection
                onSkillSelect={handleSkillSelect}
                selectedSkills={selectedSkills}
                filters={filters}
              />
            </ScrollArea>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#E5DEFF]">Lecture</h3>
            <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
              <AudioPlayer 
                selectedContent={selectedContent}
                onContentSelect={handleContentSelect}
                playbackSpeed={filters.playbackSpeed}
              />
            </Card>

            <PlaylistSection />

            <FiltersSection
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <VoiceRecordingsSection />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioTab;