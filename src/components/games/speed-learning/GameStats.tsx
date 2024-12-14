import { Trophy, Timer } from "lucide-react";

interface GameStatsProps {
  score: number;
  timeLeft: number;
}

export const GameStats = ({ score, timeLeft }: GameStatsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        <span className="text-xl font-semibold">Score: {score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-primary" />
        <span className="text-xl font-semibold">{timeLeft}s</span>
      </div>
    </div>
  );
};