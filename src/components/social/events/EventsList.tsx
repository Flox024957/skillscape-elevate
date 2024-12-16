import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "./EventCard";
import { motion, AnimatePresence } from "framer-motion";

interface EventsListProps {
  userId: string;
}

export const EventsList = ({ userId }: EventsListProps) => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['user-events', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', userId)
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-accent/20 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!events?.length) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">Aucun événement à venir</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};