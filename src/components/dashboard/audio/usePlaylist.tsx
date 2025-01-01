import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CurrentPlaylist } from "./types";
import { toast } from "sonner";
import { useEffect } from "react";

export const usePlaylist = (playlistId: string | null) => {
  const { data: playlist, error, refetch } = useQuery({
    queryKey: ['playlist', playlistId],
    enabled: !!playlistId,
    queryFn: async () => {
      if (!playlistId) return null;

      const { data: playlist, error: playlistError } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('id', playlistId)
        .single();

      if (playlistError) {
        toast.error("Erreur lors du chargement de la playlist");
        throw playlistError;
      }
      
      if (!playlist) return null;

      if (playlist.skills && playlist.skills.length > 0) {
        const { data: skills, error: skillsError } = await supabase
          .from('skills')
          .select('id, titre, resume, description, exemples, action_concrete, category_id')
          .in('id', playlist.skills);

        if (skillsError) {
          toast.error("Erreur lors du chargement des compétences");
          throw skillsError;
        }

        return {
          ...playlist,
          skills: skills || []
        } as CurrentPlaylist;
      }

      return {
        ...playlist,
        skills: []
      } as CurrentPlaylist;
    },
  });

  useEffect(() => {
    if (!playlistId) return;

    const channel = supabase
      .channel('playlist_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_playlists',
          filter: `id=eq.${playlistId}`
        },
        () => {
          console.log('Playlist updated, refetching...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playlistId, refetch]);

  return { data: playlist, error };
};