import { motion } from "framer-motion";

export const AuthHeader = () => {
  return (
    <motion.h1 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-semibold text-center mb-8 relative"
    >
      <motion.span 
        className="welcome inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary relative"
        animate={{
          textShadow: "0 0 20px rgba(139,92,246,0.3)"
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        Welcome to{" "}
      </motion.span>
      <motion.span 
        className="flap text-primary font-bold inline-block"
        initial={{ textShadow: "0 0 15px rgba(139,92,246,0.5)" }}
        whileHover={{ 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        animate={{
          textShadow: "0 0 25px rgba(139,92,246,0.4)"
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        FLAP
      </motion.span>
    </motion.h1>
  );
};