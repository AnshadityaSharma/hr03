import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskDetailsModal = ({ task, isOpen, onClose, onSave, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task || {});
  const [completionNotes, setCompletionNotes] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave({
      ...editedTask,
      completionNotes,
      digitalSignature,
      completedAt: new Date()?.toISOString()
    });
    setIsEditing(false);
    onClose();
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-amber-600 bg-amber-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const isOverdue = () => {
    return new Date(task.dueDate) < new Date() && task?.status !== 'completed';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-slate-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">{task?.title}</h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task?.priority)}`}>
                  {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)} Priority
                </span>
              </div>
              <p className="text-slate-600">{task?.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Task Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Due Date</p>
                  <p className={`text-sm ${isOverdue() ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                    {formatDate(task?.dueDate)}
                    {isOverdue() && ' (Overdue)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="User" size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Assigned To</p>
                  <p className="text-sm text-slate-600">{task?.assignedTo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="Tag" size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Category</p>
                  <p className="text-sm text-slate-600">{task?.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Estimated Time</p>
                  <p className="text-sm text-slate-600">{task?.estimatedTime}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Status</p>
                  <p className={`text-sm font-medium ${
                    task?.status === 'completed' ? 'text-green-600' : 
                    task?.status === 'in_progress'? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {task?.status?.replace('_', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('_', ' ')?.slice(1)}
                  </p>
                </div>
              </div>

              {task?.requiresHRApproval && (
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Approval Required</p>
                    <p className="text-sm text-amber-600">HR approval needed</p>
                  </div>
                </div>
              )}

              {task?.completedAt && (
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle2" size={20} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Completed On</p>
                    <p className="text-sm text-slate-600">{formatDate(task?.completedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          {task?.requirements && task?.requirements?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Requirements</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {task?.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle2" size={16} className="mt-0.5 text-slate-400" />
                      <span className="text-sm text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Instructions */}
          {task?.instructions && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Instructions</h3>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-800">{task?.instructions}</p>
              </div>
            </div>
          )}

          {/* Resources */}
          {task?.resources && task?.resources?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Resources & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {task?.resources?.map((resource, index) => (
                  <a
                    key={index}
                    href={resource?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Icon name="ExternalLink" size={16} className="text-blue-500" />
                    <span className="text-sm text-blue-600 hover:text-blue-800">{resource?.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Completion Section */}
          {task?.status !== 'completed' && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Mark as Complete</h3>
              
              <div className="space-y-4">
                <Input
                  label="Completion Notes"
                  type="text"
                  placeholder="Add any notes about task completion..."
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e?.target?.value)}
                />

                {task?.requiresDigitalSignature && (
                  <Input
                    label="Digital Signature"
                    type="text"
                    placeholder="Type your full name as digital signature"
                    value={digitalSignature}
                    onChange={(e) => setDigitalSignature(e?.target?.value)}
                    required
                  />
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                   
                    onChange={() => {}}
                  />
                  <span className="text-sm text-slate-700">
                    I confirm that I have completed all requirements for this task
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>

            {userRole !== 'Employee' && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                {isEditing ? 'Cancel Edit' : 'Edit Task'}
              </Button>
            )}

            {task?.status !== 'completed' && (
              <Button
                variant="default"
                onClick={handleSave}
                iconName="CheckCircle"
                iconPosition="left"
                iconSize={16}
                disabled={task?.requiresDigitalSignature && !digitalSignature}
              >
                Mark Complete
              </Button>
            )}

            {task?.requiresHRApproval && userRole !== 'Employee' && task?.status === 'completed' && (
              <Button
                variant="success"
                iconName="Shield"
                iconPosition="left"
                iconSize={16}
              >
                Approve Completion
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;