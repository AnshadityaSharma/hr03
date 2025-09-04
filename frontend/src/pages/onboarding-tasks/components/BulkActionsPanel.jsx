import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkActionsPanel = ({ 
  selectedTasks, 
  onSelectAll, 
  onDeselectAll, 
  onBulkAction, 
  totalTasks, 
  userRole 
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Action...' },
    { value: 'mark_complete', label: 'Mark as Complete' },
    { value: 'mark_in_progress', label: 'Mark as In Progress' },
    { value: 'extend_deadline', label: 'Extend Deadline' },
    { value: 'reassign', label: 'Reassign Tasks' },
    { value: 'add_notes', label: 'Add Notes' },
    { value: 'export', label: 'Export Selected' },
  ];

  // Filter actions based on user role
  const availableActions = bulkActionOptions?.filter(action => {
    if (userRole === 'Employee') {
      return ['', 'mark_complete', 'add_notes', 'export']?.includes(action?.value);
    }
    return true; // HR Admin and Manager can see all actions
  });

  const handleBulkAction = () => {
    if (!bulkAction || selectedTasks?.length === 0) return;
    
    if (['mark_complete', 'extend_deadline', 'reassign']?.includes(bulkAction)) {
      setIsConfirmModalOpen(true);
    } else {
      executeBulkAction();
    }
  };

  const executeBulkAction = () => {
    onBulkAction(bulkAction, selectedTasks);
    setBulkAction('');
    setIsConfirmModalOpen(false);
  };

  const getActionDescription = () => {
    switch (bulkAction) {
      case 'mark_complete':
        return `Mark ${selectedTasks?.length} selected task${selectedTasks?.length > 1 ? 's' : ''} as complete?`;
      case 'mark_in_progress':
        return `Mark ${selectedTasks?.length} selected task${selectedTasks?.length > 1 ? 's' : ''} as in progress?`;
      case 'extend_deadline':
        return `Extend deadline for ${selectedTasks?.length} selected task${selectedTasks?.length > 1 ? 's' : ''}?`;
      case 'reassign':
        return `Reassign ${selectedTasks?.length} selected task${selectedTasks?.length > 1 ? 's' : ''} to another employee?`;
      default:
        return 'Are you sure you want to perform this action?';
    }
  };

  if (selectedTasks?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-elevation-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedTasks?.length === totalTasks}
                onChange={(e) => e?.target?.checked ? onSelectAll() : onDeselectAll()}
                indeterminate={selectedTasks?.length > 0 && selectedTasks?.length < totalTasks}
              />
              <span className="text-sm font-medium text-slate-700">
                {selectedTasks?.length} of {totalTasks} selected
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300" />

            <div className="flex items-center space-x-3">
              <Select
                options={availableActions}
                value={bulkAction}
                onChange={setBulkAction}
                placeholder="Select action..."
                className="w-48"
              />

              <Button
                variant="default"
                size="sm"
                onClick={handleBulkAction}
                disabled={!bulkAction}
                iconName="Play"
                iconPosition="left"
                iconSize={14}
              >
                Apply
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDeselectAll}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Selection
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkAction('export', selectedTasks)}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-200">
          <span className="text-sm text-slate-600">Quick actions:</span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('mark_complete', selectedTasks)}
            iconName="CheckCircle"
            iconPosition="left"
            iconSize={14}
            className="text-green-600 hover:bg-green-50"
          >
            Complete
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBulkAction('mark_in_progress', selectedTasks)}
            iconName="Clock"
            iconPosition="left"
            iconSize={14}
            className="text-blue-600 hover:bg-blue-50"
          >
            In Progress
          </Button>

          {userRole !== 'Employee' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('extend_deadline', selectedTasks)}
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
                className="text-amber-600 hover:bg-amber-50"
              >
                Extend Deadline
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('reassign', selectedTasks)}
                iconName="UserCheck"
                iconPosition="left"
                iconSize={14}
                className="text-purple-600 hover:bg-purple-50"
              >
                Reassign
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-slate-500 bg-opacity-75"
              onClick={() => setIsConfirmModalOpen(false)}
            />

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                  <Icon name="AlertTriangle" size={20} className="text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Confirm Bulk Action</h3>
              </div>

              <p className="text-sm text-slate-600 mb-6">
                {getActionDescription()}
              </p>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={executeBulkAction}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsPanel;