import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActionCard from './components/QuickActionCard';
import MiniAnalyticsCard from './components/MiniAnalyticsCard';
import SLAMonitoringPanel from './components/SLAMonitoringPanel';
import RecentActivityFeed from './components/RecentActivityFeed';

const Dashboard = () => {
  const [currentRole, setCurrentRole] = useState('Employee');

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'Employee';
    setCurrentRole(role);

    const handleRoleChange = (event) => {
      setCurrentRole(event?.detail);
    };

    window.addEventListener('roleChanged', handleRoleChange);

    return () => {
      window.removeEventListener('roleChanged', handleRoleChange);
    };
  }, []);

  // Role-based quick actions
  const getQuickActions = () => {
    const baseActions = [
      {
        title: 'Leave Management',
        description: 'Request time off and check balances',
        icon: 'Calendar',
        iconColor: 'var(--color-primary)',
        route: '/leave-management',
        pendingCount: currentRole === 'Employee' ? 1 : currentRole === 'Manager' ? 3 : 5,
        status: 'active',
        actionText: 'Manage Leaves'
      },
      {
        title: 'Asset Management',
        description: 'Request and track company assets',
        icon: 'Package',
        iconColor: 'var(--color-accent)',
        route: '/asset-management',
        pendingCount: currentRole === 'Employee' ? 0 : currentRole === 'Manager' ? 2 : 4,
        status: 'active',
        actionText: 'View Assets'
      },
      {
        title: 'Policy Center',
        description: 'Access company policies and procedures',
        icon: 'FileText',
        iconColor: 'var(--color-secondary)',
        route: '/policy-center',
        pendingCount: 0,
        status: 'active',
        actionText: 'Browse Policies'
      }
    ];

    if (currentRole === 'Employee') {
      baseActions?.push({
        title: 'Onboarding Tasks',
        description: 'Complete your onboarding checklist',
        icon: 'CheckSquare',
        iconColor: 'var(--color-success)',
        route: '/onboarding-tasks',
        pendingCount: 2,
        status: 'pending',
        actionText: 'View Tasks'
      });
    } else {
      baseActions?.push({
        title: 'Team Onboarding',
        description: 'Monitor team onboarding progress',
        icon: 'Users',
        iconColor: 'var(--color-success)',
        route: '/onboarding-tasks',
        pendingCount: currentRole === 'Manager' ? 1 : 3,
        status: 'active',
        actionText: 'Monitor Progress'
      });
    }

    return baseActions;
  };

  // Role-based analytics data
  const getAnalyticsData = () => {
    const commonChartData = [
      { name: 'Jan', value: 12 },
      { name: 'Feb', value: 19 },
      { name: 'Mar', value: 15 },
      { name: 'Apr', value: 22 },
      { name: 'May', value: 18 },
      { name: 'Jun', value: 25 }
    ];

    switch (currentRole) {
      case 'Manager':
        return [
          {
            title: 'Team Leave Balance',
            value: '156',
            change: '+12%',
            changeType: 'positive',
            icon: 'Calendar',
            chartData: commonChartData,
            chartType: 'line',
            suffix: ' days',
            description: 'Total available leave days across team'
          },
          {
            title: 'Pending Approvals',
            value: '8',
            change: '+3',
            changeType: 'negative',
            icon: 'Clock',
            chartData: [
              { name: 'Mon', value: 2 },
              { name: 'Tue', value: 4 },
              { name: 'Wed', value: 1 },
              { name: 'Thu', value: 6 },
              { name: 'Fri', value: 8 }
            ],
            chartType: 'bar',
            description: 'Requests awaiting your approval'
          },
          {
            title: 'Team Assets',
            value: '24',
            change: '+2',
            changeType: 'positive',
            icon: 'Package',
            chartData: commonChartData,
            chartType: 'line',
            description: 'Assets assigned to team members'
          }
        ];
      
      case 'HR Admin':
        return [
          {
            title: 'Total Employees',
            value: '247',
            change: '+5',
            changeType: 'positive',
            icon: 'Users',
            chartData: commonChartData,
            chartType: 'line',
            description: 'Active employees in the system'
          },
          {
            title: 'Policy Views',
            value: '1,234',
            change: '+18%',
            changeType: 'positive',
            icon: 'Eye',
            chartData: [
              { name: 'Week 1', value: 200 },
              { name: 'Week 2', value: 280 },
              { name: 'Week 3', value: 320 },
              { name: 'Week 4', value: 434 }
            ],
            chartType: 'bar',
            description: 'Policy document views this month'
          },
          {
            title: 'SLA Compliance',
            value: '94',
            change: '+2%',
            changeType: 'positive',
            icon: 'Shield',
            chartData: commonChartData,
            chartType: 'line',
            suffix: '%',
            description: 'Tasks completed within SLA timeframes'
          }
        ];
      
      default: // Employee
        return [
          {
            title: 'Leave Balance',
            value: '18',
            change: '-2',
            changeType: 'neutral',
            icon: 'Calendar',
            chartData: [
              { name: 'Q1', value: 22 },
              { name: 'Q2', value: 20 },
              { name: 'Q3', value: 18 },
              { name: 'Q4', value: 18 }
            ],
            chartType: 'line',
            suffix: ' days',
            description: 'Remaining annual leave days'
          },
          {
            title: 'My Assets',
            value: '3',
            change: '0',
            changeType: 'neutral',
            icon: 'Package',
            chartData: [
              { name: 'Laptop', value: 1 },
              { name: 'Monitor', value: 1 },
              { name: 'Phone', value: 1 }
            ],
            chartType: 'bar',
            description: 'Assets currently assigned to you'
          },
          {
            title: 'Tasks Completed',
            value: '12',
            change: '+4',
            changeType: 'positive',
            icon: 'CheckCircle',
            chartData: commonChartData,
            chartType: 'line',
            suffix: '/15',
            description: 'Onboarding tasks completion progress'
          }
        ];
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Enterprise HRMS Portal</title>
        <meta name="description" content="Your comprehensive HR management dashboard with role-based access to leave management, asset tracking, policy center, and onboarding tasks." />
      </Helmet>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <SLAAlertBanner />
        
        <main className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Welcome Header */}
            <div className="mb-8">
              <WelcomeHeader />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Quick Actions & Analytics */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Actions */}
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getQuickActions()?.map((action, index) => (
                      <QuickActionCard
                        key={index}
                        title={action?.title}
                        description={action?.description}
                        icon={action?.icon}
                        iconColor={action?.iconColor}
                        route={action?.route}
                        pendingCount={action?.pendingCount}
                        status={action?.status}
                        actionText={action?.actionText}
                      />
                    ))}
                  </div>
                </section>

                {/* Mini Analytics */}
                <section>
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Analytics Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {getAnalyticsData()?.map((analytics, index) => (
                      <MiniAnalyticsCard
                        key={index}
                        title={analytics?.title}
                        value={analytics?.value}
                        change={analytics?.change}
                        changeType={analytics?.changeType}
                        icon={analytics?.icon}
                        chartData={analytics?.chartData}
                        chartType={analytics?.chartType}
                        suffix={analytics?.suffix}
                        description={analytics?.description}
                      />
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column - SLA Monitoring & Activity Feed */}
              <div className="space-y-8">
                {/* SLA Monitoring */}
                <section>
                  <SLAMonitoringPanel />
                </section>

                {/* Recent Activity */}
                <section>
                  <RecentActivityFeed />
                </section>
              </div>
            </div>
          </div>
        </main>

        <FloatingChatWidget />
      </div>
    </>
  );
};

export default Dashboard;