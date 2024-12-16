import { StickyNote, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MonthData } from "./types";

interface MonthCardProps {
  month: Date;
  data: MonthData;
  onClick: (date: Date) => void;
}

export const MonthCard = ({ month, data, onClick }: MonthCardProps) => {
  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  });

  const getDayContent = (day: Date) => {
    const hasNotes = data.notes.some(note => 
      isSameDay(new Date(note.created_at), day)
    );
    const hasEvents = data.events.some(event => 
      isSameDay(new Date(event.start_time), day)
    );

    return {
      hasContent: hasNotes || hasEvents,
      notes: data.notes.filter(note => 
        isSameDay(new Date(note.created_at), day)
      ),
      events: data.events.filter(event => 
        isSameDay(new Date(event.start_time), day)
      )
    };
  };

  return (
    <motion.div
      className="p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="text-base font-medium mb-3">
        {format(month, 'MMMM yyyy', { locale: fr })}
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div key={i} className="text-center text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const { hasContent, notes, events } = getDayContent(day);
          return (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    className={`aspect-square rounded-md p-1 text-xs relative
                      ${hasContent ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-accent/50'}
                    `}
                    onClick={() => onClick(day)}
                    whileHover={{ scale: 1.1 }}
                    animate={hasContent ? {
                      scale: [1, 1.05, 1],
                      transition: { 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    } : {}}
                  >
                    {format(day, 'd')}
                    {hasContent && (
                      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    {format(day, 'dd MMMM yyyy', { locale: fr })}
                    {notes.length > 0 && (
                      <div className="flex items-center gap-1 text-xs">
                        <StickyNote className="h-3 w-3" />
                        {notes.length} note{notes.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {events.length > 0 && (
                      <div className="flex items-center gap-1 text-xs">
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
      </div>
    </motion.div>
  );
};