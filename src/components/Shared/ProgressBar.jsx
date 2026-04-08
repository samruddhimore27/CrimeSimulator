import React from 'react';
import { motion } from 'framer-motion';

export function ProgressBar({ value = 0, label, color = 'purple', showPercent = true }) {
  const barClass = `progress-fill color-${color}`;

  return (
    <div className="progress-container">
      {(label || showPercent) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercent && (
            <span className="progress-percent">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <div className="progress-track">
        <motion.div
          className={barClass}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
