import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTypingGame } from "@/hooks/use-typing-game";
import { StartScreen } from "@/components/games/typing-race/StartScreen";
import { TypingArea } from "@/components/games/typing-race/TypingArea";
import { GameStats } from "@/components/games/typing-race/GameStats";
import { GameOver } from "@/components/games/typing-race/GameOver";

const TypingRacePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    gameState,
    currentWord,
    score,
    timeLeft,
    accuracy,
    wpm,
    highScore,
    startGame,
    endGame,
    handleTyping,
    isGameOver
  } = useTypingGame();

  const handleExit = () => {
    navigate("/challenges");
  };

  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing") {
      endGame();
      toast({
        title: "Temps écoulé !",
        description: `Score final : ${score} points`,
      });
    }
  }, [timeLeft, gameState, endGame, score, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
              Typing Race
            </h1>
            <Button variant="outline" onClick={handleExit}>
              Quitter
            </Button>
          </div>

          {gameState === "waiting" && (
            <StartScreen onStart={startGame} highScore={highScore} />
          )}

          {gameState === "playing" && (
            <div className="space-y-8">
              <GameStats score={score} timeLeft={timeLeft} accuracy={accuracy} wpm={wpm} />
              <TypingArea
                currentWord={currentWord}
                onType={handleTyping}
              />
            </div>
          )}

          {isGameOver && (
            <GameOver
              score={score}
              accuracy={accuracy}
              wpm={wpm}
              highScore={highScore}
              onRestart={startGame}
              onExit={handleExit}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TypingRacePage;