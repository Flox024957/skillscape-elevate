import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types/game";

interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answer: string) => void;
  timeLeft: number;
}

export const QuestionDisplay = ({ question, onAnswer, timeLeft }: QuestionDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-muted-foreground">
          Temps restant: {timeLeft}s
        </div>
        <div className="text-sm font-medium text-primary">
          Difficulté: {question.difficulty}
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-4 text-left justify-start hover:bg-primary/10"
              onClick={() => onAnswer(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};