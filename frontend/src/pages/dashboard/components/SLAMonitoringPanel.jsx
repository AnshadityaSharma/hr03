import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SLAMonitoringPanel = () => {
  const [slaItems, setSlaItems] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock SLA data based on user role
  const mockSLAData = {
    'Employee': [
      {
        id: 1,
        type: 'leave_request',
        title: 'Leave Request Pending',
        description: 'Your vacation request is awaiting manager approval',
        priority: 'medium',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        actionUrl: '/leave-management'
      }
    ],
    'Manager': [
      {
        id: 1,
        type: 'leave_approval',
        title: 'Leave Approvals Required',
        description: '3 team members awaiting leave approval',
        priority: 'high',
        dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        actionUrl: '/leave-management'
      },
      {
        id: 2,
        type: 'asset_request',
        title: 'Asset Request Review',
        description: 'New laptop request from Sarah Johnson',
        priority: 'medium',
        dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
        actionUrl: '/asset-management'
      }
    ],
    'HR Admin': [
      {
        id: 1,
        type: 'onboarding_overdue',
        title: 'Onboarding Tasks Overdue',
        description: '2 new hires have incomplete onboarding',
        priority: 'critical',
        dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actionUrl: '/onboarding-tasks'
      },
      {
        id: 2,
        type: 'policy_review',
        title: 'Policy Review Required',
        description: 'Quarterly policy updates need approval',
        priority: 'high',
        dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
        actionUrl: '/policy-center'
      }
    ]
  };

  useEffect(() => {
    const fetchSLAData = () => {
      const currentRole = localStorage.getItem('userRole') || 'Employee';
      const roleData = mockSLAData?.[currentRole] || [];
      setSlaItems(roleData);
      setLastUpdated(new Date());
    };

    fetchSLAData();
    
    // Poll every 60 seconds
    const interval = setInterval(fetchSLAData, 60000);
    
    // Listen for role changes
    const handleRoleChange = () => {
      setTimeout(fetchSLAData, 100);
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
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
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
      const hours = Math.floor(overdue / (60 * 60 * 1000));
      return `${hours}h overdue`;
    } else {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours}h remaining`;
    }
  };

  if (slaItems?.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">SLA Monitoring</h3>
          <div className="flex items-center space-x-2 text-emerald-600">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">All Clear</span>
          </div>
        </div>
        <div className="text-center py-8">
          <Icon name="Shield" size={48} color="var(--color-emerald-500)" className="mx-auto mb-3" />
          <p className="text-slate-600">No pending SLA items</p>
          <p className="text-sm text-slate-500 mt-1">All tasks are within acceptable timeframes</p>
        </div>
        <div className="text-xs text-slate-400 text-center mt-4">
          Last updated: {lastUpdated?.toLocaleTimeString()}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">SLA Monitoring</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-red-600">{slaItems?.length} Alert{slaItems?.length > 1 ? 's' : ''}</span>
        </div>
      </div>
      <div className="space-y-3">
        {slaItems?.map((item) => (
          <div key={item?.id} className={`p-4 rounded-xl border ${getPriorityColor(item?.priority)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon name={getPriorityIcon(item?.priority)} size={16} />
                <div>
                  <h4 className="text-sm font-medium">{item?.title}</h4>
                  <p className="text-xs opacity-80 mt-1">{item?.description}</p>
                  <p className="text-xs font-medium mt-2">
                    {formatTimeRemaining(item?.dueDate)}
                  </p>
                </div>
              </div>
              <Link to={item?.actionUrl}>
                <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14}>
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-400 text-center mt-4">
        Last updated: {lastUpdated?.toLocaleTimeString()} • Auto-refresh: 60s
      </div>
    </div>
  );
};

export default SLAMonitoringPanel;