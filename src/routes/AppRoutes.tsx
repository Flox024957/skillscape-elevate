import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LoadingScreen from "@/components/LoadingScreen";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ChallengesPage = lazy(() => import("@/pages/ChallengesPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const SpeedLearningPage = lazy(() => import("@/pages/games/SpeedLearningPage"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Suspense fallback={<LoadingScreen />}><LoginPage /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<LoadingScreen />}><RegisterPage /></Suspense>} />
      
      <Route element={<Layout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <HomePage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <DashboardPage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ProfilePage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/challenges" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ChallengesPage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <LeaderboardPage />
            </Suspense>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <SettingsPage />
            </Suspense>
          </ProtectedRoute>
        } />

        <Route path="/games/speed-learning" element={
          <ProtectedRoute>
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