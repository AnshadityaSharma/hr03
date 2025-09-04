import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 text-center space-y-4">
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs text-slate-600">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="text-xs text-slate-600">Enterprise Grade</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-xs text-slate-600">SOC 2 Compliant</span>
        </div>
      </div>

      {/* Help Links */}
      <div className="flex items-center justify-center space-x-4 text-sm">
        <button className="text-slate-500 hover:text-slate-700 transition-spring">
          Help Center
        </button>
        <span className="text-slate-300">•</span>
        <button className="text-slate-500 hover:text-slate-700 transition-spring">
          Contact Support
        </button>
        <span className="text-slate-300">•</span>
        <button className="text-slate-500 hover:text-slate-700 transition-spring">
          Privacy Policy
        </button>
      </div>

      {/* Copyright */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          © {currentYear} Enterprise HRMS. All rights reserved.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Powered by secure cloud infrastructure
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;