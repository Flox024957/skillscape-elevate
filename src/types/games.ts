import { LucideIcon } from "lucide-react";

export interface Game {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}