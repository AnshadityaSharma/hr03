import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  iconColor = 'var(--color-primary)', 
  route, 
  pendingCount = 0, 
  status = 'active',
  actionText = 'View Details'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 border-amber-200';
      case 'overdue':
        return 'bg-red-50 border-red-200';
      case 'completed':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-white border-slate-200';
    }
  };

  return (
    <div className={`relative p-6 rounded-2xl border shadow-elevation-1 hover:shadow-elevation-2 transition-spring ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-elevation-1">
            <Icon name={icon} size={24} color={iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          </div>
        </div>
        
        {pendingCount > 0 && (
          <div className="flex items-center justify-center w-8 h-8 bg-red-500 text-white text-sm font-medium rounded-full">
            {pendingCount > 99 ? '99+' : pendingCount}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'active' ? 'bg-emerald-500' :
            status === 'pending' ? 'bg-amber-500' :
            status === 'overdue'? 'bg-red-500' : 'bg-slate-400'
          }`} />
          <span className="text-xs font-medium text-slate-600 capitalize">{status}</span>
        </div>
        
        <Link to={route}>
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right" iconSize={14}>
            {actionText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActionCard;