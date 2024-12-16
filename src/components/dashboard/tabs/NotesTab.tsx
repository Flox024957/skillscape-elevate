import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "./notes/Calendar";
import { NoteInput } from "./notes/NoteInput";
import { NotesList } from "./notes/NotesList";

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
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 space-y-4">
          <NoteInput
            note={note}
            setNote={setNote}
            time={time}
            setTime={setTime}
            saveNote={saveNote}
          />
          
          <NotesList notes={userNotes} deleteNote={deleteNote} />
        </div>
      </motion.div>
    </div>
  );
};

export default NotesTab;