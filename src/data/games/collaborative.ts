import { Game } from "@/types/games";

export const collaborativeGames: Game[] = [
  {
    id: "mind-map",
    title: "Mind Map",
    description: "Créez des cartes mentales collaboratives",
    type: "collaborative",
    players: "1-5 joueurs",
    icon: "Network",
    color: "#FFB4A2",
    route: "/games/mind-map",
    available: true
  },
  {
    id: "team-challenge",
    title: "Team Challenge",
    description: "Relevez des défis en équipe",
    type: "collaborative",
    players: "2-8 joueurs",
    icon: "Users",
    color: "#2A9D8F",
    route: "/games/team-challenge",
    available: true
  }
];