import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [currentRole, setCurrentRole] = useState('Employee');

  // Mock activity data based on role
  const mockActivities = {
    'Employee': [
      {
        id: 1,
        type: 'leave_submitted',
        title: 'Leave Request Submitted',
        description: 'Annual leave for Dec 25-29, 2024',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: 'Calendar',
        status: 'pending'
      },
      {
        id: 2,
        type: 'asset_assigned',
        title: 'Asset Assigned',
        description: 'MacBook Pro 16" - Asset #LP001',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: 'Package',
        status: 'completed'
      },
      {
        id: 3,
        type: 'policy_viewed',
        title: 'Policy Accessed',
        description: 'Remote Work Policy v2.1',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        icon: 'FileText',
        status: 'info'
      }
    ],
    'Manager': [
      {
        id: 1,
        type: 'leave_approved',
        title: 'Leave Request Approved',
        description: 'Sarah Johnson - Annual leave approved',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        icon: 'CheckCircle',
        status: 'completed'
      },
      {
        id: 2,
        type: 'team_update',
        title: 'Team Status Update',
        description: '5 pending approvals require attention',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: 'Users',
        status: 'pending'
      },
      {
        id: 3,
        type: 'asset_approved',
        title: 'Asset Request Approved',
        description: 'New laptop for Michael Chen',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        icon: 'Package',
        status: 'completed'
      }
    ],
    'HR Admin': [
      {
        id: 1,
        type: 'policy_updated',
        title: 'Policy Updated',
        description: 'Employee Handbook v3.2 published',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        icon: 'FileText',
        status: 'completed'
      },
      {
        id: 2,
        type: 'onboarding_completed',
        title: 'Onboarding Completed',
        description: 'Alex Rodriguez - All tasks completed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: 'CheckSquare',
        status: 'completed'
      },
      {
        id: 3,
        type: 'sla_alert',
        title: 'SLA Alert Triggered',
        description: '2 overdue onboarding tasks detected',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        icon: 'AlertTriangle',
        status: 'warning'
      }
    ]
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'Employee';
    setCurrentRole(role);
    setActivities(mockActivities?.[role] || []);

    const handleRoleChange = (event) => {
      const newRole = event?.detail;
      setCurrentRole(newRole);
      setActivities(mockActivities?.[newRole] || []);
    };

    window.addEventListener('roleChanged', handleRoleChange);

    return () => {
      window.removeEventListener('roleChanged', handleRoleChange);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'warning':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        <div className="flex items-center space-x-2 text-slate-500">
          <Icon name="Activity" size={16} />
          <span className="text-sm">Live Feed</span>
        </div>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-spring">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getStatusColor(activity?.status)}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900">{activity?.title}</h4>
              <p className="text-sm text-slate-600 mt-1">{activity?.description}</p>
              <p className="text-xs text-slate-500 mt-2">{formatTimeAgo(activity?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} color="var(--color-slate-400)" className="mx-auto mb-3" />
          <p className="text-slate-600">No recent activity</p>
          <p className="text-sm text-slate-500 mt-1">Your activity will appear here</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;