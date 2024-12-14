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
  },
  {
    id: "4",
    title: "Code Builder",
    description: "Construisez des algorithmes en assemblant des blocs de code !",
    type: "construction" as const,
    players: "1-2 joueurs",
    icon: "Code2",
    color: "from-orange-500 to-red-700",
    route: "/games/code-builder"
  },
  {
    id: "5",
    title: "Pattern Maker",
    description: "Créez des motifs en utilisant des formes géométriques !",
    type: "construction" as const,
    players: "1 joueur",
    icon: "Square",
    color: "from-pink-500 to-rose-700",
    route: "/games/pattern-maker"
  },
  {
    id: "6",
    title: "Team Quest",
    description: "Résolvez des énigmes en équipe et partagez vos connaissances !",
    type: "collaborative" as const,
    players: "2-4 joueurs",
    icon: "Users",
    color: "from-teal-500 to-cyan-700",
    route: "/games/team-quest"
  },
  {
    id: "7",
    title: "Code Review",
    description: "Révisez et améliorez le code de vos coéquipiers !",
    type: "collaborative" as const,
    players: "2-3 joueurs",
    icon: "FileCode2",
    color: "from-yellow-500 to-amber-700",
    route: "/games/code-review"
  }
];