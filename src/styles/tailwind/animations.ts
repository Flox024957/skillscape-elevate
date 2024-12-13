export const animations = {
  keyframes: {
    "neon-pulse": {
      "0%, 100%": {
        "box-shadow": "0 0 15px theme('colors.neon.blue'), 0 0 30px theme('colors.neon.blue')",
        "border-color": "theme('colors.neon.blue')",
      },
      "33%": {
        "box-shadow": "0 0 15px theme('colors.neon.purple'), 0 0 30px theme('colors.neon.purple')",
        "border-color": "theme('colors.neon.purple')",
      },
      "66%": {
        "box-shadow": "0 0 15px theme('colors.neon.orange'), 0 0 30px theme('colors.neon.orange')",
        "border-color": "theme('colors.neon.orange')",
      }
    },
    "neon-text": {
      "0%, 100%": {
        "text-shadow": "0 0 10px theme('colors.neon.blue'), 0 0 20px theme('colors.neon.blue')",
        "color": "theme('colors.neon.blue')",
      },
      "33%": {
        "text-shadow": "0 0 10px theme('colors.neon.purple'), 0 0 20px theme('colors.neon.purple')",
        "color": "theme('colors.neon.purple')",
      },
      "66%": {
        "text-shadow": "0 0 10px theme('colors.neon.orange'), 0 0 20px theme('colors.neon.orange')",
        "color": "theme('colors.neon.orange')",
      }
    },
    "fade-in": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    }
  },
  animation: {
    "neon-pulse": "neon-pulse 18s ease-in-out infinite",
    "neon-text": "neon-text 18s ease-in-out infinite",
    "fade-in": "fade-in 0.3s ease-out",
  },
};