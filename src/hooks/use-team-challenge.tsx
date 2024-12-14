import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Question } from "@/types/game";

export type GameStatus = "waiting" | "playing" | "finished";

interface TeamChallengeState {
  status: GameStatus;
  currentTeam: number;
  scores: Record<number, number>;
  currentQuestionIndex: number;
  timeLeft: number;
}

const QUESTION_TIME = 30;
const TOTAL_QUESTIONS = 10;

export const useTeamChallenge = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<TeamChallengeState>({
    status: "waiting",
    currentTeam: 1,
    scores: { 1: 0, 2: 0 },
    currentQuestionIndex: 0,
    timeLeft: QUESTION_TIME,
  });

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
      newScores[currentState.currentTeam] += currentState.timeLeft;
    }

    const nextQuestionIndex = currentState.currentQuestionIndex + 1;
    
    if (nextQuestionIndex >= TOTAL_QUESTIONS) {
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

  const handleAnswer = (question: Question, answer: string) => {
    const isCorrect = answer === question.correct_answer;

    toast({
      title: isCorrect ? "Bonne réponse !" : "Mauvaise réponse",
      description: isCorrect 
        ? `+${gameState.timeLeft * question.difficulty} points`
        : "Pas de points gagnés",
      variant: isCorrect ? "default" : "destructive",
    });

    setGameState(prev => handleNextTurn(prev, isCorrect));
  };

  const startGame = () => {
    setGameState(prev => ({ 
      ...prev, 
      status: "playing" as const,
      timeLeft: QUESTION_TIME,
    }));
  };

  return {
    gameState,
    startGame,
    handleAnswer,
  };
};