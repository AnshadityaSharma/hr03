import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PolicyQueryForm = ({ isVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    department: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'hr-policies', label: 'HR Policies' },
    { value: 'it-security', label: 'IT Security' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'benefits', label: 'Benefits & Compensation' },
    { value: 'code-of-conduct', label: 'Code of Conduct' },
    { value: 'safety', label: 'Safety & Health' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low - General inquiry', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Need clarification', color: 'text-amber-600' },
    { value: 'high', label: 'High - Urgent guidance needed', color: 'text-red-600' }
  ];

  const departments = [
    { value: '', label: 'Select your department' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'legal', label: 'Legal' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.trim()?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData?.department) {
      newErrors.department = 'Please select your department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const queryData = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date()?.toISOString(),
        status: 'submitted',
        ticketNumber: `POL-${Date.now()?.toString()?.slice(-6)}`
      };
      
      onSubmit(queryData);
      
      // Reset form
      setFormData({
        subject: '',
        category: '',
        priority: 'medium',
        description: '',
        department: '',
        attachments: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting query:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter(att => att?.id !== attachmentId)
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Submit Policy Query</h2>
              <p className="text-sm text-slate-600">Get clarification on company policies</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Subject */}
            <Input
              label="Subject"
              type="text"
              placeholder="Brief description of your query"
              value={formData?.subject}
              onChange={(e) => handleInputChange('subject', e?.target?.value)}
              error={errors?.subject}
              required
            />

            {/* Category and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) => handleInputChange('category', e?.target?.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors?.category ? 'border-red-300' : 'border-slate-200'
                  }`}
                >
                  {categories?.map((category) => (
                    <option key={category?.value} value={category?.value}>
                      {category?.label}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="mt-1 text-sm text-red-600">{errors?.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData?.department}
                  onChange={(e) => handleInputChange('department', e?.target?.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors?.department ? 'border-red-300' : 'border-slate-200'
                  }`}
                >
                  {departments?.map((dept) => (
                    <option key={dept?.value} value={dept?.value}>
                      {dept?.label}
                    </option>
                  ))}
                </select>
                {errors?.department && (
                  <p className="mt-1 text-sm text-red-600">{errors?.department}</p>
                )}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Priority Level</label>
              <div className="space-y-2">
                {priorities?.map((priority) => (
                  <label key={priority?.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={priority?.value}
                      checked={formData?.priority === priority?.value}
                      onChange={(e) => handleInputChange('priority', e?.target?.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300"
                    />
                    <span className={`text-sm font-medium ${priority?.color}`}>
                      {priority?.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Please provide detailed information about your policy question or the clarification you need..."
                rows={5}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                  errors?.description ? 'border-red-300' : 'border-slate-200'
                }`}
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-red-600">{errors?.description}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                {formData?.description?.length}/500 characters
              </p>
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
                <div className="text-center">
                  <Icon name="Upload" size={24} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                  </p>
                </div>
              </div>

              {/* Attachment List */}
              {formData?.attachments?.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData?.attachments?.map((attachment) => (
                    <div key={attachment?.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Paperclip" size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-700">{attachment?.name}</span>
                        <span className="text-xs text-slate-500">({formatFileSize(attachment?.size)})</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAttachment(attachment?.id)}
                        iconName="X"
                        iconSize={14}
                        className="h-6 w-6 text-slate-400 hover:text-red-600"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              You'll receive a confirmation email with your ticket number
            </p>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                onClick={handleSubmit}
                iconName="Send"
                iconPosition="left"
                iconSize={16}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Query'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyQueryForm;