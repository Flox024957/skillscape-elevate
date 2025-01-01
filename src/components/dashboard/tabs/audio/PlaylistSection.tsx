import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const PlaylistSection = () => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

      // Pour chaque playlist, récupérer les compétences
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

  // Écouter les changements en temps réel
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

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      toast.error("Veuillez entrer un nom pour la playlist");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Vous devez être connecté pour créer une playlist");
      return;
    }

    const { error } = await supabase
      .from('skill_playlists')
      .insert([{
        user_id: user.id,
        name: newPlaylistName,
        skills: [],
        skill_order: []
      }]);

    if (error) {
      toast.error("Erreur lors de la création de la playlist");
      return;
    }

    toast.success("Playlist créée avec succès");
    setNewPlaylistName("");
    setIsDialogOpen(false);
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Créer une playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une nouvelle playlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Nom de la playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <Button onClick={handleCreatePlaylist} className="w-full">
                  Créer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1E3D7B]/20 border-[#1E3D7B]/30 p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Mes playlists</h4>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nom de la playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <Button onClick={handleCreatePlaylist} className="w-full">
                Créer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {currentPlaylist.map((playlist: any) => (
            <div key={playlist.id} className="space-y-2">
              <h5 className="font-medium text-sm">{playlist.name}</h5>
              {playlist.skills?.length > 0 ? (
                <div className="space-y-2">
                  {playlist.skills.map((skill: any, index: number) => (
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
                          onClick={() => handleRemoveFromPlaylist(playlist.id, skill.id)}
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
              ) : (
                <p className="text-sm text-muted-foreground px-2">
                  Aucune compétence dans cette playlist
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};