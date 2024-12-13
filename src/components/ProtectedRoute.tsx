import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Always render children without any auth checks
  return <>{children}</>;
};