import { motion } from "framer-motion";

export const GridOverlay = () => {
  return (
    <>
      {/* Enhanced Star Field Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_1px)] 
                  bg-[length:20px_20px] mix-blend-screen"
      />

      {/* Enhanced Grid Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px),
            linear-gradient(0deg, rgba(139,92,246,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      {/* Glowing Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-[1px] h-[100px] bg-gradient-to-b from-transparent via-primary to-transparent 
                    absolute left-1/4 transform -skew-x-12 blur-sm"
        />
        <motion.div 
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="w-[1px] h-[150px] bg-gradient-to-b from-transparent via-primary to-transparent 
                    absolute left-2/3 transform -skew-x-12 blur-sm"
        />
      </div>
    </>
  );
};