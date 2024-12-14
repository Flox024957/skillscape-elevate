export type GameState = "waiting" | "playing" | "finished";

export interface GameStats {
  score: number;
  timeLeft: number;
  typedChars: number;
  correctChars: number;
  streak: number;
  startTime: number | null;
}

export interface GameScore {
  baseScore: number;
  streakBonus: number;
  timeBonus: number;
  total: number;
}