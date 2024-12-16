import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";

interface NoteInputProps {
  note: string;
  setNote: (note: string) => void;
  time: string;
  setTime: (time: string) => void;
  saveNote: () => void;
}

export const NoteInput = ({ note, setNote, time, setTime, saveNote }: NoteInputProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};