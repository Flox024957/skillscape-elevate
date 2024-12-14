import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Question } from "@/types/game";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  isDisabled: boolean;
}

export const QuestionCard = ({ question, onAnswer, isDisabled }: QuestionCardProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-medium">{question.question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="p-4 h-auto text-left hover:bg-primary/20"
            onClick={() => onAnswer(option)}
            disabled={isDisabled}
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};