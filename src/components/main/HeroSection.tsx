import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: todayNotes } = useQuery({
    queryKey: ['todayNotes'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .gte('created_at', today.toISOString())
        .lt('created_at', new Date(today.getTime() + 24*60*60*1000).toISOString())
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl p-12 mb-16
                    border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500
                    group flex flex-col items-center justify-center text-center">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-12 relative z-10 max-w-3xl mx-auto"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400
                       tracking-tight leading-none">
            FLAP, suivez l'énergie là où elle est...
          </h1>
        </div>

        {/* Time Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Clock className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 font-mono">
              {format(currentTime, 'HH:mm:ss')}
            </h2>
            <p className="text-purple-300 text-sm">
              {format(currentTime, 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 rounded-lg
                     transition-all duration-300 transform hover:-translate-y-1
                     hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] text-lg"
          >
            Accéder au tableau de bord
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Today's Notes Preview */}
      {todayNotes && todayNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 p-4 bg-white/5 rounded-xl border border-purple-500/20 w-full max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Notes du jour</h3>
          </div>
          <div className="space-y-2">
            {todayNotes.map((note: any) => (
              <div key={note.id} className="p-3 bg-black/20 rounded-lg">
                <p className="text-gray-300">{note.content}</p>
                <p className="text-sm text-purple-400 mt-1">
                  {format(new Date(note.created_at), 'HH:mm')}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeroSection;