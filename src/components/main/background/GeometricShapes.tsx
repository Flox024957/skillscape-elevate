import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Rotating Hexagon */}
      <motion.div 
        initial={{ rotate: 0, scale: 0.8, opacity: 0.1 }}
        animate={{ 
          rotate: 360,
          scale: [0.8, 1, 0.8],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96"
        style={{
          background: 'linear-gradient(45deg, rgba(139,92,246,0.3), rgba(0,0,0,0))',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          transform: 'rotate(45deg)',
          filter: 'blur(2px)'
        }}
      />

      {/* Floating Triangles */}
      <motion.div 
        initial={{ rotate: 360, scale: 1.2, opacity: 0.15 }}
        animate={{ 
          rotate: 0,
          scale: [1.2, 1.4, 1.2],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80"
        style={{
          background: 'linear-gradient(-45deg, rgba(139,92,246,0.2), rgba(0,0,0,0))',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(3px)'
        }}
      />

      {/* Pulsing Circle */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0.1 }}
        animate={{ 
          scale: [0.9, 1.1, 0.9],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(4px)'
        }}
      />
    </div>
  );
};