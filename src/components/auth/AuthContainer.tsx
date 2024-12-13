interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className="min-h-screen bg-futuristic-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className="neon-frame">
          {children}
        </div>
      </div>
    </div>
  );
};