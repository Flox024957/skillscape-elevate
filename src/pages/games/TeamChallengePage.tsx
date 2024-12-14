import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { QuestionDisplay } from "@/components/games/team-challenge/QuestionDisplay";
import { TeamScoreDisplay } from "@/components/games/team-challenge/TeamScoreDisplay";
import { WaitingScreen } from "@/components/games/team-challenge/WaitingScreen";
import { GameOverScreen } from "@/components/games/team-challenge/GameOverScreen";
import { useTeamChallenge } from "@/hooks/use-team-challenge";

const TeamChallengePage = () => {
  const { gameState, startGame, handleAnswer } = useTeamChallenge();

  // Charger les questions depuis Supabase
  const { data: questions, isLoading } = useQuery({
    queryKey: ["team-challenge-questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("game_questions")
        .select("*")
        .eq("category", "team_challenge")
        .order("difficulty", { ascending: true });

      if (error) throw error;
      
      // Conversion explicite des options en string[]
      return data.map(question => ({
        ...question,
        options: question.options as string[]
      }));
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-24">
      <div className="container mx-auto p-6 space-y-8">
        {/* En-tête du jeu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-3 bg-primary/10 rounded-xl"
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground">
              Team Challenge
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Affrontez d'autres équipes dans une série de défis passionnants ! Collaborez, réfléchissez et soyez les plus rapides.
          </p>
        </motion.div>

        {/* Zone de jeu principale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-8 shadow-lg space-y-6"
        >
          {gameState.status === "waiting" ? (
            <WaitingScreen onStart={startGame} isLoading={isLoading} />
          ) : gameState.status === "playing" && questions ? (
            <div className="space-y-6">
              <TeamScoreDisplay 
                scores={gameState.scores} 
                currentTeam={gameState.currentTeam} 
              />
              
              <QuestionDisplay
                question={questions[gameState.currentQuestionIndex]}
                onAnswer={answer => handleAnswer(questions[gameState.currentQuestionIndex], answer)}
                timeLeft={gameState.timeLeft}
              />
            </div>
          ) : (
            <GameOverScreen scores={gameState.scores} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamChallengePage;