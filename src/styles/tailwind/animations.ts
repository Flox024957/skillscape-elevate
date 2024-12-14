export const animations = {
  keyframes: {
    "float-slow": {
      "0%, 100%": {
        transform: "translate(0, 0) scale(1)",
      },
      "25%": {
        transform: "translate(2%, 2%) scale(1.05)",
      },
      "50%": {
        transform: "translate(-1%, 3%) scale(0.95)",
      },
      "75%": {
        transform: "translate(-2%, -1%) scale(1.02)",
      }
    },
    "float-medium": {
      "0%, 100%": {
        transform: "translate(0, 0) scale(1)",
      },
      "33%": {
        transform: "translate(-2%, 2%) scale(1.1)",
      },
      "66%": {
        transform: "translate(1%, -2%) scale(0.9)",
      }
    },
    "float-fast": {
      "0%, 100%": {
        transform: "translate(0, 0) scale(1)",
      },
      "50%": {
        transform: "translate(1%, 1%) scale(1.15)",
      }
    },
    "pulse-slow": {
      "0%, 100%": {
        opacity: "0.3",
        transform: "scale(1)",
      },
      "50%": {
        opacity: "0.7",
        transform: "scale(1.1)",
      }
    },
    "pulse-medium": {
      "0%, 100%": {
        opacity: "0.4",
        transform: "scale(1)",
      },
      "50%": {
        opacity: "0.8",
        transform: "scale(1.15)",
      }
    },
    "pulse-fast": {
      "0%, 100%": {
        opacity: "0.5",
        transform: "scale(1)",
      },
      "50%": {
        opacity: "0.9",
        transform: "scale(1.2)",
      }
    },
    "wave": {
      "0%": {
        transform: "translateX(-100%) translateY(-10%)",
      },
      "50%": {
        transform: "translateX(0%) translateY(0%)",
      },
      "100%": {
        transform: "translateX(100%) translateY(-10%)",
      }
    }
  },
  animation: {
    "float-slow": "float-slow 20s ease-in-out infinite",
    "float-medium": "float-medium 15s ease-in-out infinite",
    "float-fast": "float-fast 10s ease-in-out infinite",
    "pulse-slow": "pulse-slow 15s ease-in-out infinite",
    "pulse-medium": "pulse-medium 10s ease-in-out infinite",
    "pulse-fast": "pulse-fast 8s ease-in-out infinite",
    "wave": "wave 20s ease-in-out infinite",
  },
};