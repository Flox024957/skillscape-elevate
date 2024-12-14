import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameHeader } from "@/components/games/bubble-pop/GameHeader";
import { StartScreen } from "@/components/games/bubble-pop/StartScreen";
import { GameArea } from "@/components/games/bubble-pop/GameArea";
import { GameOver } from "@/components/games/bubble-pop/GameOver";
import { useBubblePopGame } from "@/hooks/use-bubble-pop-game";

const BubblePopPage = () => {
  const navigate = useNavigate();
  const game = useBubblePopGame();

  useEffect(() => {
    // Cleanup function
    return () => {
      game.resetGame();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20">
      <div className="container mx-auto p-4">
        <GameHeader
          score={game.score}
          timeLeft={game.timeLeft}
          isPlaying={game.isPlaying}
          onExit={() => navigate("/challenges")}
        />

        <div className="mt-8">
          {!game.hasStarted ? (
            <StartScreen onStart={game.startGame} highScore={game.highScore} />
          ) : game.isGameOver ? (
            <GameOver
              score={game.score}
              highScore={game.highScore}
              onRestart={game.resetGame}
              onExit={() => navigate("/challenges")}
            />
          ) : (
            <GameArea
              bubbles={game.bubbles}
              onBubblePop={game.handleBubblePop}
              isPlaying={game.isPlaying}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BubblePopPage;