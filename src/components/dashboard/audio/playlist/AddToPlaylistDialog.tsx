import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AddToPlaylistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (playlistId: string) => Promise<void>;
  title: string;
}

export const AddToPlaylistDialog = ({ isOpen, onClose, onAdd, title }: AddToPlaylistDialogProps) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");

  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('skill_playlists')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching playlists:', error);
        return [];
      }
      return data || [];
    },
  });

  const handleAdd = async () => {
    if (!selectedPlaylist) {
      toast.error("Veuillez sélectionner une playlist");
      return;
    }

    try {
      await onAdd(selectedPlaylist);
      toast.success("Ajouté à la playlist");
      onClose();
    } catch (error) {
      toast.error("Erreur lors de l'ajout à la playlist");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter à une playlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Élément à ajouter :</h4>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Choisir une playlist :</h4>
            <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une playlist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Lecture en cours</SelectItem>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleAdd}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md"
          >
            Ajouter
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};