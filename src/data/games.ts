import { Trophy, Gamepad, Users, Brain, Rocket, Timer, Crown } from "lucide-react";
import type { Game } from "@/types/games";

export const games: Game[] = [
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