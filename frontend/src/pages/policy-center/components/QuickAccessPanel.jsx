import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessPanel = ({ onPolicySelect }) => {
  const [activeTab, setActiveTab] = useState('frequent');

  const frequentPolicies = [
    {
      id: 'remote-work',
      title: 'Remote Work Policy',
      category: 'hr-policies',
      icon: 'Home',
      lastAccessed: '2 hours ago',
      isBookmarked: true
    },
    {
      id: 'expense-policy',
      title: 'Expense Reimbursement',
      category: 'finance',
      icon: 'CreditCard',
      lastAccessed: '1 day ago',
      isBookmarked: false
    },
    {
      id: 'pto-policy',
      title: 'Paid Time Off Guidelines',
      category: 'hr-policies',
      icon: 'Calendar',
      lastAccessed: '3 days ago',
      isBookmarked: true
    },
    {
      id: 'security-policy',
      title: 'Data Security Guidelines',
      category: 'it-security',
      icon: 'Shield',
      lastAccessed: '1 week ago',
      isBookmarked: false
    }
  ];

  const recentPolicies = [
    {
      id: 'dress-code',
      title: 'Dress Code Policy',
      category: 'hr-policies',
      icon: 'User',
      viewedAt: '1 hour ago',
      isNew: false
    },
    {
      id: 'harassment-policy',
      title: 'Anti-Harassment Policy',
      category: 'code-of-conduct',
      icon: 'Shield',
      viewedAt: '4 hours ago',
      isNew: false
    },
    {
      id: 'equipment-policy',
      title: 'Equipment Usage Policy',
      category: 'it-security',
      icon: 'Laptop',
      viewedAt: '2 days ago',
      isNew: true
    }
  ];

  const categoryGroups = [
    {
      name: 'HR Policies',
      icon: 'Users',
      count: 24,
      color: 'bg-blue-100 text-blue-800',
      policies: ['Remote Work', 'PTO Guidelines', 'Performance Reviews']
    },
    {
      name: 'IT Security',
      icon: 'Shield',
      count: 18,
      color: 'bg-red-100 text-red-800',
      policies: ['Data Protection', 'Password Policy', 'Device Security']
    },
    {
      name: 'Compliance',
      icon: 'CheckCircle',
      count: 12,
      color: 'bg-green-100 text-green-800',
      policies: ['GDPR Guidelines', 'SOX Compliance', 'Audit Procedures']
    },
    {
      name: 'Benefits',
      icon: 'Heart',
      count: 15,
      color: 'bg-purple-100 text-purple-800',
      policies: ['Health Insurance', '401k Plan', 'Wellness Program']
    }
  ];

  const tabs = [
    { id: 'frequent', label: 'Frequently Accessed', icon: 'Star' },
    { id: 'recent', label: 'Recently Viewed', icon: 'Clock' },
    { id: 'categories', label: 'Browse Categories', icon: 'Grid3X3' }
  ];

  const handlePolicyClick = (policy) => {
    onPolicySelect(policy);
  };

  const toggleBookmark = (policyId) => {
    // In real app, this would update the backend
    console.log('Toggle bookmark for:', policyId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Access</h2>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-spring flex-1 justify-center ${
                activeTab === tab?.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden lg:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'frequent' && (
          <div className="space-y-3">
            {frequentPolicies?.map((policy) => (
              <div
                key={policy?.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-spring cursor-pointer"
                onClick={() => handlePolicyClick(policy)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={policy?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{policy?.title}</h4>
                    <p className="text-xs text-slate-500">Last accessed {policy?.lastAccessed}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    toggleBookmark(policy?.id);
                  }}
                  iconName={policy?.isBookmarked ? "Bookmark" : "BookmarkPlus"}
                  iconSize={14}
                  className={`h-8 w-8 ${policy?.isBookmarked ? 'text-primary' : 'text-slate-400'}`}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="space-y-3">
            {recentPolicies?.map((policy) => (
              <div
                key={policy?.id}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-spring cursor-pointer"
                onClick={() => handlePolicyClick(policy)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Icon name={policy?.icon} size={16} className="text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-slate-900">{policy?.title}</h4>
                      {policy?.isNew && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">Viewed {policy?.viewedAt}</p>
                  </div>
                </div>
                <Icon name="ChevronRight" size={14} className="text-slate-400" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-3">
            {categoryGroups?.map((category) => (
              <div
                key={category?.name}
                className="p-4 rounded-lg border border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-spring cursor-pointer"
                onClick={() => onPolicySelect({ category: category?.name?.toLowerCase()?.replace(' ', '-') })}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon name={category?.icon} size={20} className="text-slate-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-900">{category?.name}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${category?.color}`}>
                        {category?.count} policies
                      </span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-slate-400" />
                </div>
                
                <div className="space-y-1">
                  {category?.policies?.map((policy, index) => (
                    <div key={index} className="text-xs text-slate-600 flex items-center space-x-2">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={14}
            className="w-full justify-start"
          >
            Submit Policy Query
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="w-full justify-start"
          >
            Download Policy Pack
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessPanel;