import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PlaylistCreator = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreatePlaylist = async () => {
    if (!name.trim()) {
      toast.error("Le nom de la playlist ne peut pas être vide");
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
        name: name.trim(),
        skills: [],
        skill_order: []
      }]);

    if (error) {
      toast.error("Erreur lors de la création de la playlist");
      return;
    }

    toast.success("Playlist créée avec succès");
    setOpen(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Nouvelle playlist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle playlist</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Nom de la playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleCreatePlaylist}>Créer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};