import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";

interface NotesTabProps {
  userId: string;
}

const NotesTab = ({ userId }: NotesTabProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: userNotes, refetch } = useQuery({
    queryKey: ['userNotes', selectedDate],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', format(selectedDate || new Date(), 'yyyy-MM-dd'))
        .lt('created_at', format(new Date(selectedDate?.getTime() || Date.now() + 86400000), 'yyyy-MM-dd'))
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Notes error:', error);
        return [];
      }
      
      return data;
    },
  });

  const saveNote = async () => {
    if (!note.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une note",
        variant: "destructive",
      });
      return;
    }

    const noteDate = selectedDate || new Date();
    const [hours, minutes] = time.split(':');
    noteDate.setHours(parseInt(hours), parseInt(minutes));

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: userId,
        content: note.trim(),
        created_at: noteDate.toISOString(),
      }]);

    if (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la note",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Note sauvegardée",
      });
      setNote("");
      refetch();
    }
  };

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from('user_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la note",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Note supprimée",
      });
      refetch();
    }
  };

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            {format(selectedDate || new Date(), "EEEE d MMMM yyyy", { locale: fr })}
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="time" className="text-sm font-medium mb-1 block">
                Heure
              </label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Écrivez une note..."
            className="min-h-[100px] resize-none"
          />
          
          <Button onClick={saveNote} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter au planning
          </Button>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {userNotes?.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 text-sm bg-muted/50 p-3 rounded-md group"
              >
                <div className="flex-1">
                  <div className="font-medium text-xs text-muted-foreground mb-1">
                    {format(new Date(note.created_at), "HH:mm")}
                  </div>
                  {note.content}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesTab;