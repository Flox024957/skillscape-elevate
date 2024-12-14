export const shapeAnimations = {
  keyframes: {
    "hexagon-spin": {
      "0%": {
        transform: "rotate(0deg) scale(0.8)",
        opacity: "0.2",
      },
      "50%": {
        transform: "rotate(180deg) scale(1.2)",
        opacity: "0.4",
      },
      "100%": {
        transform: "rotate(360deg) scale(0.8)",
        opacity: "0.2",
      }
    },
    "hexagon-spin-reverse": {
      "0%": {
        transform: "rotate(360deg) scale(1.2)",
        opacity: "0.4",
      },
      "50%": {
        transform: "rotate(180deg) scale(0.8)",
        opacity: "0.2",
      },
      "100%": {
        transform: "rotate(0deg) scale(1.2)",
        opacity: "0.4",
      }
    },
    "triangle-float": {
      "0%": {
        transform: "translateY(0px) rotate(0deg)",
        opacity: "0.2",
      },
      "50%": {
        transform: "translateY(-30px) rotate(180deg)",
        opacity: "0.4",
      },
      "100%": {
        transform: "translateY(0px) rotate(360deg)",
        opacity: "0.2",
      }
    },
    "triangle-float-reverse": {
      "0%": {
        transform: "translateY(-30px) rotate(360deg)",
        opacity: "0.4",
      },
      "50%": {
        transform: "translateY(0px) rotate(180deg)",
        opacity: "0.2",
      },
      "100%": {
        transform: "translateY(-30px) rotate(0deg)",
        opacity: "0.4",
      }
    },
  },
  animation: {
    "hexagon-spin": "hexagon-spin 20s linear infinite",
    "hexagon-spin-reverse": "hexagon-spin-reverse 25s linear infinite",
    "triangle-float": "triangle-float 15s ease-in-out infinite",
    "triangle-float-reverse": "triangle-float-reverse 18s ease-in-out infinite",
  }
};