import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PlaylistHeaderProps {
  onCreatePlaylist: (name: string) => void;
}

export const PlaylistHeader = ({ onCreatePlaylist }: PlaylistHeaderProps) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName);
      setNewPlaylistName("");
      setIsDialogOpen(false);
    }
  };

  return (
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
  );
};