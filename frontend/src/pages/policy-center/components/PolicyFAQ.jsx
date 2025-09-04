import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicyFAQ = ({ isVisible, onClose }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: 'All Topics', icon: 'Grid3X3' },
    { id: 'leave', label: 'Leave & Time Off', icon: 'Calendar' },
    { id: 'benefits', label: 'Benefits', icon: 'Heart' },
    { id: 'conduct', label: 'Code of Conduct', icon: 'Scale' },
    { id: 'security', label: 'IT Security', icon: 'Shield' },
    { id: 'remote', label: 'Remote Work', icon: 'Home' }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'leave',
      question: 'How many vacation days do I get per year?',
      answer: `Full-time employees receive 15 vacation days per year during their first year of employment. This increases to 20 days after one year of service, and 25 days after five years of service.\n\nVacation days are accrued monthly and can be used once accrued. Unused vacation days can be carried over to the next year, up to a maximum of 5 days.`,
      relatedPolicies: ['Paid Time Off Policy', 'Holiday Schedule'],
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      category: 'benefits',
      question: 'When am I eligible for health insurance benefits?',
      answer: `Health insurance benefits begin on the first day of the month following your start date. For example, if you start on January 15th, your benefits will begin on February 1st.\n\nYou have 30 days from your start date to enroll in health insurance. If you miss this window, you'll need to wait until the next open enrollment period unless you have a qualifying life event.`,
      relatedPolicies: ['Health Insurance Guide', 'Benefits Enrollment'],
      lastUpdated: '2025-01-10'
    },
    {
      id: 3,
      category: 'remote',question: 'What are the requirements for working from home?',
      answer: `To be eligible for remote work, you must:\n• Have been employed for at least 90 days\n• Maintain satisfactory performance ratings\n• Have a suitable home office setup\n• Be available during core business hours (9 AM - 3 PM local time)\n\nRemote work arrangements must be approved by your manager and HR. Equipment and internet stipends are available for eligible remote workers.`,
      relatedPolicies: ['Remote Work Policy', 'Equipment Policy'],
      lastUpdated: '2025-01-20'
    },
    {
      id: 4,
      category: 'conduct',question: 'What should I do if I witness workplace harassment?',
      answer: `If you witness or experience workplace harassment:\n\n1. Document the incident with dates, times, and witnesses\n2. Report to your manager, HR, or use our anonymous hotline\n3. We have a zero-tolerance policy and will investigate promptly\n4. Retaliation against reporters is strictly prohibited\n\nYou can report incidents through multiple channels including our 24/7 hotline, HR portal, or speaking directly with any HR representative.`,
      relatedPolicies: ['Anti-Harassment Policy', 'Reporting Procedures'],
      lastUpdated: '2025-01-05'
    },
    {
      id: 5,
      category: 'security',question: 'How often should I change my password?',
      answer: `Passwords should be changed every 90 days or immediately if you suspect compromise. Your password must:\n\n• Be at least 12 characters long\n• Include uppercase, lowercase, numbers, and symbols\n• Not reuse your last 12 passwords\n• Not contain personal information\n\nTwo-factor authentication is required for all systems. Use the company password manager for generating and storing secure passwords.`,
      relatedPolicies: ['Password Policy', 'IT Security Guidelines'],
      lastUpdated: '2025-01-12'
    },
    {
      id: 6,
      category: 'benefits',question: 'How does the 401(k) matching program work?',
      answer: `The company matches 100% of your contributions up to 4% of your salary. For example, if you earn $50,000 and contribute 4% ($2,000), the company will contribute an additional $2,000.\n\nYou're eligible to participate immediately upon hire, but company matching begins after 90 days of employment. You're fully vested in company contributions after 3 years of service.`,
      relatedPolicies: ['401(k) Plan Summary', 'Retirement Benefits'],
      lastUpdated: '2025-01-08'
    }
  ];

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(itemId)) {
      newExpanded?.delete(itemId);
    } else {
      newExpanded?.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = selectedCategory === 'all' 
    ? faqItems 
    : faqItems?.filter(item => item?.category === selectedCategory);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-600">Quick answers to common policy questions</p>
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

        <div className="flex h-[calc(90vh-120px)]">
          {/* Category Sidebar */}
          <div className="w-64 border-r border-slate-200 p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {faqCategories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-spring ${
                    selectedCategory === category?.id
                      ? 'bg-primary text-white' :'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon name={category?.icon} size={16} />
                  <span>{category?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredFAQs?.map((item) => (
                <div key={item?.id} className="border border-slate-200 rounded-lg">
                  <button
                    onClick={() => toggleExpanded(item?.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-spring"
                  >
                    <h3 className="text-sm font-medium text-slate-900 pr-4">
                      {item?.question}
                    </h3>
                    <Icon 
                      name={expandedItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-slate-400 flex-shrink-0" 
                    />
                  </button>
                  
                  {expandedItems?.has(item?.id) && (
                    <div className="px-4 pb-4 border-t border-slate-200">
                      <div className="pt-4 space-y-4">
                        <div className="prose prose-sm max-w-none">
                          {item?.answer?.split('\n')?.map((paragraph, index) => (
                            <p key={index} className="text-slate-600 mb-2 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        
                        {item?.relatedPolicies?.length > 0 && (
                          <div>
                            <h4 className="text-xs font-medium text-slate-900 mb-2">Related Policies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {item?.relatedPolicies?.map((policy, index) => (
                                <button
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-spring"
                                >
                                  {policy}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className="text-xs text-slate-500">
                            Last updated: {new Date(item.lastUpdated)?.toLocaleDateString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="ThumbsUp"
                              iconSize={14}
                              className="text-slate-500 hover:text-green-600"
                            >
                              Helpful
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="MessageCircle"
                              iconSize={14}
                              className="text-slate-500"
                            >
                              Ask More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No FAQs found</h3>
                <p className="text-slate-600">
                  No frequently asked questions found for this category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Can't find what you're looking for?
            </p>
            <Button
              variant="default"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Submit a Query
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyFAQ;