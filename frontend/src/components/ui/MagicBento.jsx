
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

const MagicBento = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const lightColor = 'rgba(59, 130, 246, 0.15)';
  const darkColor = 'rgba(59, 130, 246, 0.2)';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-colors duration-300"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? darkColor : lightColor}, transparent 80%)`,
      }}
    />
  );
};

export default MagicBento;
