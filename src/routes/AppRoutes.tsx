import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";

// Lazy loaded components
const Auth = lazy(() => import("@/pages/Auth"));
const MainPage = lazy(() => import("@/pages/MainPage"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const SkillDetailPage = lazy(() => import("@/pages/SkillDetailPage"));
const AudioPage = lazy(() => import("@/pages/AudioPage"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const PublicProfile = lazy(() => import("@/pages/PublicProfile"));

export const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/skills/:id" element={<SkillDetailPage />} />
          <Route path="/audio" element={<AudioPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<PublicProfile />} />
        </Routes>
      </Suspense>
    </>
  );
};