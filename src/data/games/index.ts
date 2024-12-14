import { speedGames } from "./speed";
import { constructionGames } from "./construction";
import { collaborativeGames } from "./collaborative";
import { Game } from "@/types/games";

export const games: Game[] = [
  ...speedGames,
  ...constructionGames,
  ...collaborativeGames
];