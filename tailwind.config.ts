import type { Config } from "tailwindcss";
import { colors } from "./src/styles/tailwind/colors";
import { animations } from "./src/styles/tailwind/animations";
import { theme } from "./src/styles/tailwind/theme";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    ...theme,
    extend: {
      colors,
      ...animations,
      ...theme.extend,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;