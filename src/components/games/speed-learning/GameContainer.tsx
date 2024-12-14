import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { GameQuestion } from "./GameQuestion";
import { GameScore } from "./GameScore";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

export const GameContainer = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "finished">("waiting");
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data, error } = await supabase
          .from("game_questions")
          .select("*")
          .limit(10);

        if (error) throw error;

        if (data) {
          const formattedQuestions = data.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correct_answer: q.correct_answer
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    };

    fetchQuestions();
  }, [toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStatus === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameStatus("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus, timeLeft]);

  const handleStartGame = () => {
    setGameStatus("playing");
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore((prev) => prev + Math.ceil(timeLeft * 10));
      toast({
        title: "Bonne réponse !",
        description: `+${Math.ceil(timeLeft * 10)} points`,
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setGameStatus("finished");
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-xl text-primary">
          Chargement des questions...
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      {gameStatus === "waiting" && (
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary">
            Prêt à relever le défi ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Répondez aux questions le plus rapidement possible pour gagner plus de points !
          </p>
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            Commencer le jeu
          </button>
        </motion.div>
      )}

      {gameStatus === "playing" && questions[currentQuestionIndex] && (
        <div className="space-y-8">
          <GameScore score={score} position={1} totalPlayers={1} />
          <GameQuestion
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        </div>
      )}

      {gameStatus === "finished" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary">
            Partie terminée !
          </h2>
          <p className="text-xl">
            Score final : {score} points
          </p>
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            Rejouer
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};