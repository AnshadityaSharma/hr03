import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Documentation',
    priority: 'medium',
    assignedTo: '',
    dueDate: '',
    estimatedTime: '1 hour',
    requirements: [''],
    instructions: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Documentation',
    'Training',
    'Equipment Setup',
    'Benefits',
    'Meetings',
    'System Access',
    'Compliance',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (formData.requirements.length > 1) {
      const newRequirements = formData.requirements.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assignee is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.requirements.some(req => !req.trim())) {
      newErrors.requirements = 'All requirements must be filled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newTask = {
        id: Date.now(), // Simple ID generation
        ...formData,
        status: 'pending',
        requiresHRApproval: false,
        requiresDigitalSignature: false,
        resources: [],
        createdAt: new Date().toISOString()
      };

      onSave(newTask);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Documentation',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
      estimatedTime: '1 hour',
      requirements: [''],
      instructions: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <Icon name="Plus" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Add New Task
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              Task Information
            </h3>
            
            <Input
              label="Task Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
              placeholder="Enter task title"
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe the task in detail"
                required
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Assigned To"
                value={formData.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                error={errors.assignedTo}
                placeholder="Employee name or email"
                required
              />

              <Input
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                error={errors.dueDate}
                required
              />
            </div>

            <Input
              label="Estimated Time"
              value={formData.estimatedTime}
              onChange={(e) => handleInputChange('estimatedTime', e.target.value)}
              placeholder="e.g., 1 hour, 30 minutes"
            />
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                Requirements
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRequirement}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
              >
                Add Requirement
              </Button>
            </div>

            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder={`Requirement ${index + 1}`}
                    required
                  />
                </div>
                {formData.requirements.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                    iconName="Trash2"
                    iconSize={16}
                    className="text-red-600 hover:text-red-700"
                  />
                )}
              </div>
            ))}
            {errors.requirements && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.requirements}</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              placeholder="Provide detailed instructions for completing this task"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Save"
              iconPosition="left"
            >
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

