import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Requests',
      value: stats?.totalRequests,
      icon: 'FileText',
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Approval',
      value: stats?.pendingRequests,
      icon: 'Clock',
      color: 'bg-amber-100 text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Approved This Month',
      value: stats?.approvedThisMonth,
      icon: 'CheckCircle',
      color: 'bg-emerald-100 text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Days Off Taken',
      value: stats?.daysTaken,
      icon: 'Calendar',
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards?.map((card, index) => (
        <div key={index} className={`${card?.bgColor} rounded-2xl p-6 border border-slate-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">{card?.title}</p>
              <p className="text-3xl font-bold text-slate-900">{card?.value}</p>
            </div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card?.color}`}>
              <Icon name={card?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;