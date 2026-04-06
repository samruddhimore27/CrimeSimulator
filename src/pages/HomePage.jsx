import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Clock, ChevronRight, Zap, Eye, Lock, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CASES } from '../data/cases';

const DIFFICULTY_META = {
  Beginner:     { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)', label: '● BEGINNER' },
  Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', label: '●● INTERMEDIATE' },
  Hard:         { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',  label: '●●● HARD' },
};

const TICKER_ITEMS = [
  '🔍 NEW CASE UNLOCKED', '⚠ EVIDENCE CLASSIFIED', '🚨 ACTIVE INVESTIGATION',
  '📡 SIGNAL INTERCEPTED', '🔒 FILE ENCRYPTED', '⚖ JUSTICE PENDING',
  '🧪 LAB RESULTS IN', '📷 SURVEILLANCE ACTIVE', '🔍 NEW CASE UNLOCKED',
  '⚠ EVIDENCE CLASSIFIED', '🚨 ACTIVE INVESTIGATION', '📡 SIGNAL INTERCEPTED',
];

export function HomePage() {
  const { selectCase } = useGameStore();
  const [hoveredCase, setHoveredCase] = useState(null);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#030508]">

      {/* ── ATMOSPHERIC BG LAYERS ── */}
      <AtmosphericBackground />

      {/* ── BLOOD MARKS ── */}
      <BloodMarks />

      {/* ── CRIME TICKER TAPE (top) ── */}
      <div className="relative z-20 w-full overflow-hidden border-b border-amber-500/15 bg-amber-500/3 py-1.5">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 mx-8 text-[10px] font-mono font-semibold text-amber-400/70 tracking-widest uppercase">
                {item}
                <span className="w-1 h-1 rounded-full bg-amber-500/40 mx-2"></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-20 flex items-center justify-between px-8 py-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {/* Logo badge */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center glow-purple">
              <Shield size={18} className="text-purple-400" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#030508] animate-pulse"></span>
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-widest font-display">CRIMEFILES</div>
            <div className="text-[9px] text-purple-400/60 font-mono tracking-[0.25em] uppercase">Detective Simulator</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-semibold text-red-400 tracking-widest">LIVE</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/4 border border-white/8">
            <Zap size={11} className="text-amber-400" />
            <span className="text-[10px] text-slate-400 font-semibold">Hackathon Edition</span>
          </div>
        </motion.div>
      </header>

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-12 hero-grid">

        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-purple-500/5 animate-spin-slow" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/4" style={{ animation: 'spin-slow 12s linear infinite reverse' }} />
        </div>

        {/* Case file badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/8 border border-purple-500/20"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse inline-block"></span>
          <span className="text-xs font-semibold font-mono text-purple-300 tracking-widest uppercase">Interactive Case Files · 3 Active Investigations</span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          {/* GLOWING ICON */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], filter: ['drop-shadow(0 0 20px rgba(139,92,246,0.4))', 'drop-shadow(0 0 40px rgba(139,92,246,0.8))', 'drop-shadow(0 0 20px rgba(139,92,246,0.4))'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-6 block animate-float"
          >
            🔍
          </motion.div>

          <h1 className="font-display text-[72px] md:text-[96px] leading-none tracking-tight mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="block shimmer-text"
            >
              CRIME
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block text-white text-glow-white"
            >
              INVESTIGATION
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-white/30 text-[40px] md:text-[52px]"
              style={{ letterSpacing: '1rem' }}
            >
              SIMULATOR
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
          >
            Analyse evidence. Expose contradictions.
            <span className="text-purple-300"> Name the culprit</span> before time runs out.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-0 mb-14 rounded-2xl overflow-hidden border border-white/6 bg-white/2"
        >
          {[
            { value: '3', label: 'Cases', icon: '📁' },
            { value: '18+', label: 'Evidence Items', icon: '🔎' },
            { value: '9',  label: 'Suspects', icon: '👤' },
            { value: '15–20m', label: 'Per Case', icon: '⏱' },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="px-7 py-4 text-center">
                <div className="text-xs mb-1">{stat.icon}</div>
                <div className="text-xl font-black font-mono text-purple-300">{stat.value}</div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">{stat.label}</div>
              </div>
              {i < 3 && <div className="w-px h-10 bg-white/6" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-slate-700"
        >
          <span className="text-[10px] font-mono tracking-widest">SELECT CASE</span>
          <ChevronRight size={14} className="rotate-90" />
        </motion.div>
      </section>

      {/* ── CASE SELECTION ── */}
      <section className="relative z-10 px-6 pb-8 max-w-6xl mx-auto w-full">
        {/* Decorative label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex-1 h-px bg-linear-to-r from-transparent to-purple-500/20" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5">
            <Eye size={12} className="text-purple-400" />
            <span className="text-[11px] font-mono text-purple-400 tracking-widest uppercase">Active Case Files</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent to-purple-500/20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <PremiumCaseCard
              key={c.id}
              caseData={c}
              index={i}
              isHovered={hoveredCase === c.id}
              onHover={() => setHoveredCase(c.id)}
              onLeave={() => setHoveredCase(null)}
              onSelect={() => selectCase(c.id)}
            />
          ))}
        </div>
      </section>

      {/* ── CRIME TAPE FOOTER ── */}
      <div className="relative z-10 mt-auto">
        <div className="crime-tape h-4 opacity-30" />
        <footer className="bg-[#030508] border-t border-white/4 py-5 text-center">
          <span className="text-slate-700 text-xs font-mono tracking-widest">
            BUILT WITH ❤ BY{' '}
            <span className="text-purple-500/70 font-bold tracking-[0.3em]">PASTA</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

// ── BLOOD MARKS ──────────────────────────────────────────────────────────────

// Individual blood drip path
const DRIPS = [
  { id: 'd1', x: '8%',  y: 0, delay: 0.3,  dur: 1.2, h: 120, w: 10, opacity: 0.55 },
  { id: 'd2', x: '15%', y: 0, delay: 1.1,  dur: 0.9, h: 80,  w: 7,  opacity: 0.4  },
  { id: 'd3', x: '88%', y: 0, delay: 0.6,  dur: 1.4, h: 150, w: 12, opacity: 0.5  },
  { id: 'd4', x: '93%', y: 0, delay: 1.8,  dur: 1.0, h: 60,  w: 6,  opacity: 0.35 },
  { id: 'd5', x: '72%', y: 0, delay: 2.4,  dur: 1.1, h: 95,  w: 9,  opacity: 0.45 },
  { id: 'd6', x: '3%',  y: 0, delay: 3.0,  dur: 1.3, h: 70,  w: 7,  opacity: 0.3  },
];

const SPATTERS = [
  { id: 's1', cx: '10%',  cy: '18%', r: 28 },
  { id: 's2', cx: '85%',  cy: '12%', r: 22 },
  { id: 's3', cx: '5%',   cy: '55%', r: 18 },
  { id: 's4', cx: '92%',  cy: '48%', r: 32 },
  { id: 's5', cx: '18%',  cy: '80%', r: 20 },
  { id: 's6', cx: '78%',  cy: '75%', r: 15 },
];

function BloodMarks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* ── Top-edge blood drips  ────────────────── */}
      {DRIPS.map((d) => (
        <motion.div
          key={d.id}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: d.opacity }}
          transition={{ delay: d.delay, duration: d.dur, ease: [0.4, 0, 0.6, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: d.x,
            width: d.w,
            height: d.h,
            transformOrigin: 'top center',
            background: `linear-gradient(180deg,
              #8b0000 0%,
              #a00000 40%,
              #700000cc 75%,
              transparent 100%
            )`,
            borderRadius: '0 0 50% 50%',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Drop at the tip of each drip */}
      {DRIPS.map((d) => (
        <motion.div
          key={`drop-${d.id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: d.opacity * 0.9 }}
          transition={{ delay: d.delay + d.dur * 0.85, duration: 0.35, type: 'spring', stiffness: 300 }}
          style={{
            position: 'absolute',
            top: d.h - 6,
            left: `calc(${d.x} - ${d.w * 0.4}px)`,
            width: d.w * 1.8,
            height: d.w * 1.8,
            borderRadius: '50%',
            background: '#8b0000',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* ── Blood splatter blobs ─────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blood-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.15" />
          </filter>
          <filter id="blood-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.25" result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>

        {/* Main splatters */}
        {SPATTERS.map((s, i) => (
          <motion.g key={s.id} filter="url(#blood-goo)">
            <motion.circle
              cx={s.cx} cy={s.cy} r={s.r * 0.018}
              fill="#8b0000"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 1.5 + i * 0.25, duration: 0.5, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${s.cx} ${s.cy}` }}
            />
            {/* Satellite micro drops */}
            {[...Array(5)].map((_, j) => {
              const angle = (j / 5) * Math.PI * 2;
              const dist  = s.r * 0.025 + j * 0.004;
              const mx    = `calc(${s.cx} + ${Math.cos(angle) * dist}%)`;
              const my    = `calc(${s.cy} + ${Math.sin(angle) * dist}%)`;
              return (
                <motion.circle
                  key={j}
                  cx={`${parseFloat(s.cx) + Math.cos(angle) * s.r * 0.025}%`}
                  cy={`${parseFloat(s.cy) + Math.sin(angle) * s.r * 0.02}%`}
                  r={s.r * 0.005 + j * 0.001}
                  fill="#700000"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.4 }}
                  transition={{ delay: 1.7 + i * 0.25 + j * 0.06, duration: 0.3 }}
                />
              );
            })}
          </motion.g>
        ))}

        {/* Smear trail — top left corner */}
        <motion.path
          d="M 2 5 Q 8 12 5 22 Q 3 28 8 35"
          stroke="#6b0000"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity={0}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 3.2, duration: 1.5 }}
          style={{ filter: 'blur(0.3px)' }}
        />

        {/* Smear trail — bottom right corner */}
        <motion.path
          d="M 95 82 Q 90 78 93 70 Q 95 64 91 58"
          stroke="#6b0000"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          opacity={0}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 3.8, duration: 1.5 }}
          style={{ filter: 'blur(0.3px)' }}
        />
      </svg>

      {/* ── Blood handprint — left edge ──────────── */}
      <motion.svg
        viewBox="0 0 60 90"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.18, rotate: -15 }}
        transition={{ delay: 4.5, duration: 1.2 }}
        style={{ position: 'absolute', left: '-8px', top: '38%', width: 60, height: 90 }}
      >
        {/* Palm */}
        <ellipse cx="30" cy="65" rx="18" ry="20" fill="#8b0000" filter="url(#blood-blur)" />
        {/* Thumb */}
        <ellipse cx="10" cy="58" rx="6" ry="10" fill="#8b0000" transform="rotate(-30 10 58)" />
        {/* Fingers */}
        <ellipse cx="16" cy="38" rx="5" ry="14" fill="#8b0000" transform="rotate(-10 16 38)" />
        <ellipse cx="26" cy="32" rx="5" ry="15" fill="#8b0000" />
        <ellipse cx="36" cy="33" rx="5" ry="14" fill="#8b0000" transform="rotate(5 36 33)" />
        <ellipse cx="46" cy="38" rx="5" ry="13" fill="#8b0000" transform="rotate(15 46 38)" />
      </motion.svg>

      {/* ── Faint handprint — right corner ───────── */}
      <motion.svg
        viewBox="0 0 60 90"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, rotate: 30 }}
        animate={{ opacity: 0.1, rotate: 30 }}
        transition={{ delay: 5.2, duration: 1.4 }}
        style={{ position: 'absolute', right: '-4px', bottom: '22%', width: 50, height: 75 }}
      >
        <ellipse cx="30" cy="65" rx="18" ry="20" fill="#8b0000" />
        <ellipse cx="10" cy="58" rx="6" ry="10" fill="#8b0000" transform="rotate(-30 10 58)" />
        <ellipse cx="16" cy="38" rx="5" ry="14" fill="#8b0000" transform="rotate(-10 16 38)" />
        <ellipse cx="26" cy="32" rx="5" ry="15" fill="#8b0000" />
        <ellipse cx="36" cy="33" rx="5" ry="14" fill="#8b0000" transform="rotate(5 36 33)" />
        <ellipse cx="46" cy="38" rx="5" ry="13" fill="#8b0000" transform="rotate(15 46 38)" />
      </motion.svg>

      {/* ── Pulsing red vignette edge ─────────────── */}
      <motion.div
        animate={{ opacity: [0, 0.07, 0.04, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(139,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ── ATMOSPHERIC BACKGROUND ─────────────────────────────────────────────────

function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep purple nebula */}
      <div className="absolute top-[-30%] left-[-20%] w-[900px] h-[900px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)' }} />
      {/* Red tint bottom right */}
      <div className="absolute bottom-[-20%] right-[-15%] w-[700px] h-[700px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)' }} />
      {/* Cyan accent */}
      <div className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)' }} />

      {/* Scanline effect */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)'
        }}
      />

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 3 + i * 2,
            height: 3 + i * 2,
            left: `${15 + i * 18}%`,
            top: `${20 + i * 12}%`,
            background: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
            opacity: 0.2 + i * 0.05,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </div>
  );
}

