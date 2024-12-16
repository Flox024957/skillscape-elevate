import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfYear, endOfYear, eachMonthOfInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { CalendarCheck, StickyNote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface YearlyCalendarProps {
  userId: string;
}

export const YearlyCalendar = ({ userId }: YearlyCalendarProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
    if (!yearData) return { notes: 0, events: 0 };
    
    const monthStr = format(month, 'yyyy-MM');
    const notes = yearData.notes.filter(note => 
      note.created_at.startsWith(monthStr)
    ).length;
    const events = yearData.events.filter(event => 
      event.start_time.startsWith(monthStr)
    ).length;
    
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
            size="sm"
            onClick={() => setSelectedYear(prev => prev - 1)}
          >
            {selectedYear - 1}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedYear(prev => prev + 1)}
          >
            {selectedYear + 1}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {months.map((month) => {
          const { notes, events } = getMonthData(month);
          const hasContent = notes > 0 || events > 0;

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
                  >
                    <div className="text-sm font-medium mb-2">
                      {format(month, 'MMMM', { locale: fr })}
                    </div>
                    <div className="flex gap-2">
                      {notes > 0 && (
                        <Badge variant="secondary" className="gap-1">
                          <StickyNote className="h-3 w-3" />
                          {notes}
                        </Badge>
                      )}
                      {events > 0 && (
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          {events}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    {notes > 0 && (
                      <div className="flex items-center gap-1">
                        <StickyNote className="h-3 w-3" />
                        {notes} note{notes > 1 ? 's' : ''}
                      </div>
                    )}
                    {events > 0 && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {events} événement{events > 1 ? 's' : ''}
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