import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProtectedRoute from "components/ProtectedRoute";
import LoginPage from './pages/login';
import LeaveManagement from './pages/leave-management';
import Dashboard from './pages/dashboard';
import AssetManagement from './pages/asset-management';
import PolicyCenter from './pages/policy-center';
import OnboardingTasks from './pages/onboarding-tasks';
import AdminPage from './pages/Admin';
import Profile from './pages/profile';
import { UserRoles } from './lib/types';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/leave-management" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <LeaveManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/asset-management" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <AssetManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/policy-center" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <PolicyCenter />
            </ProtectedRoute>
          } />
          
          <Route path="/onboarding-tasks" element={
            <ProtectedRoute requiredRole={UserRoles.HR_MANAGER}>
              <OnboardingTasks />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute requiredRole={UserRoles.EMPLOYEE}>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRole={UserRoles.ADMIN}>
              <AdminPage />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
