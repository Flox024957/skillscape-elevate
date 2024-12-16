import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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
          <Card className="p-6 bg-gradient-to-r from-[#0A1E3D] to-[#1E3D7B] 
                         shadow-[0_0_30px_rgba(14,165,233,0.5)]
                         border border-[#0EA5E9]/50">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-[#0EA5E9]/30" />
              {/* Aiguilles de l'horloge */}
              <div 
                className="absolute w-1 h-16 bg-[#0EA5E9] top-[8px] left-[calc(50%-1px)]"
                style={{ 
                  transform: `rotate(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
              <div 
                className="absolute w-0.5 h-20 bg-white top-[4px] left-[calc(50%-0.5px)]"
                style={{ 
                  transform: `rotate(${time.getMinutes() * 6}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
              <div 
                className="absolute w-0.5 h-24 bg-red-500 top-0 left-[calc(50%-0.5px)]"
                style={{ 
                  transform: `rotate(${time.getSeconds() * 6}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
            </div>
            <div className="text-white space-y-2">
              <p className="text-2xl font-bold">
                {time.toLocaleTimeString()}
              </p>
              <p className="text-lg opacity-80" style={{ fontFamily: 'Old Standard TT, serif' }}>
                {time.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
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
          <Card className="p-6 bg-background/30 backdrop-blur-sm
                         border border-[#0EA5E9]/50 hover:border-[#0EA5E9]
                         shadow-[0_0_25px_rgba(14,165,233,0.4)]">
            <h3 className="text-xl font-bold text-white mb-4">Agenda du Jour</h3>
            <div className="space-y-3 text-left">
              <p className="text-gray-300 text-sm">
                Aucun événement prévu pour aujourd'hui
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent" />
              <p className="text-[#0EA5E9]/70 text-xs italic">
                Connectez-vous pour voir votre agenda
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;