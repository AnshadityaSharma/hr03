import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRoles } from '../../lib/types';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Software Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate software developer with 5+ years of experience in full-stack development.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    darkMode: true,
    language: 'English',
    timezone: 'PST'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Software Developer',
      location: 'San Francisco, CA',
      bio: 'Passionate software developer with 5+ years of experience in full-stack development.',
      skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543'
      }
    });
    setIsEditing(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case UserRoles.ADMIN:
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case UserRoles.HR_MANAGER:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case UserRoles.EMPLOYEE:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {user?.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">{formData.position}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
              {user?.role}
            </span>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            iconName={isEditing ? "Save" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Position"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            disabled={!isEditing}
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400"
          />
        </div>

        {/* Skills */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-3 mt-6">
            <Button onClick={handleSave} variant="default">
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Name"
            value={formData.emergencyContact.name}
            onChange={(e) => handleInputChange('emergencyContact', { ...formData.emergencyContact, name: e.target.value })}
            disabled={!isEditing}
          />
          <Input
            label="Relationship"
            value={formData.emergencyContact.relationship}
            onChange={(e) => handleInputChange('emergencyContact', { ...formData.emergencyContact, relationship: e.target.value })}
            disabled={!isEditing}
          />
          <Input
            label="Phone"
            value={formData.emergencyContact.phone}
            onChange={(e) => handleInputChange('emergencyContact', { ...formData.emergencyContact, phone: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Language</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Choose your preferred language</p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Timezone</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Set your local timezone</p>
            </div>
            <select
              value={preferences.timezone}
              onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="PST">Pacific Time (PST)</option>
              <option value="MST">Mountain Time (MST)</option>
              <option value="CST">Central Time (CST)</option>
              <option value="EST">Eastern Time (EST)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <Button variant="outline" iconName="Lock" iconPosition="left" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" iconName="Shield" iconPosition="left" className="w-full justify-start">
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" iconName="Key" iconPosition="left" className="w-full justify-start">
            Manage API Keys
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Active Sessions</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" size={16} className="text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Chrome on Windows</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">San Francisco, CA • Active now</p>
              </div>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Current</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={16} className="text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Safari on iPhone</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">New York, NY • 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Email Notifications</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive notifications via email</p>
            </div>
            <Checkbox
              checked={preferences.emailNotifications}
              onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Push Notifications</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive push notifications</p>
            </div>
            <Checkbox
              checked={preferences.pushNotifications}
              onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Weekly Reports</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive weekly activity reports</p>
            </div>
            <Checkbox
              checked={preferences.weeklyReports}
              onChange={(e) => handlePreferenceChange('weeklyReports', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Dark Mode</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Use dark theme</p>
            </div>
            <Checkbox
              checked={preferences.darkMode}
              onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'settings':
        return renderSettingsTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <SLAAlertBanner />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-3">
              <Icon name="User" size={32} className="text-primary" />
              <span>Profile & Settings</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Manage your profile information and account settings
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
            <div className="flex border-b border-slate-200 dark:border-slate-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
      <FloatingChatWidget />
    </div>
  );
};

export default Profile;

