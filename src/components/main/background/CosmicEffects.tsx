import { motion } from "framer-motion";

export const CosmicEffects = () => {
  return (
    <>
      {/* Enhanced Cosmic Wave Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0.1 }}
          animate={{ 
            scale: [1.2, 1.3, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] 
                    bg-gradient-to-br from-[#0EA5E9]/10 via-[#33C3F0]/10 to-[#1EAEDB]/10 
                    rounded-[100%] blur-3xl"
        />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.08 }}
          animate={{ 
            scale: [1.1, 1.2, 1.1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] 
                    bg-gradient-to-tl from-[#1EAEDB]/10 via-[#0EA5E9]/10 to-[#33C3F0]/10 
                    rounded-[100%] blur-3xl"
        />
      </div>

      {/* Subtle Nebula Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          initial={{ scale: 1, opacity: 0.15 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] 
                    bg-gradient-to-br from-[#0EA5E9]/20 via-[#33C3F0]/10 to-[#1EAEDB]/20 
                    rounded-full blur-3xl"
        />
      </div>

      {/* Stellar Dust Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] 
                  bg-[length:15px_15px] mix-blend-screen"
      />
    </>
  );
};