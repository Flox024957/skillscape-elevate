export const stellarAnimations = {
  keyframes: {
    "nebula-pulse-1": {
      "0%": {
        transform: "translate(-30%, -30%) scale(1)",
        opacity: "0.3",
      },
      "50%": {
        transform: "translate(-20%, -20%) scale(1.4)",
        opacity: "0.5",
      },
      "100%": {
        transform: "translate(-30%, -30%) scale(1)",
        opacity: "0.3",
      }
    },
    "nebula-pulse-2": {
      "0%": {
        transform: "translate(30%, 30%) scale(1.4)",
        opacity: "0.5",
      },
      "50%": {
        transform: "translate(20%, 20%) scale(1)",
        opacity: "0.3",
      },
      "100%": {
        transform: "translate(30%, 30%) scale(1.4)",
        opacity: "0.5",
      }
    },
    "flare-burst-1": {
      "0%": {
        transform: "scale(0.8) rotate(-15deg)",
        opacity: "0.2",
      },
      "50%": {
        transform: "scale(1.5) rotate(15deg)",
        opacity: "0.4",
      },
      "100%": {
        transform: "scale(0.8) rotate(-15deg)",
        opacity: "0.2",
      }
    },
    "flare-burst-2": {
      "0%": {
        transform: "scale(1.5) rotate(15deg)",
        opacity: "0.4",
      },
      "50%": {
        transform: "scale(0.8) rotate(-15deg)",
        opacity: "0.2",
      },
      "100%": {
        transform: "scale(1.5) rotate(15deg)",
        opacity: "0.4",
      }
    },
  },
  animation: {
    "nebula-pulse-1": "nebula-pulse-1 20s ease-in-out infinite",
    "nebula-pulse-2": "nebula-pulse-2 25s ease-in-out infinite",
    "flare-burst-1": "flare-burst-1 15s ease-in-out infinite",
    "flare-burst-2": "flare-burst-2 18s ease-in-out infinite",
  }
};