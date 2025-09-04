import React from 'react';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const MiniAnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  chartData = [], 
  chartType = 'line',
  suffix = '',
  description = ''
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-emerald-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-slate-600';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const renderChart = () => {
    if (chartData?.length === 0) return null;

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={60}>
          <BarChart data={chartData}>
            <Bar dataKey="value" fill="var(--color-primary)" radius={2} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--color-primary)" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg">
            <Icon name={icon} size={20} color="var(--color-slate-600)" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-600">{title}</h4>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-slate-900">{value}{suffix}</span>
              {change && (
                <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                  <Icon name={getChangeIcon()} size={14} />
                  <span className="text-sm font-medium">{change}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {description && (
        <p className="text-xs text-slate-500 mb-3">{description}</p>
      )}

      <div className="h-15">
        {renderChart()}
      </div>
    </div>
  );
};

export default MiniAnalyticsCard;