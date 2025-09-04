import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import LeaveManagement from './pages/leave-management';
import Dashboard from './pages/dashboard';
import AssetManagement from './pages/asset-management';
import PolicyCenter from './pages/policy-center';
import OnboardingTasks from './pages/onboarding-tasks';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AssetManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/asset-management" element={<AssetManagement />} />
        <Route path="/policy-center" element={<PolicyCenter />} />
        <Route path="/onboarding-tasks" element={<OnboardingTasks />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
