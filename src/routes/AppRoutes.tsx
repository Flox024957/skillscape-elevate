import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import MainPage from "@/pages/MainPage";
import Dashboard from "@/pages/Dashboard";
import Social from "@/pages/Social";
import PublicProfile from "@/pages/PublicProfile";
import EditProfile from "@/pages/EditProfile";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import AudioPage from "@/pages/AudioPage";
import ChallengesPage from "@/pages/ChallengesPage";
import SpeedLearningPage from "@/pages/games/SpeedLearningPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainPage />
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
        path="/social"
        element={
          <ProtectedRoute>
            <Social />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <PublicProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
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
      <Route
        path="/games/speed-learning"
        element={
          <ProtectedRoute>
            <SpeedLearningPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}