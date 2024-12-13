export const animations = {
  keyframes: {
    "neon-border": {
      "0%, 100%": {
        "box-shadow": "0 0 10mm theme('colors.neon.blue'), 0 0 10mm theme('colors.neon.blue'), 0 0 10mm theme('colors.neon.blue')",
        "border-color": "theme('colors.neon.blue')",
        "opacity": "1"
      },
      "33%": {
        "box-shadow": "0 0 10mm theme('colors.neon.orange'), 0 0 10mm theme('colors.neon.orange'), 0 0 10mm theme('colors.neon.orange')",
        "border-color": "theme('colors.neon.orange')",
        "opacity": "1"
      },
      "66%": {
        "box-shadow": "0 0 10mm theme('colors.neon.purple'), 0 0 10mm theme('colors.neon.purple'), 0 0 10mm theme('colors.neon.purple')",
        "border-color": "theme('colors.neon.purple')",
        "opacity": "1"
      }
    },
    "fade-in": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
  animation: {
    "neon-pulse": "neon-border 900s ease-in-out infinite",
    "snake-border": "neon-border 900s ease-in-out infinite",
    "fade-in": "fade-in 0.3s ease-out",
  },
};