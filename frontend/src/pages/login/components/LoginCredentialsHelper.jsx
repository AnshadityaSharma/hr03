import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginCredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoCredentials = [
    {
      role: 'Employee',
      email: 'employee@company.com',
      password: 'DemoEmp2024!',
      description: 'Access employee dashboard with basic HR functions'
    },
    {
      role: 'HR Manager',
      email: 'hr@company.com',
      password: 'DemoHR2024!',
      description: 'Access HR manager dashboard with team oversight capabilities'
    },
    {
      role: 'Admin',
      email: 'admin@company.com',
      password: 'DemoAdmin2024!',
      description: 'Full administrative access to all HR functions'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      const event = new CustomEvent('showToast', {
        detail: {
          type: 'success',
          message: 'Copied to clipboard!'
        }
      });
      window.dispatchEvent(event);
    });
  };

  return (
    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Demo Credentials</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={14}
        >
          {isExpanded ? 'Hide' : 'Show'}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {demoCredentials?.map((cred, index) => (
            <div key={index} className="p-3 bg-white rounded-lg border border-slate-200 dark:bg-slate-700 dark:border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">{cred?.role}</h4>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(cred?.email)}
                    iconName="Copy"
                    iconSize={12}
                    className="h-6 w-6"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-16">Email:</span>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono dark:bg-slate-600 dark:text-slate-200">
                    {cred?.email}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 w-16">Password:</span>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono dark:bg-slate-600 dark:text-slate-200">
                    {cred?.password}
                  </code>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{cred?.description}</p>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={14} color="var(--color-primary)" className="mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Security Note</p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  These are demo credentials for testing purposes only. In production, use your actual company credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginCredentialsHelper;