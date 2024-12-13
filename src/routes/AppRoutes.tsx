import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Social from "@/pages/Social";
import EditProfile from "@/pages/EditProfile";
import PublicProfile from "@/pages/PublicProfile";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import AudioPage from "@/pages/AudioPage";
import ChallengesPage from "@/pages/ChallengesPage";
import MainPage from "@/pages/MainPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
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
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/profile/:userId" element={<PublicProfile />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/skill/:skillId" element={<SkillDetailPage />} />
    </Routes>
  );
};