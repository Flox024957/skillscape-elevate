import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Headphones, List, Music, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SkillsSection } from "./skills/SkillsSection";
import { PlaybackSection } from "./playback/PlaybackSection";
import { PlaylistSection } from "./PlaylistSection";
import { FiltersSection } from "./FiltersSection";
import VoiceRecordingsSection from "./recordings/VoiceRecordingsSection";

const AudioTabsContainer = () => {
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: true,
    playbackSpeed: 1,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Tabs defaultValue="skills" className="w-full">
      <TabsList className="grid grid-cols-5 h-auto gap-4 bg-background p-1">
        <TabsTrigger
          value="skills"
          className={cn(
            "flex flex-col items-center gap-1 p-2 data-[state=active]:bg-[#1E3D7B]/20",
            "hover:bg-[#1E3D7B]/10 transition-colors"
          )}
        >
          <User className="h-4 w-4" />
          <span className="text-xs">Compétences</span>
        </TabsTrigger>
        <TabsTrigger
          value="playback"
          className={cn(
            "flex flex-col items-center gap-1 p-2 data-[state=active]:bg-[#1E3D7B]/20",
            "hover:bg-[#1E3D7B]/10 transition-colors"
          )}
        >
          <Headphones className="h-4 w-4" />
          <span className="text-xs">Lecture</span>
        </TabsTrigger>
        <TabsTrigger
          value="playlists"
          className={cn(
            "flex flex-col items-center gap-1 p-2 data-[state=active]:bg-[#1E3D7B]/20",
            "hover:bg-[#1E3D7B]/10 transition-colors"
          )}
        >
          <Music className="h-4 w-4" />
          <span className="text-xs">Playlists</span>
        </TabsTrigger>
        <TabsTrigger
          value="filters"
          className={cn(
            "flex flex-col items-center gap-1 p-2 data-[state=active]:bg-[#1E3D7B]/20",
            "hover:bg-[#1E3D7B]/10 transition-colors"
          )}
        >
          <Settings className="h-4 w-4" />
          <span className="text-xs">Paramètres</span>
        </TabsTrigger>
        <TabsTrigger
          value="recordings"
          className={cn(
            "flex flex-col items-center gap-1 p-2 data-[state=active]:bg-[#1E3D7B]/20",
            "hover:bg-[#1E3D7B]/10 transition-colors"
          )}
        >
          <List className="h-4 w-4" />
          <span className="text-xs">Enregistrements</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="skills" className="m-0">
          <SkillsSection />
        </TabsContent>

        <TabsContent value="playback" className="m-0">
          <PlaybackSection />
        </TabsContent>

        <TabsContent value="playlists" className="m-0">
          <PlaylistSection />
        </TabsContent>

        <TabsContent value="filters" className="m-0">
          <FiltersSection 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </TabsContent>

        <TabsContent value="recordings" className="m-0">
          <VoiceRecordingsSection />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AudioTabsContainer;