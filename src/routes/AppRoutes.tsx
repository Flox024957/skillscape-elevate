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
import Messages from "@/pages/Messages";
import Friends from "@/pages/Friends";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
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
      <Route
        path="/social"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Social />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Friends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups/manage"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6">Gestion des groupes</h1>
              {/* TODO: Implement groups management page */}
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/manage"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6">Gestion des événements</h1>
              {/* TODO: Implement events management page */}
            </div>
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
      <Route path="/profile/:userId" element={<PublicProfile />} />
    </Routes>
  );
};