import { cosmicAnimations } from "./cosmic";
import { geometricAnimations } from "./geometric";
import { energyAnimations } from "./energy";
import { stellarAnimations } from "./stellar";

export const animations = {
  keyframes: {
    ...cosmicAnimations.keyframes,
    ...geometricAnimations.keyframes,
    ...energyAnimations.keyframes,
    ...stellarAnimations.keyframes,
  },
  animation: {
    ...cosmicAnimations.animation,
    ...geometricAnimations.animation,
    ...energyAnimations.animation,
    ...stellarAnimations.animation,
  },
};