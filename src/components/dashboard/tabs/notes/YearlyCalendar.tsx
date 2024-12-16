import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfYear, endOfYear, eachMonthOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, StickyNote, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface YearlyCalendarProps {
  userId: string;
}

export const YearlyCalendar = ({ userId }: YearlyCalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);

  const { data: yearData } = useQuery({
    queryKey: ['yearlyData', selectedYear],
    queryFn: async () => {
      const startDate = startOfYear(new Date(selectedYear, 0));
      const endDate = endOfYear(new Date(selectedYear, 0));

      const [notesResponse, eventsResponse] = await Promise.all([
        supabase
          .from('user_notes')
          .select('*')
          .eq('user_id', userId)
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString()),
        supabase
          .from('user_events')
          .select('*')
          .eq('user_id', userId)
          .gte('start_time', startDate.toISOString())
          .lte('start_time', endDate.toISOString())
      ]);

      return {
        notes: notesResponse.data || [],
        events: eventsResponse.data || []
      };
    }
  });

  const months = eachMonthOfInterval({
    start: new Date(selectedYear, 0),
    end: new Date(selectedYear, 11)
  });

  const getMonthData = (month: Date) => {
    if (!yearData) return { notes: [], events: [] };
    
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    
    const notes = yearData.notes.filter(note => {
      const noteDate = new Date(note.created_at);
      return noteDate >= monthStart && noteDate <= monthEnd;
    });

    const events = yearData.events.filter(event => {
      const eventDate = new Date(event.start_time);
      return eventDate >= monthStart && eventDate <= monthEnd;
    });
    
    return { notes, events };
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Calendrier Annuel {selectedYear}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedYear(prev => prev - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedYear(new Date().getFullYear())}
          >
            Aujourd'hui
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedYear(prev => prev + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {months.map((month) => {
            const { notes, events } = getMonthData(month);
            const hasContent = notes.length > 0 || events.length > 0;

            return (
              <TooltipProvider key={month.toString()}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`p-4 rounded-lg border ${
                        hasContent 
                          ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' 
                          : 'border-border hover:bg-muted/50'
                      } transition-colors cursor-pointer`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMonth(month)}
                      layout
                    >
                      <div className="text-sm font-medium mb-2">
                        {format(month, 'MMMM', { locale: fr })}
                      </div>
                      <div className="flex gap-2">
                        {notes.length > 0 && (
                          <Badge variant="secondary" className="gap-1">
                            <StickyNote className="h-3 w-3" />
                            {notes.length}
                          </Badge>
                        )}
                        {events.length > 0 && (
                          <Badge variant="secondary" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            {events.length}
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      {notes.length > 0 && (
                        <div className="flex items-center gap-1">
                          <StickyNote className="h-3 w-3" />
                          {notes.length} note{notes.length > 1 ? 's' : ''}
                        </div>
                      )}
                      {events.length > 0 && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {events.length} événement{events.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedMonth} onOpenChange={() => setSelectedMonth(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMonth && format(selectedMonth, 'MMMM yyyy', { locale: fr })}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {selectedMonth && (
              <div className="space-y-6 p-4">
                {getMonthData(selectedMonth).notes.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <StickyNote className="h-4 w-4" />
                      Notes
                    </h3>
                    <div className="space-y-2">
                      {getMonthData(selectedMonth).notes.map((note) => (
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

                {getMonthData(selectedMonth).events.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Événements
                    </h3>
                    <div className="space-y-2">
                      {getMonthData(selectedMonth).events.map((event) => (
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
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};