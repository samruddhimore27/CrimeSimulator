import React from 'react';
import { motion } from 'framer-motion';

export function Loading({ text = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <motion.div
        className="w-12 h-12 border-2 border-purple-500/40 border-t-purple-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <p className="text-slate-400 text-sm font-mono tracking-widest animate-pulse">{text}</p>
    </div>
  );
}
