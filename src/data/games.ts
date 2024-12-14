import type { Game } from "@/types/games";

export const games: Game[] = [
  {
    id: "speed-learning",
    title: "Speed Learning",
    description: "Testez vos compétences en vitesse d'apprentissage !",
    type: "speed",
    players: "1-4",
    icon: "Clock",
    color: "bg-gradient-to-r from-green-400 to-blue-500",
    route: "/games/speed-learning"
  },
  {
    id: "typing-race",
    title: "Typing Race",
    description: "Affrontez-vous dans une course de frappe !",
    type: "speed",
    players: "1-4",
    icon: "Keyboard",
    color: "bg-gradient-to-r from-yellow-400 to-red-500",
    route: "/games/typing-race"
  },
  {
    id: "flash-cards",
    title: "Flash Cards",
    description: "Apprenez avec des cartes mémoire interactives !",
    type: "construction",
    players: "1-10",
    icon: "BookOpen",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    route: "/games/flash-cards"
  },
  {
    id: "bubble-pop",
    title: "Bubble Pop",
    description: "Éclatez des bulles tout en apprenant !",
    type: "collaborative",
    players: "1-4",
    icon: "Droplet",
    color: "bg-gradient-to-r from-pink-500 to-red-500",
    route: "/games/bubble-pop"
  },
  {
    id: "skill-builder",
    title: "Skill Builder",
    description: "Construisez vos compétences avec des défis !",
    type: "construction",
    players: "1-10",
    icon: "Hammer",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    route: "/games/skill-builder"
  },
  {
    id: "mind-map",
    title: "Mind Map",
    description: "Créez des cartes mentales pour organiser vos idées !",
    type: "construction",
    players: "1-10",
    icon: "Map",
    color: "bg-gradient-to-r from-teal-500 to-green-500",
    route: "/games/mind-map"
  },
  {
    id: "team-challenge",
    title: "Team Challenge",
    description: "Affrontez-vous en équipe dans un quiz de connaissances sur les compétences !",
    type: "collaborative",
    players: "4-10",
    icon: "Users",
    color: "bg-gradient-to-r from-violet-500 to-purple-500",
    route: "/games/team-challenge"
  },
  {
    id: "skill-chain",
    title: "Skill Chain",
    description: "Construisez des chaînes de compétences liées !",
    type: "construction",
    players: "1-4",
    icon: "Link",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    route: "/games/skill-chain"
  },
  {
    id: "knowledge-race",
    title: "Knowledge Race",
    description: "Testez vos connaissances dans une course contre la montre !",
    type: "speed",
    players: "1",
    icon: "Brain",
    color: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    route: "/games/knowledge-race"
  }
];
