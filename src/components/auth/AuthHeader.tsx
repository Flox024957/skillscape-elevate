import { motion } from "framer-motion";

export const AuthHeader = () => {
  return (
    <motion.h1 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-semibold text-center mb-12"
    >
      <span className="welcome bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-500">
        Welcome to{" "}
      </span>
      <motion.span 
        className="flap text-violet-400 font-bold"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        FLAP
      </motion.span>
    </motion.h1>
  );
};