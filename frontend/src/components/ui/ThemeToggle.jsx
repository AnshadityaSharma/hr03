import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative ${sizeClasses?.[size]} rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 flex items-center justify-center group ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Icon
            name={isDark ? 'Sun' : 'Moon'}
            size={iconSizes?.[size]}
            className={`${isDark ? 'text-amber-500' : 'text-slate-600'} group-hover:scale-110 transition-transform`}
          />
        </motion.div>
      </AnimatePresence>
      {/* Glow effect for dark mode */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-xl bg-amber-400 blur-md -z-10"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;