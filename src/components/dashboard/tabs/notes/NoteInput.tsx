import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NoteInputProps {
  note: string;
  setNote: (note: string) => void;
  time: string;
  setTime: (time: string) => void;
  saveNote: () => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export const NoteInput = ({ 
  note, 
  setNote, 
  time, 
  setTime, 
  saveNote,
  tags,
  setTags 
}: NoteInputProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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

      <div className="space-y-2">
        <label className="text-sm font-medium mb-1 block">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 flex-1">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Ajouter un tag..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleAddTag}
            type="button"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Button onClick={saveNote} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter au planning
      </Button>
    </div>
  );
};