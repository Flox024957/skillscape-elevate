import { motion } from "framer-motion";

export const EnergyOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0.4 }}
        animate={{ scale: 1.2, opacity: 0.6 }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 
                 rounded-full blur-xl transform-gpu"
      />
      <motion.div 
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 0.8, opacity: 0.4 }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-purple-500/30 
                 rounded-full blur-xl transform-gpu"
      />
    </div>
  );
};