import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoles } from '../lib/types';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app this would come from backend
  const mockUsers = {
    'admin@company.com': {
      email: 'admin@company.com',
      name: 'Admin User',
      role: UserRoles.ADMIN,
      password: 'admin123'
    },
    'hr@company.com': {
      email: 'hr@company.com',
      name: 'HR Manager',
      role: UserRoles.HR_MANAGER,
      password: 'hr123'
    },
    'employee@company.com': {
      email: 'employee@company.com',
      name: 'John Employee',
      role: UserRoles.EMPLOYEE,
      password: 'emp123'
    }
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('hrms-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('hrms-user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const userData = mockUsers[email];
    if (userData && userData.password === password) {
      const { password: _, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('hrms-user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hrms-user');
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      [UserRoles.EMPLOYEE]: 1,
      [UserRoles.HR_MANAGER]: 2,
      [UserRoles.ADMIN]: 3
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
