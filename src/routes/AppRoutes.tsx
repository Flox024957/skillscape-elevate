import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import AudioPage from "@/pages/AudioPage";
import MainPage from "@/pages/MainPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to="/main" replace />
          ) : (
            <Navigate to="/auth" replace />
          )
        } 
      />
      <Route 
        path="/auth" 
        element={isAuthenticated ? <Navigate to="/main" replace /> : <Auth />} 
      />
      <Route
        path="/main"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/skill/:skillId" element={<SkillDetailPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};