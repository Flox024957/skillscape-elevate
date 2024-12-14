import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlashCardsGame } from "@/hooks/use-flash-cards-game";
import { GameHeader } from "@/components/games/flash-cards/GameHeader";
import { GameStats } from "@/components/games/flash-cards/GameStats";
import { FlashCard } from "@/components/games/flash-cards/FlashCard";
import { GameOver } from "@/components/games/flash-cards/GameOver";
import { StartScreen } from "@/components/games/flash-cards/StartScreen";

export default function FlashCardsPage() {
  const navigate = useNavigate();
  const {
    currentCard,
    score,
    timeLeft,
    gameStarted,
    gameOver,
    streak,
    highScore,
    handleStartGame,
    handleAnswer,
  } = useFlashCardsGame();

  const handleExit = () => {
    navigate("/challenges");
  };

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
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <Brain className="w-12 h-12 text-primary animate-pulse" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
                Flash Cards Sprint
              </h1>
            </div>
          </div>

          {!gameStarted ? (
            <StartScreen onStart={handleStartGame} highScore={highScore} />
          ) : (
            <div className="space-y-8">
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
                  onExit={handleExit}
                  highScore={highScore}
                />
              ) : currentCard ? (
                <FlashCard
                  card={currentCard}
                  onAnswer={handleAnswer}
                  isDisabled={gameOver}
                />
              ) : null}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}