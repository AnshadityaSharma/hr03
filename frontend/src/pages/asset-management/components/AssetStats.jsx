import React from 'react';
import Icon from '../../../components/AppIcon';

const AssetStats = () => {
  const stats = [
    {
      id: 'total-assets',
      label: 'Total Assets',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: 'Package',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'active-assignments',
      label: 'Active Assignments',
      value: '8',
      change: '+1',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'pending-requests',
      label: 'Pending Requests',
      value: '3',
      change: '-1',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'bg-amber-100 text-amber-600'
    },
    {
      id: 'return-due',
      label: 'Returns Due',
      value: '1',
      change: '0',
      changeType: 'neutral',
      icon: 'RotateCcw',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase':
        return <Icon name="TrendingUp" size={12} className="text-green-600" />;
      case 'decrease':
        return <Icon name="TrendingDown" size={12} className="text-red-600" />;
      default:
        return <Icon name="Minus" size={12} className="text-slate-400" />;
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-white rounded-2xl shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-spring">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${stat?.color}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stat?.changeType)}`}>
              {getChangeIcon(stat?.changeType)}
              <span className="font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat?.value}</h3>
            <p className="text-sm text-slate-600">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetStats;