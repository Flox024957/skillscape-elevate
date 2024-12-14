import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { FlashCard as FlashCardType } from "@/types/flash-cards";

interface FlashCardProps {
  card: FlashCardType;
  onAnswer: (answer: string) => void;
  isDisabled: boolean;
}

export const FlashCard = ({ card, onAnswer, isDisabled }: FlashCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-card rounded-xl p-8 shadow-lg space-y-6"
    >
      <div className="space-y-4">
        <span className="text-sm font-medium text-primary/80">
          {card.category}
        </span>
        <h3 className="text-2xl font-bold">{card.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {card.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isDisabled}
            variant="outline"
            className="p-4 h-auto text-left whitespace-normal hover:bg-primary/20"
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};