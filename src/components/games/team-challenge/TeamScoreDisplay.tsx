import { motion } from "framer-motion";

interface TeamScoreDisplayProps {
  scores: Record<number, number>;
  currentTeam: number;
}

export const TeamScoreDisplay = ({ scores, currentTeam }: TeamScoreDisplayProps) => {
  return (
    <div className="flex gap-4">
      {Object.entries(scores).map(([team, score]) => (
        <motion.div
          key={team}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: Number(team) === currentTeam ? 1.1 : 1,
            opacity: 1
          }}
          className={`
            bg-card p-4 rounded-lg shadow-lg
            ${Number(team) === currentTeam ? 'ring-2 ring-primary' : ''}
          `}
        >
          <p className="text-sm font-medium text-muted-foreground">
            Équipe {team}
          </p>
          <p className="text-2xl font-bold">{score}</p>
        </motion.div>
      ))}
    </div>
  );
};