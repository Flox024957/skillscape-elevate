import { Trophy, Timer, Zap } from "lucide-react";

interface GameStatsProps {
  score: number;
  timeLeft: number;
  streak: number;
  highScore: number;
}

export const GameStats = ({ score, timeLeft, streak, highScore }: GameStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
        <Trophy className="w-5 h-5 text-primary" />
        <div>
          <span className="text-sm text-muted-foreground">Score</span>
          <p className="text-xl font-semibold">{score}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
        <Timer className="w-5 h-5 text-primary" />
        <div>
          <span className="text-sm text-muted-foreground">Temps</span>
          <p className="text-xl font-semibold">{timeLeft}s</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
        <Zap className={`w-5 h-5 ${streak > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
        <div>
          <span className="text-sm text-muted-foreground">Série</span>
          <p className="text-xl font-semibold">{streak}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-background/50 p-3 rounded-lg">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <div>
          <span className="text-sm text-muted-foreground">Record</span>
          <p className="text-xl font-semibold">{highScore}</p>
        </div>
      </div>
    </div>
  );
};