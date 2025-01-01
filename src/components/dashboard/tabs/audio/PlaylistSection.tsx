import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useEffect } from "react";
import { PlaylistHeader } from "../../audio/playlist/PlaylistHeader";
import { PlaylistContent } from "../../audio/playlist/PlaylistContent";

export const PlaylistSection = () => {
  const queryClient = useQueryClient();

  const { data: currentPlaylist, refetch } = useQuery({
    queryKey: ['current-playlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: playlists, error: playlistError } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (playlistError) throw playlistError;
      if (!playlists?.length) return null;

      const playlistsWithSkills = await Promise.all(
        playlists.map(async (playlist) => {
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
        })
      );

      return playlistsWithSkills;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('playlist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'skill_playlists'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const handleCreatePlaylist = async (name: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté pour créer une playlist");
      return;
    }

    const { error } = await supabase
      .from('skill_playlists')
      .insert([{
        user_id: user.id,
        name: name,
        skills: [],
        skill_order: []
      }]);

    if (error) {
      toast.error("Erreur lors de la création de la playlist");
      return;
    }

    toast.success("Playlist créée avec succès");
    refetch();
  };

  const handleRemoveFromPlaylist = async (playlistId: string, skillId: string) => {
    const playlist = Array.isArray(currentPlaylist) 
      ? currentPlaylist.find(p => p.id === playlistId)
      : null;

    if (!playlist) return;

    const updatedSkills = playlist.skills.filter((s: any) => s.id !== skillId);
    const { error } = await supabase
      .from('skill_playlists')
      .update({ 
        skills: updatedSkills.map((s: any) => s.id),
        skill_order: Array.from({ length: updatedSkills.length }, (_, i) => i)
      })
      .eq('id', playlistId);

    if (error) {
      toast.error("Erreur lors de la suppression de la compétence");
      return;
    }

    toast.success("Compétence retirée de la playlist");
    refetch();
  };

  if (!currentPlaylist?.length) {
    return (
      <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            Aucune playlist créée
          </p>
          <PlaylistHeader onCreatePlaylist={handleCreatePlaylist} />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <PlaylistHeader onCreatePlaylist={handleCreatePlaylist} />
      <PlaylistContent 
        playlists={currentPlaylist}
        onPlay={(content) => {
          // Cette fonction sera connectée au lecteur audio
          console.log("Playing:", content);
        }}
        onRemoveFromPlaylist={handleRemoveFromPlaylist}
      />
    </Card>
  );
};
