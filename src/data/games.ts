import type { Game } from "@/types/games";

export const games: Game[] = [
  {
    id: "1",
    title: "Speed Learning",
    description: "Testez vos connaissances en répondant rapidement aux questions !",
    type: "speed" as const,
    players: "1 joueur",
    icon: "Brain",
    color: "from-violet-500 to-purple-700",
    route: "/games/speed-learning"
  },
  {
    id: "2",
    title: "Flash Cards Sprint",
    description: "Mémorisez et répondez aux cartes pour marquer des points !",
    type: "speed" as const,
    players: "1 joueur",
    icon: "Brain",
    color: "from-blue-500 to-indigo-700",
    route: "/games/flash-cards"
  },
  {
    id: "3",
    title: "Typing Race",
    description: "Améliorez votre vitesse de frappe en tapant les mots correctement !",
    type: "speed" as const,
    players: "1 joueur",
    icon: "Keyboard",
    color: "from-emerald-500 to-green-700",
    route: "/games/typing-race"
  }
];