import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onViewDetails, 
  onSelectionChange,
  isSelected = false,
  viewMode = 'list'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    return new Date(task.dueDate) < new Date() && task?.status !== 'completed';
  };

  const handleSelectionChange = (e) => {
    onSelectionChange?.(task.id, e.target.checked);
  };

  const handleToggleComplete = (e) => {
    onToggleComplete?.(task.id, e.target.checked);
  };

  if (viewMode === 'grid') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-xl border-2 transition-all duration-200 ${
        task?.status === 'completed' 
          ? 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20' 
          : isOverdue() 
            ? 'border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/20' 
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}>
        <div className="p-4">
          {/* Selection Checkbox */}
          <div className="flex items-center justify-between mb-3">
            <Checkbox
              checked={isSelected}
              onChange={handleSelectionChange}
              className="mr-2"
            />
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(task?.status)}`}>
              {task?.status?.replace('_', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('_', ' ')?.slice(1)}
            </span>
          </div>

          {/* Task Content */}
          <div className="space-y-3">
            <div>
              <h3 className={`text-lg font-semibold ${
                task?.status === 'completed' ? 'text-green-700 dark:text-green-300 line-through' : 'text-slate-900 dark:text-slate-100'
              }`}>
                {task?.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                {task?.description}
              </p>
            </div>

            {/* Task Meta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
                  {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {task?.estimatedTime}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <Icon name="Calendar" size={12} />
                <span>Due: {formatDate(task?.dueDate)}</span>
                {isOverdue() && (
                  <span className="text-red-600 dark:text-red-400 font-medium">(Overdue)</span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <Icon name="User" size={12} />
                <span>{task?.assignedTo}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                checked={task?.status === 'completed'}
                onChange={handleToggleComplete}
                className="mr-2"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Mark complete</span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails?.(task)}
                className="ml-auto"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view (default)
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border-2 transition-all duration-200 ${
      task?.status === 'completed' 
        ? 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20' 
        : isOverdue() 
          ? 'border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/20' 
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
    }`}>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Selection Checkbox */}
          <div className="mt-1">
            <Checkbox
              checked={isSelected}
              onChange={handleSelectionChange}
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${
                  task?.status === 'completed' ? 'text-green-700 dark:text-green-300 line-through' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {task?.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{task?.description}</p>
              </div>

              {/* Priority Badge */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
            </div>

            {/* Task Meta Information */}
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                <Icon name="Calendar" size={14} />
                <span>Due: {formatDate(task?.dueDate)}</span>
                {isOverdue() && (
                  <span className="text-red-600 dark:text-red-400 font-medium">(Overdue)</span>
                )}
              </div>

              <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                <Icon name="User" size={14} />
                <span>{task?.assignedTo}</span>
              </div>

              <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                <Icon name="Clock" size={14} />
                <span>{task?.estimatedTime}</span>
              </div>

              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(task?.status)}`}>
                {task?.status?.replace('_', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('_', ' ')?.slice(1)}
              </span>
            </div>

            {/* Additional Info */}
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
                <Icon name="Tag" size={14} />
                <span>{task?.category}</span>
              </div>

              {task?.requiresHRApproval && (
                <div className="flex items-center space-x-1 text-sm text-amber-600 dark:text-amber-400">
                  <Icon name="Shield" size={14} />
                  <span>HR Approval Required</span>
                </div>
              )}

              {task?.requiresDigitalSignature && (
                <div className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400">
                  <Icon name="PenTool" size={14} />
                  <span>Digital Signature Required</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={task?.status === 'completed'}
                    onChange={handleToggleComplete}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Mark as complete</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails?.(task)}
                >
                  Show Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;