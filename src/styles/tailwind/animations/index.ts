import { backgroundAnimations } from "./background";
import { shapeAnimations } from "./shapes";
import { effectAnimations } from "./effects";
import { nebulaAnimations } from "./nebula";

export const animations = {
  keyframes: {
    ...backgroundAnimations.keyframes,
    ...shapeAnimations.keyframes,
    ...effectAnimations.keyframes,
    ...nebulaAnimations.keyframes,
  },
  animation: {
    ...backgroundAnimations.animation,
    ...shapeAnimations.animation,
    ...effectAnimations.animation,
    ...nebulaAnimations.animation,
  },
};