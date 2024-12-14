import { Game } from "@/types/games";

export const games: Game[] = [
  {
    id: "speed-learning",
    title: "Speed Learning",
    description: "Testez vos connaissances rapidement",
    type: "speed",
    players: "1 joueur",
    icon: "Zap",
    color: "#FF6B6B",
    route: "/games/speed-learning"
  },
  {
    id: "typing-race",
    title: "Typing Race",
    description: "Améliorez votre vitesse de frappe",
    type: "speed",
    players: "1-4 joueurs",
    icon: "Keyboard",
    color: "#4ECDC4",
    route: "/games/typing-race"
  },
  {
    id: "flash-cards",
    title: "Flash Cards",
    description: "Mémorisez efficacement",
    type: "speed",
    players: "1 joueur",
    icon: "ScrollText",
    color: "#45B7D1",
    route: "/games/flash-cards"
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    description: "Éclatez les bulles de connaissances",
    type: "speed",
    players: "1 joueur",
    icon: "Circle",
    color: "#96CEB4",
    route: "/games/bubble-pop"
  },
  {
    id: "skill-builder",
    title: "Skill Builder",
    description: "Construisez votre arbre de compétences",
    type: "construction",
    players: "1 joueur",
    icon: "TreePine",
    color: "#D4A373",
    route: "/games/skill-builder"
  },
  {
    id: "mind-map",
    title: "Mind Map",
    description: "Créez des cartes mentales collaboratives",
    type: "collaborative",
    players: "1-5 joueurs",
    icon: "Network",
    color: "#FFB4A2",
    route: "/games/mind-map"
  },
  {
    id: "skill-chain",
    title: "Skill Chain",
    description: "Connectez les compétences entre elles",
    type: "construction",
    players: "1 joueur",
    icon: "Link",
    color: "#E9C46A",
    route: "/games/skill-chain"
  },
  {
    id: "team-challenge",
    title: "Team Challenge",
    description: "Relevez des défis en équipe",
    type: "collaborative",
    players: "2-8 joueurs",
    icon: "Users",
    color: "#2A9D8F",
    route: "/games/team-challenge"
  },
  {
    id: "knowledge-race",
    title: "Knowledge Race",
    description: "Course aux connaissances",
    type: "speed",
    players: "1-4 joueurs",
    icon: "Flag",
    color: "#E76F51",
    route: "/games/knowledge-race"
  }
];