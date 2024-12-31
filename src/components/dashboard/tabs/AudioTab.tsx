import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Play } from "lucide-react";
import AudioPlayer from "@/components/dashboard/AudioPlayer";
import { SkillsSection } from "./audio/SkillsSection";
import { FiltersSection } from "./audio/FiltersSection";
import { PlaylistSection } from "./audio/PlaylistSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AudioTab = () => {
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
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

      const { data: playlist, error } = await supabase
        .from('skill_playlists')
        .select(`
          *,
          playlist_skills:skills!skill_playlists_skills_fkey (
            id,
            titre,
            resume
          )
        `)
        .eq('user_id', user.id)
        .eq('name', 'Lecture en cours')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return playlist ? {
        ...playlist,
        skills: playlist.playlist_skills || []
      } : null;
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Card className="bg-[#0A1E3D]/40 border-[#1E3D7B]/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-[#E5DEFF]">
          <span>Lecteur Audio</span>
          <Button 
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={toggleRecording}
            className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 hover:bg-[#1E3D7B]/40"
          >
            <Mic className="w-4 h-4 mr-2" />
            {isRecording ? "Arrêter" : "Enregistrer"}
          </Button>
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
                playlist={currentPlaylist?.skills}
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
      </CardContent>
    </Card>
  );
};

export default AudioTab;