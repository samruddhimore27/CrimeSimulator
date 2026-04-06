import React from 'react';
import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 border border-purple-500/30',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40 hover:shadow-red-700/50 border border-red-500/30',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20',
    amber:
      'bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-900/40 border border-amber-400/30',
    emerald:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 border border-emerald-500/30',
    outline:
      'bg-transparent border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
    xl: 'text-lg px-9 py-4',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
