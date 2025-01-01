import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePlaylistContent = (currentPlaylist: string | null) => {
  return useQuery({
    queryKey: ['playlist-content', currentPlaylist],
    queryFn: async () => {
      if (!currentPlaylist) return [];

      const { data: playlist, error } = await supabase
        .from('skill_playlists')
        .select('skills')
        .eq('id', currentPlaylist)
        .single();

      if (error) throw error;

      if (!playlist?.skills?.length) return [];

      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('titre')
        .in('id', playlist.skills);

      if (skillsError) throw skillsError;

      return skills.map(skill => skill.titre);
    },
    enabled: !!currentPlaylist,
  });
};