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
    'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 select-none cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed tracking-wide';

  const variants = {
    primary: {
      style: {
        background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6d28d9 100%)',
        boxShadow: '0 4px 24px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        border: '1px solid rgba(167,139,250,0.3)',
      },
      className: 'text-white hover:brightness-110',
    },
    danger: {
      style: {
        background: 'linear-gradient(135deg, #b91c1c 0%, #ef4444 50%, #dc2626 100%)',
        boxShadow: '0 4px 24px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        border: '1px solid rgba(252,165,165,0.25)',
      },
      className: 'text-white hover:brightness-110',
    },
    ghost: {
      style: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      },
      className: 'text-slate-300 hover:text-white hover:bg-white/6 hover:border-white/15',
    },
    amber: {
      style: {
        background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #b45309 100%)',
        boxShadow: '0 4px 24px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
        border: '1px solid rgba(251,191,36,0.3)',
      },
      className: 'text-black font-black hover:brightness-110',
    },
    emerald: {
      style: {
        background: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #065f46 100%)',
        boxShadow: '0 4px 24px rgba(16,185,129,0.25)',
        border: '1px solid rgba(52,211,153,0.3)',
      },
      className: 'text-white hover:brightness-110',
    },
    outline: {
      style: {
        background: 'rgba(139,92,246,0.06)',
        border: '1px solid rgba(139,92,246,0.3)',
      },
      className: 'text-purple-400 hover:bg-purple-500/12 hover:border-purple-400/50',
    },
  };

  const sizes = {
    sm: 'text-[11px] px-3 py-1.5',
    md: 'text-xs px-5 py-2.5',
    lg: 'text-sm px-7 py-3.5',
    xl: 'text-base px-9 py-4',
  };

  const v = variants[variant] || variants.primary;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97, y: 0 }}
      className={`${base} ${v.className} ${sizes[size]} ${className}`}
      style={v.style}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
