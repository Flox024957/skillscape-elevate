export const animations = {
  keyframes: {
    "neon-border": {
      "0%, 100%": {
        "box-shadow": "0 0 5px theme('colors.neon.purple'), 0 0 10px theme('colors.neon.purple')",
        "border-color": "theme('colors.neon.purple')"
      },
      "25%": {
        "box-shadow": "0 0 5px theme('colors.neon.pink'), 0 0 10px theme('colors.neon.pink')",
        "border-color": "theme('colors.neon.pink')"
      },
      "50%": {
        "box-shadow": "0 0 5px theme('colors.neon.orange'), 0 0 10px theme('colors.neon.orange')",
        "border-color": "theme('colors.neon.orange')"
      },
      "75%": {
        "box-shadow": "0 0 5px theme('colors.neon.blue'), 0 0 10px theme('colors.neon.blue')",
        "border-color": "theme('colors.neon.blue')"
      }
    },
    gradient: {
      "0%": { "background-position": "0% 50%" },
      "50%": { "background-position": "100% 50%" },
      "100%": { "background-position": "0% 50%" },
    },
    "fade-in": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
  },
  animation: {
    "neon-pulse": "neon-border 48s linear infinite",
    "snake-border": "neon-border 48s linear infinite",
    "fade-in": "fade-in 0.3s ease-out",
  },
};