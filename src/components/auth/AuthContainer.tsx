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
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),rgba(0,0,0,0))]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neon-frame bg-card/30 backdrop-blur-md p-8 rounded-xl relative"
        >
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-xl border border-primary/30 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30"
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