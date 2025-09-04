import React from 'react';
import Icon from '../../../components/AppIcon';

const LeaveBalanceCard = ({ balances }) => {
  const getBalanceColor = (used, total) => {
    const percentage = (used / total) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getProgressColor = (used, total) => {
    const percentage = (used / total) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-xl">
          <Icon name="Calendar" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Leave Balance</h2>
          <p className="text-sm text-slate-600">Current year allocation and usage</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {balances?.map((balance) => (
          <div key={balance?.type} className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-700 capitalize">
                {balance?.type?.replace('_', ' ')}
              </h3>
              <Icon name="Calendar" size={16} color="var(--color-slate-500)" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${getBalanceColor(balance?.used, balance?.total)}`}>
                  {balance?.remaining}
                </span>
                <span className="text-sm text-slate-500">
                  / {balance?.total} days
                </span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(balance?.used, balance?.total)}`}
                  style={{ width: `${Math.min((balance?.used / balance?.total) * 100, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-slate-500">
                <span>Used: {balance?.used}</span>
                <span>Pending: {balance?.pending}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Leave Policy Reminder</h4>
            <p className="text-xs text-blue-800">
              Annual leave expires on December 31st. Maximum carryover is 5 days. 
              Sick leave accumulates monthly and has no expiration date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;