import { Game } from "@/types/games";

export const speedGames: Game[] = [
  {
    id: "speed-learning",
    title: "Speed Learning",
    description: "Testez vos connaissances rapidement",
    type: "speed",
    players: "1 joueur",
    icon: "Zap",
    color: "#FF6B6B",
    route: "/games/speed-learning",
    available: true
  },
  {
    id: "typing-race",
    title: "Typing Race",
    description: "Améliorez votre vitesse de frappe",
    type: "speed",
    players: "1-4 joueurs",
    icon: "Keyboard",
    color: "#4ECDC4",
    route: "/games/typing-race",
    available: true
  },
  {
    id: "flash-cards",
    title: "Flash Cards",
    description: "Mémorisez efficacement",
    type: "speed",
    players: "1 joueur",
    icon: "ScrollText",
    color: "#45B7D1",
    route: "/games/flash-cards",
    available: true
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    description: "Éclatez les bulles de connaissances",
    type: "speed",
    players: "1 joueur",
    icon: "Circle",
    color: "#96CEB4",
    route: "/games/bubble-pop",
    available: true
  },
  {
    id: "knowledge-race",
    title: "Knowledge Race",
    description: "Course aux connaissances",
    type: "speed",
    players: "1-4 joueurs",
    icon: "Flag",
    color: "#E76F51",
    route: "/games/knowledge-race",
    available: true
  }
];