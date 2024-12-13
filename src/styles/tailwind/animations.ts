export const animations = {
  keyframes: {
    "neon-pulse": {
      "0%, 100%": {
        "box-shadow": "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)",
        "border-color": "rgba(139, 92, 246, 0.8)",
      },
      "50%": {
        "box-shadow": "0 0 25px rgba(139, 92, 246, 0.8), 0 0 50px rgba(139, 92, 246, 0.4)",
        "border-color": "rgba(139, 92, 246, 1)",
      }
    },
    "neon-text": {
      "0%, 100%": {
        "text-shadow": "0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.4)",
        "color": "rgba(139, 92, 246, 1)",
      },
      "50%": {
        "text-shadow": "0 0 15px rgba(139, 92, 246, 1), 0 0 30px rgba(139, 92, 246, 0.6)",
        "color": "rgba(139, 92, 246, 1)",
      }
    },
    "fade-in": {
      "0%": { opacity: "0", transform: "translateY(10px)" },
      "100%": { opacity: "1", transform: "translateY(0)" }
    }
  },
  animation: {
    "neon-pulse": "neon-pulse 2s ease-in-out infinite",
    "neon-text": "neon-text 2s ease-in-out infinite",
    "fade-in": "fade-in 0.3s ease-out",
  },
};