import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AssetGuidelines = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const guidelines = [
    {
      id: 'request-process',
      title: 'Asset Request Process',
      icon: 'FileText',
      content: `**Step 1: Submit Request**\nComplete the asset request form with detailed specifications and business justification. Ensure all required fields are filled accurately.\n\n**Step 2: Manager Approval**\nYour direct manager will review and approve/reject the request based on business needs and budget availability.\n\n**Step 3: IT/Admin Review**\nIT or Admin team will verify technical specifications, check inventory, and process procurement if needed.\n\n**Step 4: Asset Assignment**\nOnce approved and available, the asset will be assigned to you with proper documentation and setup instructions.`
    },
    {
      id: 'care-maintenance',
      title: 'Asset Care & Maintenance',
      icon: 'Settings',
      content: `**Daily Care**\n• Keep equipment clean and dust-free\n• Handle with care during transport\n• Avoid exposure to extreme temperatures or moisture\n• Use appropriate protective cases when traveling\n\n**Regular Maintenance**\n• Install software updates promptly\n• Run antivirus scans weekly\n• Back up important data regularly\n• Report any issues immediately\n\n**Professional Servicing**\n• Schedule annual maintenance for high-value equipment\n• Use only authorized service providers\n• Keep maintenance records updated`
    },
    {
      id: 'return-policy',
      title: 'Return & Replacement Policy',
      icon: 'RotateCcw',
      content: `**Return Requirements**\n• Submit return request through the system\n• Ensure asset is in good working condition\n• Include all original accessories and documentation\n• Complete data wipe for devices containing sensitive information\n\n**Return Timeline**\n• Standard returns: 5 business days notice\n• Emergency returns: Same day with manager approval\n• End of employment: All assets must be returned on last working day\n\n**Replacement Process**\n• Defective equipment will be replaced within 2-3 business days\n• Upgrades require new request approval\n• Lost or damaged assets may incur replacement costs`
    },
    {
      id: 'security-compliance',
      title: 'Security & Compliance',
      icon: 'Shield',
      content: `**Data Security**\n• Enable device encryption and screen locks\n• Use strong, unique passwords\n• Never share login credentials\n• Report security incidents immediately\n\n**Software Compliance**\n• Install only approved software\n• Maintain current licenses\n• Avoid downloading from untrusted sources\n• Regular security training completion required\n\n**Physical Security**\n• Never leave devices unattended in public\n• Use cable locks in office environments\n• Report theft or loss within 24 hours\n• Follow clean desk policy`
    },
    {
      id: 'remote-work',
      title: 'Remote Work Guidelines',
      icon: 'Home',
      content: `**Home Office Setup**\n• Ensure secure, dedicated workspace\n• Maintain proper ergonomic setup\n• Stable internet connection required\n• Adequate lighting and ventilation\n\n**Security Considerations**\n• Use VPN for all company network access\n• Secure home WiFi with WPA3 encryption\n• Keep work devices separate from personal use\n• Regular security updates and patches\n\n**Support & Maintenance**\n• Remote IT support available during business hours\n• Self-service troubleshooting resources provided\n• Escalation procedures for critical issues\n• Regular check-ins with IT team`
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const formatContent = (content) => {
    return content?.split('\n')?.map((line, index) => {
      if (line?.startsWith('**') && line?.endsWith('**')) {
        return (
          <h4 key={index} className="font-semibold text-slate-900 mt-4 mb-2 first:mt-0">
            {line?.replace(/\*\*/g, '')}
          </h4>
        );
      } else if (line?.startsWith('•')) {
        return (
          <li key={index} className="text-slate-600 ml-4">
            {line?.substring(1)?.trim()}
          </li>
        );
      } else if (line?.trim()) {
        return (
          <p key={index} className="text-slate-600 mb-2">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-xl">
          <Icon name="BookOpen" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Asset Management Guidelines</h2>
          <p className="text-sm text-slate-600">Important policies and procedures for asset handling</p>
        </div>
      </div>
      <div className="space-y-4">
        {guidelines?.map((guideline) => (
          <div key={guideline?.id} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(guideline?.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-spring"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg">
                  <Icon name={guideline?.icon} size={16} color="var(--color-slate-600)" />
                </div>
                <h3 className="font-medium text-slate-900">{guideline?.title}</h3>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-slate-400 transition-transform ${
                  expandedSection === guideline?.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSection === guideline?.id && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="pt-4 prose prose-sm max-w-none">
                  {formatContent(guideline?.content)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Contact */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
            <Icon name="HelpCircle" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              If you have questions about asset management policies or need assistance with your request, contact our support team.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="mailto:it-support@company.com"
                className="inline-flex items-center space-x-1 text-sm text-blue-700 hover:text-blue-800 font-medium"
              >
                <Icon name="Mail" size={14} />
                <span>it-support@company.com</span>
              </a>
              <span className="text-blue-300">•</span>
              <a
                href="tel:+1-555-0123"
                className="inline-flex items-center space-x-1 text-sm text-blue-700 hover:text-blue-800 font-medium"
              >
                <Icon name="Phone" size={14} />
                <span>+1 (555) 012-3456</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetGuidelines;