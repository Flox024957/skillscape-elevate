import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skill } from "@/types/skill";

export const usePlaylistContent = (currentPlaylist: string | null) => {
  return useQuery({
    queryKey: ['playlist-content', currentPlaylist],
    queryFn: async () => {
      if (!currentPlaylist) return [];

      // First get the playlist to get the skill IDs
      const { data: playlist, error } = await supabase
        .from('skill_playlists')
        .select('skills')
        .eq('id', currentPlaylist)
        .single();

      if (error) throw error;
      
      if (!playlist?.skills?.length) return [];

      // Then get the actual skills data
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .in('id', playlist.skills);

      if (skillsError) throw skillsError;

      return skills as Skill[];
    },
    enabled: !!currentPlaylist,
  });
};