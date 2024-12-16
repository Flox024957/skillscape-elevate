import { motion } from "framer-motion";

export const CosmicEffects = () => {
  return (
    <>
      {/* Cosmic Wave Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full animate-cosmic-wave-1 opacity-20 
                      bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full animate-cosmic-wave-2 opacity-20 
                      bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </div>

      {/* Nebula Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 animate-nebula-pulse-1 
                      bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 animate-nebula-pulse-2 
                      bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl" />
      </div>
    </>
  );
};