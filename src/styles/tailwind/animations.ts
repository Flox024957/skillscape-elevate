export const animations = {
  keyframes: {
    "spin-slow": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" }
    },
    "spin-slow-reverse": {
      "0%": { transform: "rotate(360deg)" },
      "100%": { transform: "rotate(0deg)" }
    }
  },
  animation: {
    "spin-slow": "spin-slow 20s linear infinite",
    "spin-slow-reverse": "spin-slow-reverse 20s linear infinite"
  }
};