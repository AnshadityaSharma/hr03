import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../AppIcon';

const AnimatedButton = ({
  children,
  variant = 'default',
  size = 'md',
  iconName,
  iconPosition = 'left',
  iconSize = 16,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const { isDark } = useTheme();

  const variants = {
    default: `
      bg-primary text-primary-foreground border border-primary
      hover:bg-primary/90 shadow-elevation-1 hover:shadow-elevation-2
      ${isDark ? 'bg-blue-600 hover:bg-blue-700 border-blue-600' : ''}
    `,
    outline: `
      border border-border bg-card text-foreground
      hover:bg-muted/50 shadow-elevation-1 hover:shadow-elevation-2
      ${isDark ? 'border-slate-600 bg-slate-800/50 hover:bg-slate-700/50' : 'border-slate-200 bg-white/80 hover:bg-slate-100/80'}
    `,
    ghost: `
      text-foreground hover:bg-muted/50
      ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100/80'}
    `,
    destructive: `
      bg-destructive text-destructive-foreground border border-destructive
      hover:bg-destructive/90 shadow-elevation-1 hover:shadow-elevation-2
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-8',
    md: 'px-4 py-2 text-sm h-10',
    lg: 'px-6 py-3 text-base h-12',
    icon: 'p-2 w-10 h-10'
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : "initial"}
      whileTap={!disabled && !loading ? "tap" : "initial"}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center rounded-xl font-medium
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20
        disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
        ${variants?.[variant]}
        ${sizes?.[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <motion.div
          variants={loadingVariants}
          animate="animate"
          className="mr-2"
        >
          <Icon name="Loader2" size={iconSize} />
        </motion.div>
      )}
      {!loading && iconName && iconPosition === 'left' && (
        <motion.div variants={iconVariants} className="mr-2">
          <Icon name={iconName} size={iconSize} />
        </motion.div>
      )}
      {children}
      {!loading && iconName && iconPosition === 'right' && (
        <motion.div variants={iconVariants} className="ml-2">
          <Icon name={iconName} size={iconSize} />
        </motion.div>
      )}
    </motion.button>
  );
};

export default AnimatedButton;