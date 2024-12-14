import type { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

export interface Game {
  id: string;
  title: string;
  description: string;
  type: "speed" | "construction" | "collaborative";
  players: string;
  icon: keyof typeof LucideIcons;
  color: string;
  route: string;
}

export interface CodeSnippet {
  id: string;
  content: string;
  order: number;
}