import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MainPage from "@/pages/MainPage";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import PublicProfile from "@/pages/PublicProfile";
import EditProfile from "@/pages/EditProfile";
import Social from "@/pages/Social";
import AudioPage from "@/pages/AudioPage";
import ChallengesPage from "@/pages/ChallengesPage";
import BubblePopPage from "@/pages/games/BubblePopPage";
import FlashCardsPage from "@/pages/games/FlashCardsPage";
import KnowledgeRacePage from "@/pages/games/KnowledgeRacePage";
import MindMapPage from "@/pages/games/MindMapPage";
import SkillBuilderPage from "@/pages/games/SkillBuilderPage";
import SkillChainPage from "@/pages/games/SkillChainPage";
import SpeedLearningPage from "@/pages/games/SpeedLearningPage";
import TeamChallengePage from "@/pages/games/TeamChallengePage";
import TypingRacePage from "@/pages/games/TypingRacePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/skill/:id" element={<SkillDetailPage />} />
      <Route path="/profile/:id" element={<PublicProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/social" element={<Social />} />
      <Route path="/audio" element={<AudioPage />} />
      
      {/* Routes des jeux */}
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/games/bubble-pop" element={<BubblePopPage />} />
      <Route path="/games/flash-cards" element={<FlashCardsPage />} />
      <Route path="/games/knowledge-race" element={<KnowledgeRacePage />} />
      <Route path="/games/mind-map" element={<MindMapPage />} />
      <Route path="/games/skill-builder" element={<SkillBuilderPage />} />
      <Route path="/games/skill-chain" element={<SkillChainPage />} />
      <Route path="/games/speed-learning" element={<SpeedLearningPage />} />
      <Route path="/games/team-challenge" element={<TeamChallengePage />} />
      <Route path="/games/typing-race" element={<TypingRacePage />} />
    </Routes>
  );
};

export default AppRoutes;