import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginCredentialsHelper from './components/LoginCredentialsHelper';
import LoginFooter from './components/LoginFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (authToken && userRole) {
      navigate('/dashboard');
    }

    // Set page title
    document.title = 'Sign In - Enterprise HRMS';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="glass-effect bg-white/90 backdrop-blur-sm rounded-2xl shadow-elevation-3 border border-white/20 p-8">
          <LoginHeader />
          <LoginForm />
          <LoginCredentialsHelper />
        </div>
        
        <LoginFooter />
      </div>

      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2"></div>
    </div>
  );
};

export default LoginPage;