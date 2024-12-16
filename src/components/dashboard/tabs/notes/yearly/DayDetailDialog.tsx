import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Clock, MapPin, StickyNote, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MonthData } from "./types";

interface DayDetailDialogProps {
  selectedDate: Date | null;
  data: MonthData;
  onClose: () => void;
}

export const DayDetailDialog = ({ selectedDate, data, onClose }: DayDetailDialogProps) => {
  if (!selectedDate) return null;

  const dayEvents = data.events.filter(event => 
    format(new Date(event.start_time), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  ).sort((a, b) => 
    new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );

  const dayNotes = data.notes.filter(note => 
    format(new Date(note.created_at), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  ).sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <Dialog open={!!selectedDate} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}</span>
            <button 
              onClick={onClose}
              className="rounded-full p-1 hover:bg-accent/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-1">
          <div className="space-y-6 py-4">
            {/* Timeline */}
            <div className="relative">
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="flex items-start mb-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </div>
                  <div className="flex-1 min-h-[40px] border-l pl-4 ml-2">
                    {dayEvents
                      .filter(event => new Date(event.start_time).getHours() === hour)
                      .map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mb-2 p-2 rounded-md bg-primary/5 border border-primary/20"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{event.title}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                          {event.description && (
                            <p className="text-sm mt-1">{event.description}</p>
                          )}
                        </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes of the day */}
            {dayNotes.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Notes du jour
                </h3>
                <div className="space-y-2">
                  {dayNotes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(note.created_at), 'HH:mm', { locale: fr })}
                      </div>
                      <div className="mt-1">{note.content}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};