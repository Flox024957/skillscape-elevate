import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NotesTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const { data: userNotes } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
  });

  const saveNote = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !note) return;

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: user.id,
        content: note,
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Could not save note",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Note saved successfully",
      });
      setNote("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card p-4 rounded-lg border border-border">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md"
        />
      </div>
      <div className="bg-card p-4 rounded-lg border border-border space-y-4">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="min-h-[200px]"
        />
        <Button onClick={saveNote}>Save Note</Button>
        <div className="space-y-2">
          {userNotes?.map((note) => (
            <div key={note.id} className="text-sm text-muted-foreground">
              {note.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesTab;