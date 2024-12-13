import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const NotesTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const { data: userNotes, refetch } = useQuery({
    queryKey: ['userNotes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      // First, ensure the user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        return [];
      }

      // Now fetch the notes
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', profile.id)
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
        title: "Error",
        description: "Please enter a note",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add notes",
        variant: "destructive",
      });
      return;
    }

    // First, ensure the user has a profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      toast({
        title: "Error",
        description: "Could not verify user profile",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_notes')
      .insert([{
        user_id: profile.id,
        content: note.trim(),
      }]);

    if (error) {
      console.error('Error saving note:', error);
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
      refetch();
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
        <Button onClick={saveNote} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
        <div className="space-y-2">
          {userNotes?.map((note) => (
            <div key={note.id} className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
              {note.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesTab;