import { GeometricShapes } from "./GeometricShapes";
import { GridOverlay } from "./GridOverlay";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0118] opacity-90" />
      <GeometricShapes />
      <GridOverlay />
    </div>
  );
};