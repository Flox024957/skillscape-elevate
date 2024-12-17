import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
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
  const [notes, setNotes] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTodayNotes = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString())
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching notes:', error);
        return;
      }

      setNotes(data || []);
    };

    fetchTodayNotes();
    const interval = setInterval(fetchTodayNotes, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={cn(
      "bg-[#0A1E3D]/80 backdrop-blur-xl border border-[#1E3D7B]/30",
      "shadow-[0_0_15px_rgba(14,165,233,0.1)]",
      "hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]",
      "transition-all duration-500 transform hover:scale-[1.02]",
      isMobile ? "p-4" : "p-6"
    )}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <div className="flex flex-col items-center">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-[#E5DEFF] text-xl font-light mb-1"
          >
            {format(currentTime, 'HH:mm')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8B9CC7] text-sm mb-2"
          >
            {format(currentTime, 'EEEE d MMMM yyyy', { locale: fr })}
          </motion.p>
          <CollapsibleTrigger className="w-full">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between px-4 py-2 rounded-lg bg-[#1E3D7B]/20 hover:bg-[#1E3D7B]/30 transition-colors"
            >
              <span className="text-[#E5DEFF] font-medium">
                {notes.length === 0 ? "Aucune note aujourd'hui" : `${notes.length} note${notes.length > 1 ? 's' : ''}`}
              </span>
              <ChevronDown className={cn(
                "h-4 w-4 text-[#8B9CC7] transition-transform duration-300",
                isOpen && "transform rotate-180"
              )} />
            </motion.div>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ScrollArea className={cn(
            "rounded-lg",
            notes.length > 0 ? "h-[200px]" : "h-auto"
          )}>
            <AnimatePresence>
              <div className="space-y-3 pt-2">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "bg-[#1E3D7B]/20 p-3 rounded-lg border border-[#1E3D7B]/30",
                      "transform hover:scale-[1.02] hover:bg-[#1E3D7B]/30",
                      "transition-all duration-300"
                    )}
                  >
                    <p className="text-[#E5DEFF] font-medium">
                      {note.content}
                    </p>
                    <p className="text-sm text-[#8B9CC7]">
                      {format(new Date(note.created_at), 'HH:mm')}
                    </p>
                    {note.tags && note.tags.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-1 mt-1"
                      >
                        {note.tags.map((tag: string, index: number) => (
                          <span 
                            key={index}
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              "bg-[#1E3D7B]/30 text-[#8B9CC7]",
                              "hover:bg-[#1E3D7B]/50 transition-colors duration-300"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};