import { useState } from "react";
import { motion } from "framer-motion";
import { useSkillChainGame } from "@/hooks/use-skill-chain-game";
import { SkillChainGame } from "@/components/games/skill-chain/SkillChainGame";
import { StartScreen } from "@/components/games/skill-chain/StartScreen";
import { GameOver } from "@/components/games/skill-chain/GameOver";

const SkillChainPage = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const game = useSkillChainGame();

  if (!hasStarted) {
    return <StartScreen onStart={() => setHasStarted(true)} />;
  }

  if (game.gameOver) {
    return <GameOver score={game.score} onRestart={() => game.handleRestart()} />;
  }

  return <SkillChainGame {...game} />;
};

export default SkillChainPage;