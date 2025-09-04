import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0, 
  hover = true, 
  tap = true,
  onClick,
  ...props 
}) => {
  const { isDark } = useTheme();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const hoverVariants = hover ? {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  } : {};

  const tapVariants = tap ? {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 0.2, 1]
    }
  } : {};

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={hoverVariants}
      whileTap={tapVariants}
      onClick={onClick}
      className={`
        bg-card border border-border rounded-2xl shadow-elevation-1
        hover:shadow-elevation-2 transition-all duration-300
        ${isDark ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm' : 'bg-white/80 border-slate-200/50 backdrop-blur-sm'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;