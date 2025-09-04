import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ task, onToggleComplete, onViewDetails, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
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

  return (
    <div className={`bg-white rounded-xl border-2 transition-all duration-200 ${
      task?.status === 'completed' 
        ? 'border-green-200 bg-green-50/30' 
        : isOverdue() 
          ? 'border-red-200 bg-red-50/30' :'border-slate-200 hover:border-slate-300'
    }`}>
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <div className="mt-1">
            <Checkbox
              checked={task?.status === 'completed'}
              onChange={(e) => onToggleComplete(task?.id, e?.target?.checked)}
              disabled={userRole === 'Employee' && task?.requiresHRApproval}
            />
          </div>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${
                  task?.status === 'completed' ? 'text-green-700 line-through' : 'text-slate-900'
                }`}>
                  {task?.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{task?.description}</p>
              </div>

              {/* Priority Badge */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
            </div>

            {/* Task Meta Information */}
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-slate-500">
                <Icon name="Calendar" size={14} />
                <span>Due: {formatDate(task?.dueDate)}</span>
                {isOverdue() && (
                  <span className="text-red-600 font-medium">(Overdue)</span>
                )}
              </div>

              <div className="flex items-center space-x-1 text-sm text-slate-500">
                <Icon name="User" size={14} />
                <span>{task?.assignedTo}</span>
              </div>

              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(task?.status)}`}>
                {task?.status?.replace('_', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('_', ' ')?.slice(1)}
              </span>
            </div>

            {/* Category and Estimated Time */}
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1 text-sm text-slate-500">
                <Icon name="Tag" size={14} />
                <span>{task?.category}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-slate-500">
                <Icon name="Clock" size={14} />
                <span>{task?.estimatedTime}</span>
              </div>
            </div>

            {/* Expand/Collapse Button */}
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                iconSize={16}
              >
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="space-y-4">
                  {/* Requirements */}
                  {task?.requirements && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {task?.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="CheckCircle2" size={14} className="mt-0.5 text-slate-400" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resources */}
                  {task?.resources && task?.resources?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Resources:</h4>
                      <div className="space-y-2">
                        {task?.resources?.map((resource, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="ExternalLink" size={14} className="text-blue-500" />
                            <a
                              href={resource?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                              {resource?.title}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  {task?.instructions && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Instructions:</h4>
                      <p className="text-sm text-slate-600">{task?.instructions}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 pt-2">
                    {task?.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(task)}
                        iconName="Eye"
                        iconPosition="left"
                        iconSize={14}
                      >
                        View Full Details
                      </Button>
                    )}
                    
                    {task?.requiresHRApproval && userRole !== 'Employee' && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="CheckCircle"
                        iconPosition="left"
                        iconSize={14}
                      >
                        Approve Completion
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;