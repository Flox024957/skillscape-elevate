import { motion } from "framer-motion";
import { Trophy, Gamepad, Users, Brain, Rocket, Timer, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface GameCard {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const games: GameCard[] = [
  // Jeux de rapidité
  {
    id: "speed-learning-battle",
    title: "Speed Learning Battle",
    description: "Affrontez d'autres joueurs dans une bataille de connaissances rapide !",
    type: "speed",
    players: "2-4 joueurs",
    icon: <Timer className="w-6 h-6" />,
    color: "from-orange-500 to-pink-500",
    route: "/games/speed-learning"
  },
  {
    id: "typing-race",
    title: "Typing Race",
    description: "Course de frappe avec des termes techniques. Soyez le plus rapide !",
    type: "speed",
    players: "2-6 joueurs",
    icon: <Rocket className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
    route: "/games/typing-race"
  },
  {
    id: "flash-cards-sprint",
    title: "Flash Cards Sprint",
    description: "Mémorisez et répondez en équipe aux cartes-éclair !",
    type: "speed",
    players: "2-4 joueurs",
    icon: <Brain className="w-6 h-6" />,
    color: "from-green-500 to-teal-500",
    route: "/games/flash-cards"
  },
  {
    id: "bubble-pop-challenge",
    title: "Bubble Pop Challenge",
    description: "Éclatez les bulles en équipe et battez des records !",
    type: "speed",
    players: "2-4 joueurs",
    icon: <Gamepad className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-500",
    route: "/games/bubble-pop"
  },
  // Jeux de construction
  {
    id: "skill-builder-coop",
    title: "Skill Builder Co-op",
    description: "Construisez ensemble la structure parfaite !",
    type: "construction",
    players: "2-3 joueurs",
    icon: <Users className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    route: "/games/skill-builder"
  },
  {
    id: "mind-map-masters",
    title: "Mind Map Masters",
    description: "Créez la meilleure carte mentale en collaboration !",
    type: "construction",
    players: "2-4 joueurs",
    icon: <Brain className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    route: "/games/mind-map"
  },
  // Jeux collaboratifs
  {
    id: "team-challenge",
    title: "Team Challenge",
    description: "Relevez des défis en équipe contre d'autres équipes !",
    type: "collaborative",
    players: "4-8 joueurs",
    icon: <Users className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    route: "/games/team-challenge"
  },
  {
    id: "skill-chain",
    title: "Skill Chain",
    description: "Créez la plus longue chaîne de compétences en équipe !",
    type: "collaborative",
    players: "3-6 joueurs",
    icon: <Crown className="w-6 h-6" />,
    color: "from-emerald-500 to-green-500",
    route: "/games/skill-chain"
  },
  {
    id: "knowledge-race",
    title: "Knowledge Race",
    description: "Course de connaissances entre équipes !",
    type: "collaborative",
    players: "4-8 joueurs",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-violet-500 to-purple-500",
    route: "/games/knowledge-race"
  },
];

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGameClick = (route: string) => {
    // Pour l'instant, on affiche un toast indiquant que le jeu arrive bientôt
    toast({
      title: "Bientôt disponible !",
      description: "Ce jeu sera disponible dans une prochaine mise à jour.",
    });
    // navigate(route); // À décommenter quand les jeux seront implémentés
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pt-20">
      <div className="container mx-auto p-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Défis Interactifs
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground">
            Affrontez d'autres apprenants dans des jeux éducatifs et collaboratifs !
          </p>

          {/* Sections de jeux */}
          {["speed", "construction", "collaborative"].map((type) => (
            <div key={type} className="space-y-4">
              <h2 className="text-2xl font-semibold capitalize">
                {type === "speed" && "Jeux de Rapidité"}
                {type === "construction" && "Jeux de Construction"}
                {type === "collaborative" && "Jeux Collaboratifs"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games
                  .filter((game) => game.type === type)
                  .map((game) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative overflow-hidden rounded-xl bg-gradient-to-br",
                        game.color
                      )}
                    >
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                      <div className="relative p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            {game.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-white">
                            {game.title}
                          </h3>
                        </div>
                        
                        <p className="text-white/90">
                          {game.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/80">
                            {game.players}
                          </span>
                          <Button
                            onClick={() => handleGameClick(game.route)}
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                          >
                            Jouer
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengesPage;