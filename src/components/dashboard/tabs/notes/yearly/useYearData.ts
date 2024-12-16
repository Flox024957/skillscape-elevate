import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfYear, endOfYear, startOfMonth, endOfMonth } from "date-fns";
import { YearData, MonthData } from "./types";

export const useYearData = (userId: string, selectedYear: number) => {
  return useQuery({
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
};

export const getMonthData = (yearData: YearData | undefined, month: Date): MonthData => {
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