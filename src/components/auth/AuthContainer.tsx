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
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.05),rgba(0,0,0,0))]" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_70%)]"
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card/20 backdrop-blur-md p-6 sm:p-8 rounded-xl relative"
        >
          <div className="absolute inset-0 rounded-xl border border-primary/20 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-20"
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};