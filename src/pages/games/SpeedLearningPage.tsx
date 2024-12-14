import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/types/game";
import { GameHeader } from "@/components/games/speed-learning/GameHeader";
import { GameStats } from "@/components/games/speed-learning/GameStats";
import { QuestionCard } from "@/components/games/speed-learning/QuestionCard";
import { GameOver } from "@/components/games/speed-learning/GameOver";
import { StartScreen } from "@/components/games/speed-learning/StartScreen";

export default function SpeedLearningPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('game_questions')
        .select('*')
        .limit(10);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const formattedQuestions = data.map(q => ({
          ...q,
          options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as string)
        }));
        setQuestions(formattedQuestions);
      }
    };

    fetchQuestions();
  }, [toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameOver, timeLeft]);

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameOver(false);
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (gameOver) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore((prev) => prev + 10);
      toast({
        title: "Bonne réponse !",
        description: "+10 points",
        variant: "default",
      });
    } else {
      toast({
        title: "Mauvaise réponse",
        description: "La bonne réponse était : " + currentQuestion.correct_answer,
        variant: "destructive",
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <GameHeader />

          <div className="glass-panel p-8 space-y-6">
            {!gameStarted ? (
              <StartScreen onStart={handleStartGame} />
            ) : (
              <div className="space-y-6">
                <GameStats score={score} timeLeft={timeLeft} />

                {gameOver ? (
                  <GameOver score={score} onRestart={handleStartGame} />
                ) : currentQuestion ? (
                  <QuestionCard
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isDisabled={gameOver}
                  />
                ) : null}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}