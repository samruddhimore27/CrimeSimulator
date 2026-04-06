import React from 'react';
import { motion } from 'framer-motion';

export function ProgressBar({ value = 0, label, color = 'purple', showPercent = true }) {
  const colors = {
    purple: 'bg-purple-500',
    amber:  'bg-amber-500',
    red:    'bg-red-500',
    emerald: 'bg-emerald-500',
    cyan:   'bg-cyan-500',
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
          {showPercent && (
            <span className="text-xs font-mono text-slate-300">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, value)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
