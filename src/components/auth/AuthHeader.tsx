import { motion } from "framer-motion";

export const AuthHeader = () => {
  return (
    <motion.h1 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-semibold text-center mb-12"
    >
      <span className="welcome bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-500">
        Bienvenue sur{" "}
      </span>
      <motion.span 
        className="flap text-sky-400 font-bold"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        FLAP
      </motion.span>
    </motion.h1>
  );
};