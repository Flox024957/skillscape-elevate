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
import { YearlyCalendar } from "./notes/YearlyCalendar";
import { LearningSkillsSection } from "./notes/LearningSkillsSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface NotesTabProps {
  userId: string;
}

const NotesTab = ({ userId }: NotesTabProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [view, setView] = useState<"daily" | "yearly">("daily");
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

  const saveNote = async (noteContent?: string, noteTags?: string[]) => {
    const contentToSave = noteContent || note;
    const tagsToSave = noteTags || tags;

    if (!contentToSave.trim()) {
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
        content: contentToSave.trim(),
        created_at: noteDate.toISOString(),
        tags: tagsToSave.length > 0 ? tagsToSave : null,
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
      setTags([]);
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

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-4">
      <Tabs value={view} onValueChange={(v) => setView(v as "daily" | "yearly")}>
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="daily">Vue journalière</TabsTrigger>
          <TabsTrigger value="yearly">Vue annuelle</TabsTrigger>
        </TabsList>

        {view === "daily" ? (
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
            <div className="space-y-6">
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <LearningSkillsSection 
                  userId={userId}
                  selectedDate={selectedDate}
                  onAddNote={saveNote}
                />
              </motion.div>
            </div>
            
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
                  saveNote={() => saveNote()}
                  tags={tags}
                  setTags={setTags}
                />
                
                <NotesList 
                  notes={userNotes} 
                  deleteNote={deleteNote}
                  selectedTags={selectedTags}
                  onTagClick={handleTagClick}
                />
              </div>
            </motion.div>
          </div>
        ) : (
          <YearlyCalendar userId={userId} />
        )}
      </Tabs>
    </div>
  );
};

export default NotesTab;
