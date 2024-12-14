import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import TypingRacePage from "@/pages/games/TypingRacePage";
import FlashCardsPage from "@/pages/games/FlashCardsPage";

export default function AppRoutes({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/app"
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
        path="/social"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Social />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <PublicProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EditProfile />
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
        path="/games/speed-learning"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SpeedLearningPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/games/typing-race"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <TypingRacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/games/flash-cards"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <FlashCardsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}