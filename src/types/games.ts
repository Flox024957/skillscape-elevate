export interface Game {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: string;
  color: string;
  route: string;
}