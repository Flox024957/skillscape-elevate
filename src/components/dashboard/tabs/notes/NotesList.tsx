import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Tag } from "lucide-react";

interface Note {
  id: string;
  content: string;
  created_at: string;
  tags?: string[];
}

interface NotesListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const NotesList = ({ notes, deleteNote, selectedTags, onTagClick }: NotesListProps) => {
  const filteredNotes = selectedTags.length > 0
    ? notes?.filter(note => note.tags?.some(tag => selectedTags.includes(tag)))
    : notes;

  return (
    <div className="space-y-4">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-md">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {selectedTags.map(tag => (
            <Badge 
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-primary/20"
              onClick={() => onTagClick(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
      )}
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {filteredNotes?.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 text-sm bg-muted/50 p-3 rounded-md group"
          >
            <div className="flex-1 space-y-2">
              <div className="font-medium text-xs text-muted-foreground">
                {format(new Date(note.created_at), "HH:mm")}
              </div>
              <div>{note.content}</div>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {note.tags.map(tag => (
                    <Badge 
                      key={tag}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/20"
                      onClick={() => onTagClick(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
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
  );
};