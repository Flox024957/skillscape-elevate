import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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
  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);
  const [skillDetails, setSkillDetails] = useState<Record<string, any>>({});

  const toggleNoteExpansion = (noteId: string) => {
    setExpandedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  // Fetch skill details when a note with skill tag is expanded
  const fetchSkillDetails = async (skillId: string) => {
    if (skillDetails[skillId]) return;

    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('id', skillId)
      .single();

    if (error) {
      console.error('Error fetching skill:', error);
      return;
    }

    setSkillDetails(prev => ({
      ...prev,
      [skillId]: data
    }));
  };

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
        {filteredNotes?.map((note) => {
          const isSkillNote = note.tags?.includes('skill');
          const skillId = isSkillNote ? note.tags?.find(tag => tag !== 'skill') : null;
          const isExpanded = expandedNotes.includes(note.id);

          if (isExpanded && skillId && !skillDetails[skillId]) {
            fetchSkillDetails(skillId);
          }

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-col gap-3 text-sm bg-muted/50 p-3 rounded-md group",
                isExpanded && "bg-muted"
              )}
            >
              <div className="flex items-start gap-3">
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
                <div className="flex gap-2">
                  {isSkillNote && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleNoteExpansion(note.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Skill Details Section */}
              {isExpanded && isSkillNote && skillId && skillDetails[skillId] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-border/50 space-y-3"
                >
                  {skillDetails[skillId].resume && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Résumé</div>
                      <div className="text-sm">{skillDetails[skillId].resume}</div>
                    </div>
                  )}
                  {skillDetails[skillId].description && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Description</div>
                      <div className="text-sm">{skillDetails[skillId].description}</div>
                    </div>
                  )}
                  {skillDetails[skillId].action_concrete && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Action Concrète</div>
                      <div className="text-sm">{skillDetails[skillId].action_concrete}</div>
                    </div>
                  )}
                  {skillDetails[skillId].exemples && skillDetails[skillId].exemples.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Exemples</div>
                      <ul className="list-disc list-inside text-sm">
                        {skillDetails[skillId].exemples.map((exemple: string, index: number) => (
                          <li key={index}>{exemple}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};