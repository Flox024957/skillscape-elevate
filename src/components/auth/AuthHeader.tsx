import { motion } from "framer-motion";

export const AuthHeader = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 sm:mb-10"
    >
      <motion.h1 
        className="text-3xl sm:text-4xl font-semibold mb-3"
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
      <p className="text-sm sm:text-base text-muted-foreground">
        Connectez-vous pour accéder à votre espace
      </p>
    </motion.div>
  );
};