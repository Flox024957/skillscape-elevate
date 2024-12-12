import type { Config } from "tailwindcss";

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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        futuristic: {
          blue: "#00A3FF",
          violet: "#9D4EDD",
          darkBlue: "#0B1026",
          black: "#070B1A",
          gray: "#1A1F35",
        },
      },
      keyframes: {
        "snake-border": {
          "0%": {
            "clip-path": "inset(0 98% 98% 0)",
            "border-color": "rgb(0, 163, 255)",
            "box-shadow": "0 0 20px rgba(0, 163, 255, 0.5)",
          },
          "25%": {
            "clip-path": "inset(0 0 98% 0)",
            "border-color": "rgb(157, 78, 221)",
            "box-shadow": "0 0 20px rgba(157, 78, 221, 0.5)",
          },
          "50%": {
            "clip-path": "inset(0 0 0 98%)",
            "border-color": "rgb(0, 163, 255)",
            "box-shadow": "0 0 20px rgba(0, 163, 255, 0.5)",
          },
          "75%": {
            "clip-path": "inset(98% 0 0 0)",
            "border-color": "rgb(157, 78, 221)",
            "box-shadow": "0 0 20px rgba(157, 78, 221, 0.5)",
          },
          "100%": {
            "clip-path": "inset(0 98% 98% 0)",
            "border-color": "rgb(0, 163, 255)",
            "box-shadow": "0 0 20px rgba(0, 163, 255, 0.5)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "snake-border": "snake-border 4s linear infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "futuristic-grid": "linear-gradient(to right, rgba(0, 163, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 163, 255, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;