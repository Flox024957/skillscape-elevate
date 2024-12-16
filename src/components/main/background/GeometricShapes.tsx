import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        initial={{ rotate: 0, scale: 0.8, opacity: 0.2 }}
        animate={{ rotate: 360, scale: 1.2, opacity: 0.4 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-neon-purple rotate-45 transform-gpu"
      />
      <motion.div 
        initial={{ rotate: 360, scale: 1.2, opacity: 0.4 }}
        animate={{ rotate: 0, scale: 0.8, opacity: 0.2 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 border-2 border-neon-blue rotate-45 transform-gpu"
      />
    </div>
  );
};