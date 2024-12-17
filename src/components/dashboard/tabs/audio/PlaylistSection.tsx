import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const PlaylistSection = () => {
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

  // Écouter les changements en temps réel sur la playlist
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

  if (!skills.length) {
    return (
      <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
        <p className="text-center text-muted-foreground">
          Aucune compétence dans la playlist
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <h4 className="font-semibold mb-4">Playlist en cours</h4>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {skills.map((skill: any, index: number) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
            >
              <span className="text-sm">{index + 1}. {skill.titre}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemoveFromPlaylist(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};