// ── PREMIUM CASE CARD ──────────────────────────────────────────────────────

function PremiumCaseCard({ caseData, index, isHovered, onHover, onLeave, onSelect }) {
  const meta = DIFFICULTY_META[caseData.difficulty] || DIFFICULTY_META.Hard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.12, type: 'spring', damping: 18, stiffness: 180 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onSelect}
      className="relative cursor-pointer group"
    >
      {/* Gradient border glow */}
      <div
        className="absolute -inset-0.5 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${meta.color}60, transparent, ${meta.color}30)` }}
      />

      {/* Card body */}
      <div className="relative rounded-[16px] overflow-hidden border border-white/6 bg-[#0a1119] group-hover:border-white/12 transition-all duration-300"
        style={{ boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${meta.color}15` : '0 4px 20px rgba(0,0,0,0.4)' }}
      >
        {/* Top accent strip */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`, opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />

        {/* Case number watermark */}
        <div className="absolute top-4 right-4 font-display text-[80px] leading-none font-bold opacity-[0.035] text-white select-none pointer-events-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Header zone */}
        <div className="relative px-5 pt-5 pb-4">
          {/* Difficulty badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-md tracking-widest border"
              style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
            >
              {meta.label}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-mono">
              <Clock size={10} />
              {Math.floor(caseData.timeLimit / 60)}m
            </div>
          </div>

          {/* Emoji */}
          <motion.div
            animate={isHovered ? { y: -4, scale: 1.08 } : { y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="text-5xl mb-4 block"
            style={{ filter: isHovered ? `drop-shadow(0 0 16px ${meta.color}80)` : 'none', transition: 'filter 0.3s' }}
          >
            {caseData.emoji}
          </motion.div>

          {/* Case title */}
          <h3 className="font-display text-xl text-white tracking-wide mb-1 leading-tight">
            {caseData.title.toUpperCase()}
          </h3>
          <p className="text-xs text-slate-500 mb-3 font-medium">{caseData.subtitle}</p>

          {/* Location chip */}
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 bg-white/3 border border-white/6 rounded-md px-2 py-1">
            <span>📍</span>{caseData.location}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-white/5" />

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
            {caseData.description}
          </p>

          {/* Evidence/Suspect chips */}
          <div className="flex gap-2 mb-4">
            <InfoChip icon="🧩" value={caseData.suspects.length} label="Suspects" color={meta.color} />
            <InfoChip icon="🔎" value={caseData.evidence.length} label="Evidence" color={meta.color} />
            <InfoChip icon="📍" value={caseData.timeline.length} label="Events" color={meta.color} />
          </div>

          {/* CTA row */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between"
          >
            <span className="text-[11px] font-semibold font-mono tracking-wider uppercase" style={{ color: meta.color }}>
              Open Case File
            </span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: meta.bg, border: `1px solid ${meta.border}` }}
            >
              <ChevronRight size={12} style={{ color: meta.color }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom hover line */}
        <motion.div
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-0.5 origin-left"
          style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function InfoChip({ icon, value, label, color }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/3 border border-white/5 flex-1 justify-center">
      <span className="text-[10px]">{icon}</span>
      <span className="text-[10px] font-bold font-mono" style={{ color }}>{value}</span>
      <span className="text-[9px] text-slate-700 hidden sm:block">{label}</span>
    </div>
  );
}
