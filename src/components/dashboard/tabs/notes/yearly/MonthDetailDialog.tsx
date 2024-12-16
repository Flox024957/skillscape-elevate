import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { StickyNote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MonthData } from "./types";

interface MonthDetailDialogProps {
  selectedMonth: Date | null;
  data: MonthData;
  onClose: () => void;
}

export const MonthDetailDialog = ({ selectedMonth, data, onClose }: MonthDetailDialogProps) => {
  if (!selectedMonth) return null;

  return (
    <Dialog open={!!selectedMonth} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {format(selectedMonth, 'MMMM yyyy', { locale: fr })}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-4">
            {data.notes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <StickyNote className="h-4 w-4" />
                  Notes
                </h3>
                <div className="space-y-2">
                  {data.notes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(note.created_at), 'dd MMMM à HH:mm', { locale: fr })}
                      </div>
                      <div className="mt-1">{note.content}</div>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {note.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {data.events.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Événements
                </h3>
                <div className="space-y-2">
                  {data.events.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {format(new Date(event.start_time), 'dd MMMM à HH:mm', { locale: fr })}
                      </div>
                      {event.location && (
                        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                      {event.description && (
                        <div className="mt-2 text-sm">{event.description}</div>
                      )}
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