import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const usePlaylist = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  const { data: playlist, refetch: refetchPlaylist } = useQuery({
    queryKey: ['current-playlist', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', userId)
        .eq('name', 'Lecture en cours')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['playlist-skills', playlist?.skills],
    queryFn: async () => {
      if (!playlist?.skills?.length) return [];

      const { data, error } = await supabase
        .from('skills')
        .select('id, titre, resume')
        .in('id', playlist.skills);

      if (error) throw error;
      return data || [];
    },
    enabled: !!playlist?.skills?.length,
  });

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('playlist_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_playlists',
          filter: `user_id=eq.${userId}`,
        },
        () => {
          refetchPlaylist();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, refetchPlaylist]);

  const handleRemoveFromPlaylist = async (skillId: string) => {
    if (!playlist || !userId) return;

    const updatedSkills = playlist.skills.filter((id: string) => id !== skillId);
    const { error } = await supabase
      .from('skill_playlists')
      .update({ 
        skills: updatedSkills,
        skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
      })
      .eq('id', playlist.id);

    if (error) {
      toast.error("Erreur lors de la suppression de la compétence");
      return;
    }

    toast.success("Compétence retirée de la playlist");
  };

  return {
    skills,
    handleRemoveFromPlaylist,
  };
};