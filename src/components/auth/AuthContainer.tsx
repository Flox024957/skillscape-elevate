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
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-[min(400px,90vw)] mx-auto">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card/40 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-violet-500/20 shadow-2xl shadow-violet-500/10"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};