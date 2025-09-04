import React, { useState } from 'react';
import Icon from '../AppIcon';

const UserProfileMenu = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock user data - in real app this would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: null,
    initials: 'JD'
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const menuItems = [
    { label: 'Profile Settings', icon: 'Settings', action: () => console.log('Profile Settings') },
    { label: 'Preferences', icon: 'Sliders', action: () => console.log('Preferences') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-spring"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.avatar ? (
            <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            user?.initials
          )}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-slate-700">{user?.name}</p>
        </div>
        <Icon name="ChevronDown" size={14} className="hidden lg:block text-slate-500" />
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-elevation-3 border border-slate-200 py-1 z-50 animate-fade-in">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user?.initials
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item?.action();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-spring flex items-center space-x-3"
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="border-t border-slate-100 py-1">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-spring flex items-center space-x-3"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileMenu;