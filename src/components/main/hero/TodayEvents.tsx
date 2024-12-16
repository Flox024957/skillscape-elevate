import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const TodayEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

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
    <Card className={cn(
      "bg-[#0A1E3D]/80 backdrop-blur-xl border border-[#1E3D7B]/30",
      "shadow-[0_0_15px_rgba(14,165,233,0.1)]",
      "hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]",
      "transition-all duration-300",
      isMobile ? "p-4" : "p-6"
    )}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-[#E5DEFF] text-xl font-light mb-1">
            {format(currentTime, 'HH:mm:ss')}
          </h2>
          <p className="text-[#8B9CC7] text-sm mb-2">
            {format(currentTime, 'EEEE d MMMM yyyy', { locale: fr })}
          </p>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#1E3D7B]/20 hover:bg-[#1E3D7B]/30 transition-colors">
              <span className="text-[#E5DEFF] font-medium">
                {events.length === 0 ? "Aucun événement aujourd'hui" : `${events.length} événement${events.length > 1 ? 's' : ''}`}
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 text-[#8B9CC7] transition-transform duration-200",
                isOpen && "transform rotate-180"
              )} />
            </div>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ScrollArea className={cn(
            "rounded-lg",
            events.length > 0 ? "h-[200px]" : "h-auto"
          )}>
            <div className="space-y-3 pt-2">
              {events.map((event) => (
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
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};