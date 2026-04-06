import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, glow = false, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      onClick={onClick}
      className={`glass-card p-4 ${glow ? 'glow-purple' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
