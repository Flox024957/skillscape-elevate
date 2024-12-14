import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Timer, Brain, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: number;
}

export default function SpeedLearningPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const navigate = useNavigate();
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
        setQuestions(data);
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
        variant: "success",
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Speed Learning Battle</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/challenges")}
              className="gap-2"
            >
              Retour
            </Button>
          </div>

          <div className="glass-panel p-8 space-y-6">
            {!gameStarted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <h2 className="text-2xl font-semibold">
                  Prêt à tester vos connaissances ?
                </h2>
                <p className="text-muted-foreground">
                  Répondez à un maximum de questions en 30 secondes !
                </p>
                <Button
                  size="lg"
                  onClick={handleStartGame}
                  className="gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Commencer le défi
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="text-xl font-semibold">
                      Score: {score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    <span className="text-xl font-semibold">
                      {timeLeft}s
                    </span>
                  </div>
                </div>

                {gameOver ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <h2 className="text-2xl font-semibold">Partie terminée !</h2>
                    <p className="text-xl">Score final : {score} points</p>
                    <Button
                      size="lg"
                      onClick={handleStartGame}
                      className="gap-2"
                    >
                      <Trophy className="w-5 h-5" />
                      Rejouer
                    </Button>
                  </motion.div>
                ) : currentQuestion ? (
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-medium">
                      {currentQuestion.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="p-4 h-auto text-left hover:bg-primary/20"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}