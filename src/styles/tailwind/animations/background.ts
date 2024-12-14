export const backgroundAnimations = {
  keyframes: {
    "cosmic-wave-1": {
      "0%": {
        transform: "translateX(-100%) translateY(-20%) rotate(-5deg) scale(1.2)",
      },
      "50%": {
        transform: "translateX(0%) translateY(0%) rotate(0deg) scale(1)",
      },
      "100%": {
        transform: "translateX(100%) translateY(-20%) rotate(5deg) scale(1.2)",
      }
    },
    "cosmic-wave-2": {
      "0%": {
        transform: "translateX(100%) translateY(20%) rotate(5deg) scale(1.2)",
      },
      "50%": {
        transform: "translateX(0%) translateY(0%) rotate(0deg) scale(1)",
      },
      "100%": {
        transform: "translateX(-100%) translateY(20%) rotate(-5deg) scale(1.2)",
      }
    },
    "cosmic-wave-3": {
      "0%": {
        transform: "translateY(-100%) scale(1.5)",
      },
      "50%": {
        transform: "translateY(0%) scale(1)",
      },
      "100%": {
        transform: "translateY(100%) scale(1.5)",
      }
    },
  },
  animation: {
    "cosmic-wave-1": "cosmic-wave-1 25s linear infinite",
    "cosmic-wave-2": "cosmic-wave-2 30s linear infinite",
    "cosmic-wave-3": "cosmic-wave-3 35s linear infinite",
  }
};