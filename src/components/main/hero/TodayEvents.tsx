import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

export const TodayEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', user.user.id)
        .gte('start_time', today.toISOString())
        .lt('start_time', tomorrow.toISOString())
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      setEvents(data || []);
    };

    fetchTodayEvents();
  }, []);

  return (
    <Card className="p-6 bg-[#0A1E3D]/80 backdrop-blur-xl border border-[#1E3D7B]/30
                   shadow-[0_0_15px_rgba(14,165,233,0.1)] hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]
                   transition-all duration-300">
      <div className="text-center mb-4">
        <h2 className="text-[#E5DEFF] text-xl font-light mb-1">
          {format(currentTime, 'HH:mm:ss')}
        </h2>
        <p className="text-[#8B9CC7] text-sm">
          {format(currentTime, 'EEEE d MMMM yyyy', { locale: fr })}
        </p>
      </div>

      <h3 className="text-xl font-bold text-[#E5DEFF] mb-4">Agenda du Jour</h3>
      
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E3D7B]/20 p-3 rounded-lg border border-[#1E3D7B]/30"
            >
              <p className="text-[#E5DEFF] font-medium">
                {event.title}
              </p>
              <p className="text-sm text-[#8B9CC7]">
                {format(new Date(event.start_time), 'HH:mm')} - 
                {format(new Date(event.end_time), 'HH:mm')}
              </p>
              {event.location && (
                <p className="text-xs text-[#8B9CC7]/80 italic mt-1">
                  📍 {event.location}
                </p>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-[#8B9CC7] text-sm">
            Aucun événement prévu pour aujourd'hui
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[#1E3D7B]/30">
        <p className="text-[#8B9CC7]/80 text-xs text-center">
          {events.length === 0 
            ? "Ajoutez des événements dans votre agenda" 
            : `${events.length} événement${events.length > 1 ? 's' : ''} aujourd'hui`}
        </p>
      </div>
    </Card>
  );
};