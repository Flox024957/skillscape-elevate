import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

export const TodayEvents = () => {
  const [events, setEvents] = useState<any[]>([]);

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
    <Card className="p-6 bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF]
                   border border-white/20 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-[#0A1E3D] mb-4">Agenda du Jour</h3>
      <div className="space-y-3 text-left">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="space-y-1">
              <p className="text-[#1E3D7B] font-medium">
                {event.title}
              </p>
              <p className="text-sm text-[#0A1E3D]/70">
                {format(new Date(event.start_time), 'HH:mm')} - 
                {format(new Date(event.end_time), 'HH:mm')}
              </p>
              {event.location && (
                <p className="text-xs text-[#0A1E3D]/60 italic">
                  📍 {event.location}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-[#0A1E3D]/70 text-sm">
            Aucun événement prévu pour aujourd'hui
          </p>
        )}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D3E4FD] to-transparent" />
        <p className="text-[#1E3D7B]/70 text-xs italic">
          {events.length === 0 ? "Ajoutez des événements dans votre agenda" : `${events.length} événement${events.length > 1 ? 's' : ''} aujourd'hui`}
        </p>
      </div>
    </Card>
  );
};