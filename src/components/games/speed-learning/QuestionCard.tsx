import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <div className="space-y-4">
        <Badge variant="secondary" className="mb-2">
          {question.category}
        </Badge>
        <h3 className="text-xl font-medium">{question.question}</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="p-4 h-auto text-left hover:bg-primary/20 whitespace-normal"
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