import { motion, AnimatePresence } from "framer-motion";
import type { Bubble } from "@/types/bubble-pop";
import { cn } from "@/lib/utils";

interface GameAreaProps {
  bubbles: Bubble[];
  onBubblePop: (id: string) => void;
  isPlaying: boolean;
}

export const GameArea = ({ bubbles, onBubblePop, isPlaying }: GameAreaProps) => {
  if (!isPlaying) return null;

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl bg-gradient-to-br from-background/50 to-background/10 backdrop-blur-sm border border-white/10">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              y: [bubble.y, bubble.y - 100],
              transition: {
                y: {
                  duration: bubble.speed * 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 0.3,
                  ease: "backOut"
                }
              },
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "backIn"
              }
            }}
            onClick={() => onBubblePop(bubble.id)}
            style={{
              position: "absolute",
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
            }}
            className={cn(
              "rounded-full flex items-center justify-center p-4 text-xs md:text-sm font-medium text-white shadow-lg",
              "hover:scale-110 active:scale-95 transition-transform",
              "bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20",
              "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br",
              "before:from-white/40 before:to-transparent before:opacity-50 before:-z-10",
              "after:absolute after:w-4 after:h-4 after:rounded-full after:bg-white/40",
              "after:top-2 after:left-2 after:blur-sm"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-50" style={{ backgroundColor: bubble.color }} />
            <span className="relative z-10 text-center leading-tight">
              {bubble.skill[bubble.questionType]}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};