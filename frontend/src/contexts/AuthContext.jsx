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
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app this would come from backend
  const mockUsers = {
    'admin@company.com': {
      email: 'admin@company.com',
      name: 'Admin User',
      role: UserRoles.ADMIN,
      password: 'DemoAdmin2024!'
    },
    'hr@company.com': {
      email: 'hr@company.com',
      name: 'HR Manager',
      role: UserRoles.HR_MANAGER,
      password: 'DemoHR2024!'
    },
    'employee@company.com': {
      email: 'employee@company.com',
      name: 'John Employee',
      role: UserRoles.EMPLOYEE,
      password: 'DemoEmp2024!'
    }
  };

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        console.log('Login successful:', data.user);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      } else {
        console.log('Login failed:', data.error);
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const hasRole = (requiredRole) => {
    if (!user) {
      console.log('hasRole: No user found');
      return false;
    }
    const hasAccess = user.role === requiredRole;
    console.log(`hasRole: User role ${user.role} vs required ${requiredRole} = ${hasAccess}`);
    return hasAccess;
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
