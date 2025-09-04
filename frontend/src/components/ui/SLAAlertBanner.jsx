import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SLAAlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mock SLA data - in real app this would come from API
  const mockSLAData = [
    {
      id: 1,
      type: 'leave_request',
      title: 'Leave Request Pending',
      description: 'John Smith\'s vacation request requires approval',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      actionUrl: '/leave-management',
    },
    {
      id: 2,
      type: 'asset_request',
      title: 'Asset Request Overdue',
      description: 'Laptop request for Sarah Johnson is 2 days overdue',
      priority: 'critical',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      actionUrl: '/asset-management',
    },
  ];

  useEffect(() => {
    // Simulate SLA monitoring
    const checkSLAStatus = () => {
      const currentRole = localStorage.getItem('userRole');
      
      // Only show alerts for Manager and HR Admin roles
      if (currentRole === 'Manager' || currentRole === 'HR Admin') {
        const overdueAlerts = mockSLAData?.filter(alert => {
          const now = new Date();
          return alert?.dueDate < now || (alert?.dueDate - now) < 4 * 60 * 60 * 1000; // Less than 4 hours
        });
        
        setAlerts(overdueAlerts);
        setIsVisible(overdueAlerts?.length > 0);
      } else {
        setAlerts([]);
        setIsVisible(false);
      }
    };

    checkSLAStatus();
    
    // Check every 5 minutes
    const interval = setInterval(checkSLAStatus, 5 * 60 * 1000);
    
    // Listen for role changes
    const handleRoleChange = () => {
      setTimeout(checkSLAStatus, 100);
    };
    
    window.addEventListener('roleChanged', handleRoleChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('roleChanged', handleRoleChange);
    };
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'high':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'medium':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'Clock';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const formatTimeRemaining = (dueDate) => {
    const now = new Date();
    const diff = dueDate - now;
    
    if (diff < 0) {
      const overdue = Math.abs(diff);
      const days = Math.floor(overdue / (24 * 60 * 60 * 1000));
      const hours = Math.floor((overdue % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      
      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} overdue`;
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''} overdue`;
      }
    } else {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      
      if (hours > 0) {
        return `${hours}h ${minutes}m remaining`;
      } else {
        return `${minutes}m remaining`;
      }
    }
  };

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev?.filter(alert => alert?.id !== alertId));
    if (alerts?.length === 1) {
      setIsVisible(false);
    }
  };

  const handleDismissAll = () => {
    setAlerts([]);
    setIsVisible(false);
  };

  if (!isVisible || alerts?.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-35 animate-slide-in">
      <div className="bg-gradient-to-r from-red-50 to-amber-50 border-b border-red-200 shadow-elevation-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                  <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-900">
                    SLA Alerts ({alerts?.length})
                  </h3>
                  <p className="text-xs text-red-700">
                    {alerts?.length === 1 ? '1 item requires' : `${alerts?.length} items require`} immediate attention
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDismissAll}
                  className="text-red-700 border-red-200 hover:bg-red-100"
                >
                  Dismiss All
                </Button>
              </div>
            </div>

            {/* Alert Items */}
            <div className="mt-3 space-y-2">
              {alerts?.slice(0, 3)?.map((alert) => (
                <div
                  key={alert?.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getPriorityColor(alert?.priority)}`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={getPriorityIcon(alert?.priority)} size={16} />
                    <div>
                      <h4 className="text-sm font-medium">{alert?.title}</h4>
                      <p className="text-xs opacity-80">{alert?.description}</p>
                      <p className="text-xs font-medium mt-1">
                        {formatTimeRemaining(alert?.dueDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.href = alert?.actionUrl}
                      className="text-current hover:bg-black/10"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDismiss(alert?.id)}
                      iconName="X"
                      iconSize={14}
                      className="text-current hover:bg-black/10 h-8 w-8"
                    />
                  </div>
                </div>
              ))}
              
              {alerts?.length > 3 && (
                <div className="text-center py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-700 hover:bg-red-100"
                  >
                    View {alerts?.length - 3} more alerts
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLAAlertBanner;