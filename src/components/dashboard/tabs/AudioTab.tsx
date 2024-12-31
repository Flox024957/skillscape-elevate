import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";
import { PlaylistSection } from "./audio/PlaylistSection";
import { RecordingSection } from "../audio/RecordingSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(-1);
  const [filters, setFilters] = useState({
    userSkillsOnly: false,
    includeMastered: false,
    playbackSpeed: 1,
    categoryId: undefined as string | undefined,
  });
  const isMobile = useIsMobile();

  const { data: currentPlaylist } = useQuery({
    queryKey: ['current-playlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // First get the playlist
      const { data: playlist, error: playlistError } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id)
        .eq('name', 'Lecture en cours')
        .single();

      if (playlistError && playlistError.code !== 'PGRST116') throw playlistError;
      if (!playlist) return null;

      // Then get the skills if there are any in the playlist
      if (playlist.skills && playlist.skills.length > 0) {
        const { data: skills, error: skillsError } = await supabase
          .from('skills')
          .select('id, titre, resume')
          .in('id', playlist.skills);

        if (skillsError) throw skillsError;

        return {
          ...playlist,
          skills: skills || []
        };
      }

      return {
        ...playlist,
        skills: []
      };
    },
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

  const handlePlaylistIndexChange = (index: number) => {
    setCurrentPlaylistIndex(index);
    if (currentPlaylist?.skills?.[index]) {
      setSelectedContent(currentPlaylist.skills[index].resume);
    }
  };

  return (
    <Card className="bg-[#0A1E3D]/40 border-[#1E3D7B]/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-[#E5DEFF]">Lecteur Audio</CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "space-y-6",
        isMobile && "px-2"
      )}>
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="recordings">Enregistrements</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
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
                    onContentSelect={handleContentSelect}
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
                    playlist={currentPlaylist?.skills || []}
                    currentPlaylistIndex={currentPlaylistIndex}
                    onPlaylistIndexChange={handlePlaylistIndexChange}
                  />
                </Card>

                <PlaylistSection />

                <FiltersSection
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recordings">
            <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
              <RecordingSection />
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudioTab;