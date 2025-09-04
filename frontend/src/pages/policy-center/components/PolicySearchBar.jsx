import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PolicySearchBar = ({ onSearch, onCategoryFilter, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: '',
    department: '',
    policyType: ''
  });
  const searchRef = useRef(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'hr-policies', label: 'HR Policies' },
    { value: 'it-security', label: 'IT Security' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'benefits', label: 'Benefits' },
    { value: 'code-of-conduct', label: 'Code of Conduct' },
    { value: 'safety', label: 'Safety & Health' }
  ];

  const mockSuggestions = [
    "Remote work policy",
    "Vacation leave guidelines",
    "Expense reimbursement",
    "Performance review process",
    "Dress code policy",
    "Data protection guidelines",
    "Harassment prevention",
    "Equipment usage policy"
  ];

  useEffect(() => {
    if (searchQuery?.length > 2) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      onSearch(searchQuery, advancedFilters);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion, advancedFilters);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAdvancedFilterChange = (key, value) => {
    const newFilters = { ...advancedFilters, [key]: value };
    setAdvancedFilters(newFilters);
  };

  const clearFilters = () => {
    setAdvancedFilters({
      dateRange: '',
      department: '',
      policyType: ''
    });
    setSearchQuery('');
    onSearch('', {});
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6 mb-6">
      <div className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search policies, procedures, and guidelines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 pr-24 h-12 text-lg"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" 
            />
            <Button
              variant="default"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
            >
              Search
            </Button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-elevation-2 z-50">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-spring flex items-center space-x-3 border-b border-slate-100 last:border-b-0"
                >
                  <Icon name="Search" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-700">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.value}
              variant={selectedCategory === category?.value ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryFilter(category?.value)}
              className="text-sm"
            >
              {category?.label}
            </Button>
          ))}
        </div>

        {/* Advanced Search Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={16}
          >
            Advanced Search
          </Button>
          
          {(searchQuery || Object.values(advancedFilters)?.some(v => v)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="text-slate-500"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <select
                value={advancedFilters?.dateRange}
                onChange={(e) => handleAdvancedFilterChange('dateRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Any time</option>
                <option value="last-week">Last week</option>
                <option value="last-month">Last month</option>
                <option value="last-quarter">Last quarter</option>
                <option value="last-year">Last year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <select
                value={advancedFilters?.department}
                onChange={(e) => handleAdvancedFilterChange('department', e?.target?.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All departments</option>
                <option value="hr">Human Resources</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
                <option value="legal">Legal</option>
                <option value="operations">Operations</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Policy Type</label>
              <select
                value={advancedFilters?.policyType}
                onChange={(e) => handleAdvancedFilterChange('policyType', e?.target?.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All types</option>
                <option value="mandatory">Mandatory</option>
                <option value="guideline">Guidelines</option>
                <option value="procedure">Procedures</option>
                <option value="form">Forms</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicySearchBar;