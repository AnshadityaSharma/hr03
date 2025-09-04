import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-elevation-2">
          <Icon name="Users" size={32} color="white" />
        </div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-3xl font-semibold text-slate-900 mb-2">
        Welcome Back
      </h1>
      <p className="text-slate-600 text-lg">
        Sign in to your Enterprise HRMS account
      </p>
      
      {/* Subtitle */}
      <p className="text-sm text-slate-500 mt-4">
        Access your HR dashboard, manage requests, and stay connected with your team
      </p>
    </div>
  );
};

export default LoginHeader;