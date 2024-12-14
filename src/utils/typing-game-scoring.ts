import type { GameScore } from "@/types/typing-game";

export const calculateScore = (
  wordLength: number,
  streak: number,
  timeLeft: number
): GameScore => {
  const baseScore = wordLength * 10;
  const streakBonus = Math.floor(streak / 3) * 5;
  const timeBonus = Math.floor(timeLeft / 10) * 2;
  
  return {
    baseScore,
    streakBonus,
    timeBonus,
    total: baseScore + streakBonus + timeBonus
  };
};

export const calculateWPM = (
  typedChars: number,
  startTime: number | null
): number => {
  if (!startTime) return 0;
  const timeElapsed = (Date.now() - startTime) / 1000 / 60; // en minutes
  return Math.round((typedChars / 5) / timeElapsed);
};

export const calculateAccuracy = (
  typedChars: number,
  correctChars: number
): number => {
  return typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;
};