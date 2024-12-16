import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
  created_at: string;
}

interface NotesListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
}

export const NotesList = ({ notes, deleteNote }: NotesListProps) => {
  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {notes?.map((note) => (
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
  );
};