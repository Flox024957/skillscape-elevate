import { GeometricShapes } from "./GeometricShapes";
import { GridOverlay } from "./GridOverlay";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black">
      <GeometricShapes />
      <GridOverlay />
    </div>
  );
};