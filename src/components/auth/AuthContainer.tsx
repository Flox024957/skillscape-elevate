import { motion } from "framer-motion";

interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="w-full max-w-lg">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neon-frame bg-card/30 backdrop-blur-md p-6 sm:p-8 rounded-xl"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};