import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import MainPage from "@/pages/MainPage";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import Auth from "@/pages/Auth";
import AudioPage from "@/pages/AudioPage";
import ChallengesPage from "@/pages/ChallengesPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <AnimatePresence>
      <Routes>
        <Route 
          path="/auth" 
          element={isAuthenticated ? <Navigate to="/main" /> : <Auth />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/main" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/category/:id" 
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/skill/:id" 
          element={
            <ProtectedRoute>
              <SkillDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/audio" 
          element={
            <ProtectedRoute>
              <AudioPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/challenges" 
          element={
            <ProtectedRoute>
              <ChallengesPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;