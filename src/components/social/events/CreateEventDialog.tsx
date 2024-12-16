import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin } from "lucide-react";

interface CreateEventDialogProps {
  userId: string;
}

export const CreateEventDialog = ({ userId }: CreateEventDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    try {
      const { error } = await supabase
        .from('user_events')
        .insert([
          {
            user_id: userId,
            title,
            description,
            location,
            start_time: startTime,
            end_time: endTime,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Événement créé",
        description: "Votre événement a été créé avec succès",
      });

      queryClient.invalidateQueries({ queryKey: ['user-events'] });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'événement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Créer un événement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un événement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="title"
              name="title"
              placeholder="Titre de l'événement"
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              id="description"
              name="description"
              placeholder="Description de l'événement"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <Input
                id="location"
                name="location"
                placeholder="Lieu"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer l'événement"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};