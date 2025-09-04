import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RoleSwitcher = ({ className = '' }) => {
  const [currentRole, setCurrentRole] = useState('Employee');
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { value: 'Employee', label: 'Employee', icon: 'User' },
    { value: 'Manager', label: 'Manager', icon: 'Users' },
    { value: 'HR Admin', label: 'HR Admin', icon: 'Shield' },
  ];

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole && roles?.find(role => role?.value === savedRole)) {
      setCurrentRole(savedRole);
    }
  }, []);

  const handleRoleChange = (roleValue) => {
    setCurrentRole(roleValue);
    localStorage.setItem('userRole', roleValue);
    setIsOpen(false);
    
    // Trigger role change event for other components
    window.dispatchEvent(new CustomEvent('roleChanged', { detail: roleValue }));
  };

  const currentRoleData = roles?.find(role => role?.value === currentRole);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="ChevronDown"
        iconPosition="right"
        iconSize={14}
        className="min-w-[120px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentRoleData?.icon} size={14} />
          <span>{currentRole}</span>
        </div>
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-elevation-3 border border-slate-200 py-1 z-50 animate-fade-in">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Switch Role
              </p>
            </div>
            {roles?.map((role) => (
              <button
                key={role?.value}
                onClick={() => handleRoleChange(role?.value)}
                className={`w-full text-left px-3 py-2 text-sm transition-spring flex items-center space-x-2 ${
                  currentRole === role?.value
                    ? 'bg-primary text-white' :'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon name={role?.icon} size={14} />
                <span>{role?.label}</span>
                {currentRole === role?.value && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoleSwitcher;