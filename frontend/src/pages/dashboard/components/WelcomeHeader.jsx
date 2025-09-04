import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentRole, setCurrentRole] = useState('Employee');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const role = localStorage.getItem('userRole') || 'Employee';
    setCurrentRole(role);

    const handleRoleChange = (event) => {
      setCurrentRole(event?.detail);
    };

    window.addEventListener('roleChanged', handleRoleChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener('roleChanged', handleRoleChange);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleSpecificMessage = () => {
    switch (currentRole) {
      case 'Manager':
        return 'Ready to review your team\'s requests and manage approvals.';
      case 'HR Admin':
        return 'Your comprehensive HR management dashboard is ready.';
      default:
        return 'Welcome to your personal HR portal.';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-elevation-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {getGreeting()}, John Doe
          </h1>
          <p className="text-slate-600 mb-1">{getRoleSpecificMessage()}</p>
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">Current Role</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-sm text-slate-600">{currentRole}</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl shadow-elevation-1 flex items-center justify-center">
            <Icon name="User" size={24} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;