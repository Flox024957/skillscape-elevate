import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface NotesTabProps {
  userId: string;
}

const NotesTab = ({ userId }: NotesTabProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: userNotes, refetch } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
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

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: userId,
        content: note.trim(),
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

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md w-full"
        />
      </motion.div>
      
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 space-y-4">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Écrivez une note..."
            className="min-h-[150px] resize-none"
          />
          <Button onClick={saveNote} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une note
          </Button>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {userNotes?.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm bg-muted/50 p-3 rounded-md"
              >
                {note.content}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesTab;