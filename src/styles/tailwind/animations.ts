export const animations = {
  keyframes: {
    // Cosmic Waves
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

    // Energy Pulse
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

    // Orbital Spins
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

    // Nebula Pulses
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

    // Stellar Flares
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
    // Cosmic Waves
    "cosmic-wave-1": "cosmic-wave-1 25s linear infinite",
    "cosmic-wave-2": "cosmic-wave-2 30s linear infinite",
    "cosmic-wave-3": "cosmic-wave-3 35s linear infinite",
    
    // Energy Pulse
    "energy-pulse": "energy-pulse 15s ease-in-out infinite",
    
    // Orbital Spins
    "orbital-spin-1": "orbital-spin-1 40s linear infinite",
    "orbital-spin-2": "orbital-spin-2 30s linear infinite",
    
    // Nebula Pulses
    "nebula-pulse-1": "nebula-pulse-1 20s ease-in-out infinite",
    "nebula-pulse-2": "nebula-pulse-2 25s ease-in-out infinite",
    
    // Stellar Flares
    "flare-burst-1": "flare-burst-1 15s ease-in-out infinite",
    "flare-burst-2": "flare-burst-2 18s ease-in-out infinite",
  },
};