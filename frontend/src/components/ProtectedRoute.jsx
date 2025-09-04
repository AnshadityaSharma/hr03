import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRoles } from '../lib/types';

const ProtectedRoute = ({ children, requiredRole = UserRoles.EMPLOYEE }) => {
  const { isAuthenticated, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(requiredRole)) {
    // Check if user has a higher role that can access this page
    const { user } = useAuth();
    const userRole = user?.role;
    const canAccess = (
      (requiredRole === UserRoles.EMPLOYEE && (userRole === UserRoles.EMPLOYEE || userRole === UserRoles.HR_MANAGER || userRole === UserRoles.ADMIN)) ||
      (requiredRole === UserRoles.HR_MANAGER && (userRole === UserRoles.HR_MANAGER || userRole === UserRoles.ADMIN)) ||
      (requiredRole === UserRoles.ADMIN && userRole === UserRoles.ADMIN)
    );
    
    if (!canAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;

