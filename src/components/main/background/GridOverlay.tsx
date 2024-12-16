export const GridOverlay = () => {
  return (
    <>
      {/* Star Field Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] 
                    bg-[length:20px_20px] opacity-50" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(139,92,246,0.05)_1px,transparent_1px)] 
                    bg-[size:24px_24px] opacity-30" />
    </>
  );
};