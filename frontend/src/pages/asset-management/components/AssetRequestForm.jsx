import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssetRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: '',
    itemType: '',
    specifications: '',
    businessJustification: '',
    urgencyLevel: 'medium',
    expectedUsage: '',
    preferredBrand: '',
    budgetRange: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: 'laptop', label: 'Laptops & Computers' },
    { value: 'mobile', label: 'Mobile Devices' },
    { value: 'monitor', label: 'Monitors & Displays' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'software', label: 'Software Licenses' },
    { value: 'furniture', label: 'Office Furniture' },
    { value: 'other', label: 'Other Equipment' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low - Within 30 days' },
    { value: 'medium', label: 'Medium - Within 2 weeks' },
    { value: 'high', label: 'High - Within 1 week' },
    { value: 'critical', label: 'Critical - ASAP' }
  ];

  const budgetOptions = [
    { value: 'under-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: 'over-5000', label: 'Over $5,000' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.category) newErrors.category = 'Please select a category';
    if (!formData?.itemType?.trim()) newErrors.itemType = 'Item type is required';
    if (!formData?.businessJustification?.trim()) newErrors.businessJustification = 'Business justification is required';
    if (formData?.businessJustification?.length < 50) newErrors.businessJustification = 'Please provide more detailed justification (minimum 50 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSubmit({
        ...formData,
        id: Date.now(),
        requestDate: new Date(),
        status: 'pending',
        requestId: `AR-${Date.now()?.toString()?.slice(-6)}`
      });
      
      // Reset form
      setFormData({
        category: '',
        itemType: '',
        specifications: '',
        businessJustification: '',
        urgencyLevel: 'medium',
        expectedUsage: '',
        preferredBrand: '',
        budgetRange: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-blue-600';
      case 'low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
          <Icon name="Plus" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">New Asset Request</h2>
          <p className="text-sm text-slate-600">Submit a request for new equipment or resources</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Asset Category"
            description="Select the type of asset you need"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            placeholder="Choose category..."
          />

          <Input
            label="Item Type"
            type="text"
            placeholder="e.g., MacBook Pro, Dell Monitor, Office Chair"
            value={formData?.itemType}
            onChange={(e) => handleInputChange('itemType', e?.target?.value)}
            error={errors?.itemType}
            required
          />
        </div>

        <Input
          label="Specifications"
          type="text"
          placeholder="e.g., 16GB RAM, 512GB SSD, 27-inch display"
          description="Include technical requirements, size, model preferences, etc."
          value={formData?.specifications}
          onChange={(e) => handleInputChange('specifications', e?.target?.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Preferred Brand"
            type="text"
            placeholder="e.g., Apple, Dell, Microsoft"
            value={formData?.preferredBrand}
            onChange={(e) => handleInputChange('preferredBrand', e?.target?.value)}
          />

          <Select
            label="Budget Range"
            options={budgetOptions}
            value={formData?.budgetRange}
            onChange={(value) => handleInputChange('budgetRange', value)}
            placeholder="Select budget range..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Business Justification <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData?.businessJustification}
            onChange={(e) => handleInputChange('businessJustification', e?.target?.value)}
            placeholder="Explain how this asset will improve your productivity, support business objectives, or replace existing equipment..."
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
              errors?.businessJustification ? 'border-red-300' : 'border-slate-200'
            }`}
          />
          {errors?.businessJustification && (
            <p className="mt-1 text-xs text-red-600">{errors?.businessJustification}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">
            {formData?.businessJustification?.length}/500 characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Urgency Level
            </label>
            <div className="space-y-2">
              {urgencyOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="urgencyLevel"
                    value={option?.value}
                    checked={formData?.urgencyLevel === option?.value}
                    onChange={(e) => handleInputChange('urgencyLevel', e?.target?.value)}
                    className="w-4 h-4 text-primary border-slate-300 focus:ring-primary"
                  />
                  <span className={`text-sm ${getUrgencyColor(option?.value)}`}>
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Expected Usage"
            type="text"
            placeholder="e.g., Daily development work, Client presentations"
            description="How will you use this asset?"
            value={formData?.expectedUsage}
            onChange={(e) => handleInputChange('expectedUsage', e?.target?.value)}
          />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Icon name="Info" size={16} />
            <span>Requests are typically processed within 3-5 business days</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  category: '',
                  itemType: '',
                  specifications: '',
                  businessJustification: '',
                  urgencyLevel: 'medium',
                  expectedUsage: '',
                  preferredBrand: '',
                  budgetRange: ''
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

export default AssetRequestForm;