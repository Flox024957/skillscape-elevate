export const effectAnimations = {
  keyframes: {
    "energy-pulse": {
      "0%": {
        transform: "translate(-50%, -50%) scale(0.8)",
        opacity: "0.4",
      },
      "50%": {
        transform: "translate(-50%, -50%) scale(1.2)",
        opacity: "0.6",
      },
      "100%": {
        transform: "translate(-50%, -50%) scale(0.8)",
        opacity: "0.4",
      }
    },
    "orbital-spin-1": {
      "0%": {
        transform: "translate(-50%, -50%) rotate(0deg) scale(0.8)",
      },
      "100%": {
        transform: "translate(-50%, -50%) rotate(360deg) scale(1.2)",
      }
    },
    "orbital-spin-2": {
      "0%": {
        transform: "translate(-50%, -50%) rotate(360deg) scale(1.2)",
      },
      "100%": {
        transform: "translate(-50%, -50%) rotate(0deg) scale(0.8)",
      }
    },
  },
  animation: {
    "energy-pulse": "energy-pulse 15s ease-in-out infinite",
    "orbital-spin-1": "orbital-spin-1 40s linear infinite",
    "orbital-spin-2": "orbital-spin-2 30s linear infinite",
  }
};