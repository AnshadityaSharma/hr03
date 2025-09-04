import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicySearchResults = ({ results, searchQuery, isLoading }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const getPolicyIcon = (category) => {
    const iconMap = {
      'hr-policies': 'Users',
      'it-security': 'Shield',
      'compliance': 'CheckCircle',
      'benefits': 'Heart',
      'code-of-conduct': 'Scale',
      'safety': 'AlertTriangle'
    };
    return iconMap?.[category] || 'FileText';
  };

  const getPolicyBadgeColor = (category) => {
    const colorMap = {
      'hr-policies': 'bg-blue-100 text-blue-800',
      'it-security': 'bg-red-100 text-red-800',
      'compliance': 'bg-green-100 text-green-800',
      'benefits': 'bg-purple-100 text-purple-800',
      'code-of-conduct': 'bg-amber-100 text-amber-800',
      'safety': 'bg-orange-100 text-orange-800'
    };
    return colorMap?.[category] || 'bg-slate-100 text-slate-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
        <div className="space-y-4">
          {[...Array(5)]?.map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results?.length === 0 && searchQuery) {
    return (
      <div className="bg-white rounded-2xl shadow-elevation-2 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No policies found</h3>
        <p className="text-slate-600 mb-4">
          We couldn't find any policies matching "{searchQuery}". Try adjusting your search terms or browse by category.
        </p>
        <Button variant="outline" iconName="HelpCircle" iconPosition="left">
          Submit a Query
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2">
      {searchQuery && (
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Search Results for "{searchQuery}"
            </h2>
            <span className="text-sm text-slate-500">
              {results?.length} result{results?.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      )}
      <div className="divide-y divide-slate-200">
        {results?.map((policy) => (
          <div key={policy?.id} className="p-6 hover:bg-slate-50 transition-spring">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getPolicyIcon(policy?.category)} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 mb-1">
                      {highlightText(policy?.title, searchQuery)}
                    </h3>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPolicyBadgeColor(policy?.category)}`}>
                        {policy?.categoryLabel}
                      </span>
                      <span className="text-sm text-slate-500">
                        Updated {formatDate(policy?.lastUpdated)}
                      </span>
                      {policy?.isNew && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      {highlightText(policy?.summary, searchQuery)}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{policy?.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Download" size={14} />
                        <span>{policy?.downloads} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{policy?.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Bookmark"
                      iconSize={14}
                      className="text-slate-600"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconSize={14}
                    >
                      Download
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                    >
                      View Policy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicySearchResults;