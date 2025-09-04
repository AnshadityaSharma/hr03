import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeaveApplicationForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null
  });
  const [errors, setErrors] = useState({});

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'emergency', label: 'Emergency Leave' },
    { value: 'bereavement', label: 'Bereavement Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }
    
    if (!formData?.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData?.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (formData?.startDate && formData?.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (start < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
      
      if (end < start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    if (!formData?.reason?.trim()) {
      newErrors.reason = 'Please provide a reason for leave';
    } else if (formData?.reason?.trim()?.length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, attachment: 'File size must be less than 5MB' }));
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes?.includes(file?.type)) {
        setErrors(prev => ({ ...prev, attachment: 'Only PDF, DOC, DOCX, JPG, and PNG files are allowed' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, attachment: file }));
      setErrors(prev => ({ ...prev, attachment: '' }));
    }
  };

  const calculateLeaveDays = () => {
    if (formData?.startDate && formData?.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Submit Leave Request</h2>
          <p className="text-sm text-slate-600">Fill out the form below to request time off</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Select
            label="Leave Type"
            placeholder="Select leave type"
            options={leaveTypes}
            value={formData?.leaveType}
            onChange={(value) => handleInputChange('leaveType', value)}
            error={errors?.leaveType}
            required
          />

          <div className="lg:col-span-1">
            <div className="text-sm font-medium text-slate-700 mb-2">
              Leave Duration
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Icon name="Calendar" size={16} />
                <span>
                  {calculateLeaveDays() > 0 ? `${calculateLeaveDays()} day${calculateLeaveDays() > 1 ? 's' : ''}` : 'Select dates'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            type="date"
            value={formData?.startDate}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
          />

          <Input
            label="End Date"
            type="date"
            value={formData?.endDate}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Reason for Leave <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData?.reason}
            onChange={(e) => handleInputChange('reason', e?.target?.value)}
            placeholder="Please provide a detailed reason for your leave request..."
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
              errors?.reason ? 'border-red-300' : 'border-slate-200'
            }`}
          />
          {errors?.reason && (
            <p className="mt-1 text-sm text-red-600">{errors?.reason}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            {formData?.reason?.length}/500 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Supporting Document (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-primary/50 transition-spring">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl">
                  <Icon name="Upload" size={20} color="var(--color-slate-600)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {formData?.attachment ? formData?.attachment?.name : 'Click to upload file'}
                  </p>
                  <p className="text-xs text-slate-500">
                    PDF, DOC, DOCX, JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </label>
          </div>
          {errors?.attachment && (
            <p className="mt-1 text-sm text-red-600">{errors?.attachment}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <Icon name="Info" size={16} className="inline mr-1" />
            Your request will be sent to your manager for approval
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  leaveType: '',
                  startDate: '',
                  endDate: '',
                  reason: '',
                  attachment: null
                });
                setErrors({});
              }}
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;