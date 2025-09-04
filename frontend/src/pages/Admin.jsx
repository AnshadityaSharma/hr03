import React, { useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

// Import the AdminHRIS component you created
import AdminHRIS from './AdminHRIS';

const AdminPage = () => {
  const { user } = useAuth();
  const [isRunningSla, setIsRunningSla] = useState(false);
  const [slaMessage, setSlaMessage] = useState('');
  const [slaError, setSlaError] = useState('');

  const runSlaCheck = async () => {
    setIsRunningSla(true);
    setSlaMessage('');
    setSlaError('');
    
    try {
      await api('/admin/run-sla', { method: 'POST' });
      setSlaMessage('SLA check completed successfully. Any escalations have been triggered.');
    } catch (error) {
      setSlaError(`SLA check failed: ${error.message}`);
    } finally {
      setIsRunningSla(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}. Manage system-wide settings and monitor performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SLA Monitoring */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                SLA Monitoring
              </h2>
              <Icon name="Clock" size={20} className="text-blue-600" />
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Monitor and trigger SLA escalations for pending requests and approvals.
            </p>
            
            <Button
              onClick={runSlaCheck}
              loading={isRunningSla}
              disabled={isRunningSla}
              className="w-full"
            >
              {isRunningSla ? 'Running SLA Check...' : 'Run SLA Check Now'}
            </Button>
            
            {slaMessage && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-400">{slaMessage}</p>
              </div>
            )}
            
            {slaError && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">{slaError}</p>
              </div>
            )}
          </div>

          {/* System Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                System Overview
              </h2>
              <Icon name="BarChart3" size={20} className="text-blue-600" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                <span className="font-semibold text-gray-900 dark:text-white">247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Pending Approvals</span>
                <span className="font-semibold text-yellow-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">System Health</span>
                <span className="font-semibold text-green-600">Excellent</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
              <Icon name="Zap" size={20} className="text-blue-600" />
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Users" size={16} className="mr-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Settings" size={16} className="mr-2" />
                System Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="FileText" size={16} className="mr-2" />
                View Logs
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Icon name="Activity" size={20} className="text-blue-600" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  SLA check completed - 2 minutes ago
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  New user registered - 15 minutes ago
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Leave request pending approval - 1 hour ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HRIS Admin section (full width) */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                HRIS Integration (Mock)
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sync demo HRIS data or upload CSV
              </div>
            </div>

            {/* Render the AdminHRIS component here */}
            <AdminHRIS />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
