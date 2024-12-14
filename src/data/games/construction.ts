import { Game } from "@/types/games";

export const constructionGames: Game[] = [
  {
    id: "skill-builder",
    title: "Skill Builder",
    description: "Construisez votre arbre de compétences",
    type: "construction",
    players: "1 joueur",
    icon: "TreePine",
    color: "#D4A373",
    route: "/games/skill-builder",
    available: true
  },
  {
    id: "skill-chain",
    title: "Skill Chain",
    description: "Connectez les compétences entre elles",
    type: "construction",
    players: "1 joueur",
    icon: "Link",
    color: "#E9C46A",
    route: "/games/skill-chain",
    available: true
  }
];