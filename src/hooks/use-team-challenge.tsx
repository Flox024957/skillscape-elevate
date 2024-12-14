import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/types/game";

export type GameStatus = "waiting" | "playing" | "finished";

interface TeamChallengeState {
  status: GameStatus;
  currentTeam: number;
  scores: Record<number, number>;
  currentQuestionIndex: number;
  timeLeft: number;
}

const QUESTION_TIME = 60; // Augmenté pour donner plus de temps pour lire
const TOTAL_QUESTIONS = 10;

export const useTeamChallenge = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<TeamChallengeState>({
    status: "waiting",
    currentTeam: 1,
    scores: { 1: 0, 2: 0 },
    currentQuestionIndex: 0,
    timeLeft: QUESTION_TIME,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("game_questions")
        .select("*")
        .eq("category", "team_challenge")
        .order("difficulty", { ascending: true })
        .limit(TOTAL_QUESTIONS);

      if (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const transformedQuestions = data.map(q => ({
          ...q,
          options: q.options as string[]
        }));
        setQuestions(transformedQuestions);
      }
      setIsLoading(false);
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (gameState.status !== "playing") return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 0) {
          return handleNextTurn(prev, false);
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.status]);

  const handleNextTurn = (currentState: TeamChallengeState, wasCorrect: boolean) => {
    const newScores = { ...currentState.scores };
    if (wasCorrect && currentState.status === "playing") {
      const currentQuestion = questions[currentState.currentQuestionIndex];
      const basePoints = currentState.timeLeft * currentQuestion.difficulty;
      newScores[currentState.currentTeam] += basePoints;
    }

    const nextQuestionIndex = currentState.currentQuestionIndex + 1;
    
    if (nextQuestionIndex >= questions.length) {
      // Sauvegarder le score dans les leaderboards
      const winningTeam = Object.entries(newScores).reduce((a, b) => 
        newScores[Number(a)] > newScores[Number(b)] ? a : b
      );
      
      return {
        ...currentState,
        status: "finished" as const,
        scores: newScores,
      };
    }

    const nextTeam = currentState.currentTeam === 1 ? 2 : 1;

    return {
      ...currentState,
      currentTeam: nextTeam,
      scores: newScores,
      currentQuestionIndex: nextQuestionIndex,
      timeLeft: QUESTION_TIME,
    };
  };

  const handleAnswer = async (question: Question, answer: string) => {
    const isCorrect = answer === question.correct_answer;

    toast({
      title: isCorrect ? "Bonne réponse !" : "Mauvaise réponse",
      description: isCorrect 
        ? `+${gameState.timeLeft * question.difficulty} points`
        : `La bonne réponse était : ${question.correct_answer}`,
      variant: isCorrect ? "default" : "destructive",
    });

    setGameState(prev => handleNextTurn(prev, isCorrect));
  };

  const startGame = () => {
    if (questions.length === 0) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer le jeu sans questions",
        variant: "destructive",
      });
      return;
    }

    setGameState(prev => ({ 
      ...prev, 
      status: "playing",
      timeLeft: QUESTION_TIME,
    }));
  };

  return {
    gameState,
    startGame,
    handleAnswer,
    questions,
    isLoading,
  };
};