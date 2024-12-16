import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: todayNotes } = useQuery({
    queryKey: ['todayNotes'],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return [];

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', session.session.user.id)
        .gte('created_at', format(today, 'yyyy-MM-dd'))
        .lt('created_at', format(tomorrow, 'yyyy-MM-dd'))
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Notes error:', error);
        return [];
      }
      
      return data;
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
      className="text-center mb-20"
    >
      <motion.div 
        className="mb-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl font-bold text-primary">
          {format(currentTime, "HH:mm:ss")}
        </h2>
        <p className="text-2xl text-muted-foreground">
          {format(currentTime, "EEEE d MMMM yyyy", { locale: fr })}
        </p>
      </motion.div>

      {todayNotes && todayNotes.length > 0 ? (
        <motion.div 
          className="max-w-2xl mx-auto space-y-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Planning du jour</h3>
          <div className="grid gap-3">
            {todayNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 flex items-start gap-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">
                    {format(new Date(note.created_at), "HH:mm")}
                  </span>
                </div>
                <p className="flex-1 text-left">{note.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          Aucune tâche planifiée pour aujourd'hui
        </motion.p>
      )}

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Button
          onClick={() => navigate("/auth")}
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#9b87f5] hover:from-[#7c4ef3] hover:to-[#8b76f3]
                   shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)]
                   transform hover:-translate-y-1 transition-all duration-300
                   border border-[#8B5CF6]/50"
        >
          Commencer Gratuitement
        </Button>
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="w-full sm:w-auto px-8 py-6 text-lg rounded-xl
                   bg-background/30 backdrop-blur-sm
                   border border-[#8B5CF6]/50 hover:border-[#8B5CF6]
                   shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)]
                   transform hover:-translate-y-1 transition-all duration-300"
        >
          Accéder au Dashboard
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroSection;