import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import PolicySearchBar from './components/PolicySearchBar';
import PolicySearchResults from './components/PolicySearchResults';
import QuickAccessPanel from './components/QuickAccessPanel';
import PolicyFAQ from './components/PolicyFAQ';
import PolicyQueryForm from './components/PolicyQueryForm';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AnimatedCard from '../../components/ui/AnimatedCard';
import PageTransition from '../../components/ui/PageTransition';
import Dock from '../../components/ui/Dock';
import { useTheme } from '../../hooks/useTheme';

const PolicyCenter = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [recentQueries, setRecentQueries] = useState([]);

  // Mock policy data
  const mockPolicies = [
    {
      id: 'remote-work-policy',
      title: 'Remote Work Policy and Guidelines',
      summary: 'Comprehensive guidelines for remote work arrangements, including eligibility criteria, equipment requirements, and performance expectations.',
      category: 'hr-policies',
      categoryLabel: 'HR Policies',
      lastUpdated: '2025-01-15T10:30:00Z',
      views: 1247,
      downloads: 89,
      readTime: 8,
      isNew: true,
      content: `This policy outlines the company's approach to remote work arrangements...`
    },
    {
      id: 'expense-reimbursement',
      title: 'Expense Reimbursement Policy',
      summary: 'Guidelines for submitting and processing business expense reimbursements, including approved categories and documentation requirements.',
      category: 'hr-policies',
      categoryLabel: 'HR Policies',
      lastUpdated: '2025-01-10T14:20:00Z',
      views: 892,
      downloads: 156,
      readTime: 6,
      isNew: false
    },
    {
      id: 'data-protection-guidelines',
      title: 'Data Protection and Privacy Guidelines',
      summary: 'Essential guidelines for handling sensitive data, GDPR compliance, and maintaining customer privacy across all business operations.',
      category: 'it-security',
      categoryLabel: 'IT Security',
      lastUpdated: '2025-01-08T09:15:00Z',
      views: 2156,
      downloads: 234,
      readTime: 12,
      isNew: false
    },
    {
      id: 'harassment-prevention',
      title: 'Anti-Harassment and Discrimination Policy',
      summary: 'Zero-tolerance policy regarding harassment and discrimination, including reporting procedures and investigation processes.',
      category: 'code-of-conduct',
      categoryLabel: 'Code of Conduct',
      lastUpdated: '2025-01-05T16:45:00Z',
      views: 1834,
      downloads: 298,
      readTime: 10,
      isNew: false
    },
    {
      id: 'health-insurance-guide',
      title: 'Health Insurance Benefits Guide',
      summary: 'Complete guide to health insurance options, enrollment procedures, and coverage details for employees and dependents.',
      category: 'benefits',
      categoryLabel: 'Benefits',
      lastUpdated: '2025-01-12T11:30:00Z',
      views: 1456,
      downloads: 187,
      readTime: 15,
      isNew: true
    },
    {
      id: 'password-security-policy',
      title: 'Password Security and Authentication Policy',
      summary: 'Requirements for creating secure passwords, multi-factor authentication setup, and account security best practices.',
      category: 'it-security',
      categoryLabel: 'IT Security',
      lastUpdated: '2025-01-07T13:20:00Z',
      views: 987,
      downloads: 123,
      readTime: 5,
      isNew: false
    }
  ];

  // Dock items for quick navigation
  const dockItems = [
    { 
      icon: <Icon name="Home" size={18} className="text-foreground" />, 
      label: 'Dashboard', 
      onClick: () => window.location.href = '/dashboard' 
    },
    { 
      icon: <Icon name="FileText" size={18} className="text-foreground" />, 
      label: 'Policies', 
      onClick: () => console.log('Policies') 
    },
    { 
      icon: <Icon name="HelpCircle" size={18} className="text-foreground" />, 
      label: 'FAQ', 
      onClick: () => setShowFAQ(true) 
    },
    { 
      icon: <Icon name="MessageCircle" size={18} className="text-foreground" />, 
      label: 'Query', 
      onClick: () => setShowQueryForm(true) 
    },
  ];

  useEffect(() => {
    // Load recent queries from localStorage
    const saved = localStorage.getItem('policyQueries');
    if (saved) {
      setRecentQueries(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (query, filters = {}) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredPolicies = mockPolicies;

      // Filter by search query
      if (query) {
        filteredPolicies = filteredPolicies?.filter(policy =>
          policy?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
          policy?.summary?.toLowerCase()?.includes(query?.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== 'all') {
        filteredPolicies = filteredPolicies?.filter(policy =>
          policy?.category === selectedCategory
        );
      }

      // Apply advanced filters
      if (filters?.department) {
        // In real app, this would filter by department-specific policies
      }

      if (filters?.policyType) {
        // In real app, this would filter by policy type
      }

      if (filters?.dateRange) {
        // In real app, this would filter by date range
      }

      setSearchResults(filteredPolicies);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to static results
      setSearchResults(mockPolicies);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      // Show all policies for the selected category
      const filtered = category === 'all' 
        ? mockPolicies 
        : mockPolicies?.filter(policy => policy?.category === category);
      setSearchResults(filtered);
    }
  };

  const handlePolicySelect = (policy) => {
    if (policy?.category) {
      // Handle category selection
      handleCategoryFilter(policy?.category);
    } else {
      // Handle individual policy selection
      console.log('Selected policy:', policy);
    }
  };

  const handleQuerySubmit = (queryData) => {
    const updatedQueries = [queryData, ...recentQueries?.slice(0, 4)];
    setRecentQueries(updatedQueries);
    localStorage.setItem('policyQueries', JSON.stringify(updatedQueries));
    
    // Show success message
    console.log('Query submitted:', queryData);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'faq':
        setShowFAQ(true);
        break;
      case 'query':
        setShowQueryForm(true);
        break;
      default:
        break;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Helmet>
          <title>Policy Center - Enterprise HRMS</title>
          <meta name="description" content="Access company policies, submit queries, and find answers to frequently asked questions" />
        </Helmet>
        <Header />
        <SLAAlertBanner />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center"
                >
                  <Icon name="FileText" size={24} className="text-primary" />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-3xl font-bold text-foreground"
                  >
                    Policy Center
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-muted-foreground"
                  >
                    Search policies, access guidelines, and get answers to your questions
                  </motion.p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: 'FileText', count: '127', label: 'Total Policies', color: 'blue' },
                  { icon: 'Clock', count: '15', label: 'Updated This Month', color: 'green' },
                  { icon: 'MessageCircle', count: '43', label: 'Open Queries', color: 'purple' },
                  { icon: 'TrendingUp', count: '2.4k', label: 'Monthly Views', color: 'amber' }
                ]?.map((stat, index) => (
                  <AnimatedCard
                    key={stat?.label}
                    delay={0.1 * index}
                    className="p-4"
                    onClick={() => {}}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          stat?.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                          stat?.color === 'green' ? 'bg-green-100 text-green-600' :
                          stat?.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                        }`}
                      >
                        <Icon name={stat?.icon} size={16} />
                      </motion.div>
                      <div>
                        <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + 0.1 * index, type: "spring", stiffness: 200 }}
                          className="text-2xl font-bold text-foreground"
                        >
                          {stat?.count}
                        </motion.p>
                        <p className="text-sm text-muted-foreground">{stat?.label}</p>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Search and Results */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="lg:col-span-2 space-y-6"
              >
                <PolicySearchBar
                  onSearch={handleSearch}
                  onCategoryFilter={handleCategoryFilter}
                  selectedCategory={selectedCategory}
                />

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { icon: 'HelpCircle', label: 'View FAQ', action: 'faq' },
                    { icon: 'MessageCircle', label: 'Submit Query', action: 'query' },
                    { icon: 'Download', label: 'Download Policy Pack', action: 'download' }
                  ]?.map((button, index) => (
                    <motion.div
                      key={button?.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + 0.1 * index, duration: 0.3 }}
                      whileHover={{ y: -2 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        iconName={button?.icon}
                        iconPosition="left"
                        iconSize={16}
                        onClick={() => handleQuickAction(button?.action)}
                        className="backdrop-blur-sm"
                      >
                        {button?.label}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>

                <PolicySearchResults
                  results={searchResults}
                  searchQuery={searchQuery}
                  isLoading={isLoading}
                />
              </motion.div>

              {/* Right Column - Quick Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                <QuickAccessPanel onPolicySelect={handlePolicySelect} />

                {/* Recent Queries */}
                {recentQueries?.length > 0 && (
                  <AnimatedCard delay={0.5} className="p-6" onClick={() => {}}>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Queries</h3>
                    <div className="space-y-3">
                      {recentQueries?.slice(0, 3)?.map((query, index) => (
                        <motion.div
                          key={query?.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.4 }}
                          whileHover={{ x: 4, scale: 1.02 }}
                          className="p-3 border border-border rounded-lg cursor-pointer hover:shadow-elevation-1 transition-all duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-foreground mb-1">
                                {query?.subject}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Ticket #{query?.ticketNumber} • {new Date(query.submittedAt)?.toLocaleDateString()}
                              </p>
                            </div>
                            <motion.span
                              whileHover={{ scale: 1.1 }}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                query?.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                query?.status === 'in-progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              }`}
                            >
                              {query?.status}
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatedCard>
                )}

                {/* Help & Support */}
                <AnimatedCard
                  delay={0.6}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border border-primary/20"
                  onClick={() => {}}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center"
                    >
                      <Icon name="Headphones" size={20} className="text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
                      <p className="text-sm text-muted-foreground">Our HR team is here to assist</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { icon: 'Mail', text: 'hr-support@company.com' },
                      { icon: 'Phone', text: '+1 (555) 123-4567' },
                      { icon: 'Clock', text: 'Mon-Fri, 9 AM - 5 PM EST' }
                    ]?.map((contact, index) => (
                      <motion.div
                        key={contact?.icon}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + 0.1 * index, duration: 0.4 }}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                      >
                        <Icon name={contact?.icon} size={14} />
                        <span>{contact?.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.4 }}
                  >
                    <Button
                      variant="default"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                      iconSize={14}
                      className="w-full mt-4 backdrop-blur-sm"
                      onClick={() => setShowQueryForm(true)}
                    >
                      Contact Support
                    </Button>
                  </motion.div>
                </AnimatedCard>
              </motion.div>
            </div>
          </div>

          {/* Floating Dock */}
          <Dock 
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </main>
        
        {/* Modals */}
        <PolicyFAQ
          isVisible={showFAQ}
          onClose={() => setShowFAQ(false)}
        />
        <PolicyQueryForm
          isVisible={showQueryForm}
          onClose={() => setShowQueryForm(false)}
          onSubmit={handleQuerySubmit}
        />
        <FloatingChatWidget />
      </div>
    </PageTransition>
  );
};

export default PolicyCenter;