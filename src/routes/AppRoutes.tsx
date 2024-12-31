import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MainPage from "@/pages/MainPage";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import AudioPage from "@/pages/AudioPage";
import CategoryPage from "@/pages/CategoryPage";
import Index from "@/pages/Index";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Index />} />
      
      {/* Route d'authentification */}
      <Route path="/auth" element={
        isAuthenticated ? <Navigate to="/main" replace /> : <Auth />
      } />

      {/* Routes protégées */}
      <Route path="/main" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <MainPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/audio" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <AudioPage />
        </ProtectedRoute>
      } />
      
      <Route path="/category/:id" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <CategoryPage />
        </ProtectedRoute>
      } />

      {/* Fallback pour les routes non trouvées */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};