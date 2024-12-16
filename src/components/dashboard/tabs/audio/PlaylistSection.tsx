import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Play, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const PlaylistSection = ({ onContentSelect }: { onContentSelect: (content: string) => void }) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: playlists } = useQuery({
    queryKey: ['skill_playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createPlaylistMutation = useMutation({
    mutationFn: async (name: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { data, error } = await supabase
        .from('skill_playlists')
        .insert([{ name, user_id: user.id }]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill_playlists'] });
      setNewPlaylistName("");
      toast({
        title: "Playlist créée",
        description: "Votre playlist a été créée avec succès",
      });
    },
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: async (playlistId: string) => {
      const { error } = await supabase
        .from('skill_playlists')
        .delete()
        .eq('id', playlistId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill_playlists'] });
      toast({
        title: "Playlist supprimée",
        description: "La playlist a été supprimée avec succès",
      });
    },
  });

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez entrer un nom pour la playlist",
        variant: "destructive",
      });
      return;
    }
    createPlaylistMutation.mutate(newPlaylistName);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes Playlists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Nom de la playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <Button onClick={handleCreatePlaylist} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {playlists?.map((playlist) => (
            <div key={playlist.id} className="flex items-center justify-between p-2 bg-card rounded-lg border">
              <span>{playlist.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (playlist.skills && playlist.skills.length > 0) {
                      // TODO: Implement playlist playback
                      toast({
                        title: "Lecture de la playlist",
                        description: "Cette fonctionnalité sera bientôt disponible",
                      });
                    } else {
                      toast({
                        title: "Playlist vide",
                        description: "Ajoutez des compétences à cette playlist",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deletePlaylistMutation.mutate(playlist.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};