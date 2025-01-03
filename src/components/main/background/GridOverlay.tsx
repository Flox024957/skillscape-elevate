export const GridOverlay = () => {
  return (
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  );
};