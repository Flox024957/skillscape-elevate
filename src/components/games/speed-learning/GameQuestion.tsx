import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GameQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  timeLeft: number;
}

export const GameQuestion = ({ question, options, onAnswer, timeLeft }: GameQuestionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">{question}</h2>
        <div className="text-xl font-semibold">
          Temps restant: {timeLeft}s
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              className="w-full p-6 text-lg hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => onAnswer(option)}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};