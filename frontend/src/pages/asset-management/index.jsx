import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { UserRoles } from '../../lib/types';
import { api } from '../../lib/api';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import AssetStats from './components/AssetStats';
import AssetRequestForm from './components/AssetRequestForm';
import AssetInventory from './components/AssetInventory';
import AssetAssignmentsTable from './components/AssetAssignmentsTable';
import AssetGuidelines from './components/AssetGuidelines';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AssetManagement = () => {
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Component mounted
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'request', label: 'New Request', icon: 'Plus' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'assignments', label: 'My Assets', icon: 'Clipboard' },
    { id: 'guidelines', label: 'Guidelines', icon: 'BookOpen' }
  ];

  const handleAssetRequest = async (requestData) => {
    try {
      const response = await api('/api/assets/request', {
        method: 'POST',
        body: JSON.stringify({
          user_email: user.email,
          category: requestData.category,
          asset_name: requestData.assetName
        })
      });
      
      console.log('Asset request response:', response);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      setActiveTab('assignments');
    } catch (error) {
      alert(`Failed to submit asset request: ${error.message}`);
    }
  };

  const handleInventoryRequest = (inventoryData) => {
    setActiveTab('request');
    // Pre-fill form data would be handled here in a real app
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <AssetStats />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <AssetInventory onRequestAsset={handleInventoryRequest} />
              <div className="space-y-6">
                <AssetRequestForm onSubmit={handleAssetRequest} />
              </div>
            </div>
            
            <AssetAssignmentsTable />
          </div>
        );
      case 'request':
        return <AssetRequestForm onSubmit={handleAssetRequest} />;
      case 'inventory':
        return <AssetInventory onRequestAsset={handleInventoryRequest} />;
      case 'assignments':
        return <AssetAssignmentsTable />;
      case 'guidelines':
        return <AssetGuidelines />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Asset Management - Enterprise HRMS</title>
        <meta name="description" content="Manage asset requests, track assignments, and view inventory in the Enterprise HRMS system" />
      </Helmet>
      <Header />
      <SLAAlertBanner />
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 animate-slide-in">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-elevation-2 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full flex-shrink-0">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">Request Submitted!</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your asset request has been submitted successfully. You'll receive updates via email.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSuccessMessage(false)}
                iconName="X"
                iconSize={14}
                className="text-green-600 hover:bg-green-100 h-6 w-6 flex-shrink-0"
              />
            </div>
          </div>
        </div>
      )}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-2xl">
                <Icon name="Package" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Asset Management</h1>
                <p className="text-slate-600 mt-1">
                  Request, track, and manage your workplace assets and equipment
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-sm text-slate-600">
                <Icon name="User" size={16} />
                <span>Role: {user?.role}</span>
              </div>
              
              {hasRole(UserRoles.HR_MANAGER) && (
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => console.log('Export data')}
                >
                  Export Data
                </Button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-spring border-b-2 ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>
      <FloatingChatWidget />
    </div>
  );
};

export default AssetManagement;