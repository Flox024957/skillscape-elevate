import { CosmicEffects } from "./CosmicEffects";
import { GridOverlay } from "./GridOverlay";
import { GeometricShapes } from "./GeometricShapes";
import { EnergyOrbs } from "./EnergyOrbs";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
      <CosmicEffects />
      <GridOverlay />
      <GeometricShapes />
      <EnergyOrbs />
    </div>
  );
};