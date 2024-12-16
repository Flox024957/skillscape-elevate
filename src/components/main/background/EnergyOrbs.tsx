import { motion } from "framer-motion";

export const EnergyOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary Energy Orb */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0.2, x: 0, y: 0 }}
        animate={{ 
          scale: [0.8, 1.1, 0.8],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 30, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-1/3 w-64 h-64"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(20px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Secondary Energy Orb */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0.15, x: 0, y: 0 }}
        animate={{ 
          scale: [1.2, 0.9, 1.2],
          opacity: [0.15, 0.25, 0.15],
          x: [0, -20, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/3 right-1/3 w-72 h-72"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(25px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Floating Light Particles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.05) 0%, rgba(0,0,0,0) 50%)',
          filter: 'blur(10px)',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};