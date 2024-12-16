import { motion } from "framer-motion";

export const CosmicEffects = () => {
  return (
    <>
      {/* Enhanced Cosmic Wave Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0.2 }}
          animate={{ 
            scale: [1.2, 1.3, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] 
                    bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 
                    rounded-[100%] blur-3xl"
        />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.15 }}
          animate={{ 
            scale: [1.1, 1.2, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] 
                    bg-gradient-to-tl from-blue-500/20 via-purple-500/20 to-pink-500/20 
                    rounded-[100%] blur-3xl"
        />
      </div>

      {/* Enhanced Nebula Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] 
                    bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30 
                    rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.25 }}
          animate={{ 
            scale: [1.1, 1.3, 1.1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] 
                    bg-gradient-to-tl from-blue-600/30 via-purple-600/20 to-pink-600/30 
                    rounded-full blur-3xl"
        />
      </div>

      {/* Stellar Dust Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)] 
                  bg-[length:15px_15px] mix-blend-screen"
      />
    </>
  );
};