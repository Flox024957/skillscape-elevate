export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Temporarily bypass auth checks
  return <>{children}</>;
};