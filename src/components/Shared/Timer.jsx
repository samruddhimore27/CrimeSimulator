import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../../hooks/useTimer';

export function Timer() {
  const { timeRemaining, formatTime, urgencyLevel } = useTimer();

  const pct = Math.max(0, timeRemaining);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  // We don't know initial time limit here so we just animate colour
  const isCritical = urgencyLevel === 'critical';
  const isWarning  = urgencyLevel === 'warning';

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-sm font-semibold transition-colors duration-500 ${
        isCritical
          ? 'bg-red-900/30 border-red-500/50 text-red-400 timer-critical'
          : isWarning
          ? 'bg-amber-900/20 border-amber-500/40 text-amber-400'
          : 'bg-slate-800/60 border-white/10 text-slate-200'
      }`}
    >
      <motion.span
        key={isCritical ? 'crit' : 'norm'}
        initial={{ scale: 1 }}
        animate={isCritical ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-base"
      >
        ⏱
      </motion.span>
      <span>{formatTime(timeRemaining)}</span>
    </div>
  );
}
