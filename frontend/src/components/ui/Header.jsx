import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState('Employee');
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Leave Management', path: '/leave-management', icon: 'Calendar' },
    { label: 'Asset Management', path: '/asset-management', icon: 'Package' },
    { label: 'Policy Center', path: '/policy-center', icon: 'FileText' },
    { label: 'Onboarding Tasks', path: '/onboarding-tasks', icon: 'CheckSquare' },
  ];

  const roles = ['Employee', 'Manager', 'HR Admin'];

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    localStorage.setItem('userRole', role);
    setIsRoleSwitcherOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 border-b shadow-elevation-1 backdrop-blur-md transition-all duration-300 ${
        isDark 
          ? 'bg-slate-900/80 border-slate-700/50' :'bg-white/80 border-slate-200/50'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg group-hover:shadow-glow-sm transition-all duration-300"
          >
            <Icon name="Users" size={20} color="white" />
          </motion.div>
          <span className="text-xl font-semibold text-foreground">Enterprise HRMS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item, index) => (
            <motion.div
              key={item?.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Link
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-2' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={item?.icon} size={16} />
                </motion.div>
                <span>{item?.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <ThemeToggle size="md" />

          {/* Role Switcher */}
          <div className="relative hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
              iconName="ChevronDown"
              iconPosition="right"
              iconSize={14}
            >
              {currentRole}
            </Button>
            <AnimatePresence>
              {isRoleSwitcherOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-elevation-2 py-1 z-50 backdrop-blur-sm"
                >
                  {roles?.map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ x: 4 }}
                      onClick={() => handleRoleChange(role)}
                      className={`w-full text-left px-3 py-2 text-sm transition-spring ${
                        currentRole === role
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-card-foreground hover:bg-muted/50'
                      }`}
                    >
                      {role}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-spring"
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
              >
                <Icon name="User" size={16} color="var(--color-muted-foreground)" />
              </motion.div>
              <span className="hidden lg:block text-sm font-medium text-foreground">John Doe</span>
              <motion.div
                animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block"
              >
                <Icon name="ChevronDown" size={14} />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-2 py-1 z-50 backdrop-blur-sm"
                >
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-card-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full text-left px-3 py-2 text-sm text-card-foreground hover:bg-muted/50 transition-spring"
                  >
                    Profile Settings
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full text-left px-3 py-2 text-sm text-card-foreground hover:bg-muted/50 transition-spring"
                  >
                    Preferences
                  </motion.button>
                  <div className="border-t border-border mt-1 pt-1">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-spring"
                    >
                      Sign Out
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden bg-card border-t border-border shadow-elevation-2 backdrop-blur-sm overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.map((item, index) => (
                <motion.div
                  key={item?.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-spring ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-card-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Role Switcher */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-3 border-t border-border"
              >
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Switch Role
                </p>
                {roles?.map((role, index) => (
                  <motion.button
                    key={role}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + 0.1 * index, duration: 0.3 }}
                    onClick={() => handleRoleChange(role)}
                    className={`w-full text-left px-3 py-2 text-sm transition-spring rounded-lg ${
                      currentRole === role
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-card-foreground hover:bg-muted/50'
                    }`}
                  >
                    {role}
                  </motion.button>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;