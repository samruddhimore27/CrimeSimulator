import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../../hooks/useTimer';

export function Timer() {
  const { timeRemaining, formatTime, urgencyLevel } = useTimer();

  const isCritical = urgencyLevel === 'critical';
  const isWarning  = urgencyLevel === 'warning';

  let timerClass = 'timer-box';
  if (isCritical) timerClass += ' timer-critical';
  else if (isWarning) timerClass += ' timer-warning';
  else timerClass += ' timer-normal';

  return (
    <div className={timerClass}>
      <motion.span
        key={isCritical ? 'crit' : 'norm'}
        initial={{ scale: 1 }}
        animate={isCritical ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="timer-icon"
      >
        ⏱
      </motion.span>
      <span className="timer-text">{formatTime(timeRemaining)}</span>
    </div>
  );
}
