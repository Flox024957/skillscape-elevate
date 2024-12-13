import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MainPage from "@/pages/MainPage";
import Dashboard from "@/pages/Dashboard";
import Auth from "@/pages/Auth";
import AudioPage from "@/pages/AudioPage";
import ChallengesPage from "@/pages/ChallengesPage";
import Social from "@/pages/Social";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import PublicProfile from "@/pages/PublicProfile";
import Index from "@/pages/Index";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route
            path="/main"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audio"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChallengesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Social />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PublicProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SkillDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;