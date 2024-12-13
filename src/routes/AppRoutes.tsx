import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Auth from "@/pages/Auth";
import MainPage from "@/pages/MainPage";
import Dashboard from "@/pages/Dashboard";
import CategoryPage from "@/pages/CategoryPage";
import SkillDetailPage from "@/pages/SkillDetailPage";
import AudioPage from "@/pages/AudioPage";
import Social from "@/pages/Social";
import PublicProfile from "@/pages/PublicProfile";
import EditProfile from "@/pages/EditProfile";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
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
        path="/category/:categoryId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CategoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/skill/:skillId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SkillDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audio/:skillId"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AudioPage />
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
        path="/edit-profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EditProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export { AppRoutes };