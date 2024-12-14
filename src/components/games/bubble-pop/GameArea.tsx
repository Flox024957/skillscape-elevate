import { motion, AnimatePresence } from "framer-motion";
import type { Bubble } from "@/types/bubble-pop";

interface GameAreaProps {
  bubbles: Bubble[];
  onBubblePop: (id: string) => void;
  isPlaying: boolean;
}

export const GameArea = ({ bubbles, onBubblePop, isPlaying }: GameAreaProps) => {
  if (!isPlaying) return null;

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm">
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
              },
            }}
            exit={{ scale: 0 }}
            onClick={() => onBubblePop(bubble.id)}
            style={{
              position: "absolute",
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
            }}
            className="rounded-full flex items-center justify-center p-4 text-xs font-medium text-white shadow-lg hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {bubble.skill[bubble.questionType]}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};