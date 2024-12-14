import { motion } from "framer-motion";
import { GameHeader } from "@/components/games/speed-learning/GameHeader";
import { GameStats } from "@/components/games/speed-learning/GameStats";
import { QuestionCard } from "@/components/games/speed-learning/QuestionCard";
import { GameOver } from "@/components/games/speed-learning/GameOver";
import { StartScreen } from "@/components/games/speed-learning/StartScreen";
import { useGameState } from "@/hooks/use-game-state";

export default function SpeedLearningPage() {
  const {
    currentQuestion,
    score,
    timeLeft,
    gameStarted,
    gameOver,
    streak,
    highScore,
    handleStartGame,
    handleAnswer
  } = useGameState();

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
                <GameStats 
                  score={score} 
                  timeLeft={timeLeft} 
                  streak={streak}
                  highScore={highScore}
                />

                {gameOver ? (
                  <GameOver 
                    score={score} 
                    onRestart={handleStartGame}
                    highScore={highScore}
                  />
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