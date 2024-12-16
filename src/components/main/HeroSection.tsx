import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const HeroSection = () => {
  const [time, setTime] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const frameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="text-center mb-20 perspective-1000"
    >
      <motion.h1 
        variants={textVariants}
        className="text-6xl md:text-8xl font-bold mb-6 text-white
                 drop-shadow-[0_0_30px_rgba(14,165,233,0.5)]
                 transform hover:scale-105 transition-transform duration-300 cursor-default
                 text-shadow-neon"
      >
        FLAP
      </motion.h1>

      <motion.p 
        variants={textVariants}
        className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text
                 bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B]
                 drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]
                 futuristic-text"
      >
        Élevez Votre Potentiel
      </motion.p>

      <motion.p 
        variants={textVariants}
        className="text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-8 leading-relaxed
                 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]"
      >
        Développez vos compétences, fixez des objectifs ambitieux et suivez votre progression 
        vers l'excellence
      </motion.p>

      <motion.div 
        variants={textVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        {/* Horloge et Date */}
        <motion.div
          variants={frameVariants}
          whileHover="hover"
          className="w-full sm:w-[300px]"
        >
          <Card className="p-6 bg-gradient-to-br from-[#F1F0FB] to-[#E5DEFF] 
                         shadow-lg border border-white/20 backdrop-blur-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-[#D3E4FD]" />
              {/* Aiguilles de l'horloge */}
              <div 
                className="absolute w-1 h-16 bg-[#1E3D7B]/70 top-[8px] left-[calc(50%-0.5px)]
                         rounded-full"
                style={{ 
                  transform: `rotate(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
              <div 
                className="absolute w-0.5 h-20 bg-[#0A1E3D]/80 top-[4px] left-[calc(50%-0.25px)]
                         rounded-full"
                style={{ 
                  transform: `rotate(${time.getMinutes() * 6}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
              <div 
                className="absolute w-0.5 h-24 bg-[#FEC6A1] top-0 left-[calc(50%-0.25px)]
                         rounded-full"
                style={{ 
                  transform: `rotate(${time.getSeconds() * 6}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
              {/* Points des heures */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#1E3D7B]/50 rounded-full"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-36px)`,
                    transformOrigin: 'center center'
                  }}
                />
              ))}
            </div>
            <div className="text-[#0A1E3D] space-y-2">
              <p className="text-2xl font-light">
                {format(time, 'HH:mm:ss')}
              </p>
              <p className="text-lg opacity-80 font-serif italic">
                {format(time, 'EEEE d MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Agenda du jour */}
        <motion.div
          variants={frameVariants}
          whileHover="hover"
          className="w-full sm:w-[300px]"
        >
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;