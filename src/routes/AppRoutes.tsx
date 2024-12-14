import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import ChallengesPage from "@/pages/ChallengesPage";
import SpeedLearningPage from "@/pages/games/SpeedLearningPage";

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Routes>
      <Route path="/auth" element={
        <Suspense fallback={<LoadingScreen />}>
          <div>Auth Page</div>
        </Suspense>
      } />
      
      <Route element={<Layout />}>
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Suspense fallback={<LoadingScreen />}>
              <div>Home Page</div>
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/challenges" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Suspense fallback={<LoadingScreen />}>
              <ChallengesPage />
            </Suspense>
          </ProtectedRoute>
        } />

        <Route path="/games/speed-learning" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Suspense fallback={<LoadingScreen />}>
              <SpeedLearningPage />
            </Suspense>
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;