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
    <div className="home-page">

      {/* ── ATMOSPHERIC BG LAYERS ── */}
      <AtmosphericBackground />

      {/* ── BLOOD MARKS ── */}
      <BloodMarks />

      {/* ── CRIME TICKER TAPE (top) ── */}
      <div className="home-ticker">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="ticker-item">
                {item}
                <span className="ticker-dot"></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="app-header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="header-brand"
        >
          {/* Logo badge */}
          <div style={{ position: 'relative' }}>
            <div className="header-logo-badge glow-purple">
              <Shield size={18} style={{ color: "var(--accent-purple)" }} />
            </div>
            <span className="logo-pulse-dot"></span>
          </div>
          <div>
            <div className="header-title">CRIMEFILES</div>
            <div className="header-subtitle">Detective Simulator</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="header-status"
        >
          {/* Live indicator */}
          <div className="status-chip live hidden-sm-down">
            <span className="status-dot"></span>
            <span>LIVE</span>
          </div>
          <div className="status-chip edition">
            <Zap size={11} style={{ color: "var(--accent-amber)" }} />
            <span>Hackathon Edition</span>
          </div>
        </motion.div>
      </header>

      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="hero-section hero-grid">

        {/* Decorative ring */}
        <div className="hero-rings">
          <div className="hero-ring-inner animate-spin-slow" />
          <div className="hero-ring-outer" style={{ animation: 'spin-slow 12s linear infinite reverse' }} />
        </div>

        {/* Case file badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
        >
          <span className="hero-badge-pulse"></span>
          <span>Interactive Case Files · 3 Active Investigations</span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-title"
        >
          {/* GLOWING ICON */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], filter: ['drop-shadow(0 0 20px rgba(139,92,246,0.4))', 'drop-shadow(0 0 40px rgba(139,92,246,0.8))', 'drop-shadow(0 0 20px rgba(139,92,246,0.4))'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-emoji animate-float"
          >
            🔍
          </motion.div>

          <h1>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="title-word shimmer-text"
            >
              CRIME
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="title-word text-glow-white"
              style={{ color: '#fff' }}
            >
              INVESTIGATION
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="title-word title-simulator"
            >
              SIMULATOR
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-subtitle"
          >
            Analyse evidence. Expose contradictions.
            <span style={{ color: "var(--accent-purple)" }}> Name the culprit</span> before time runs out.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-stats"
        >
          {[
            { value: '3', label: 'Cases', icon: '📁' },
            { value: '18+', label: 'Evidence Items', icon: '🔎' },
            { value: '9',  label: 'Suspects', icon: '👤' },
            { value: '15–20m', label: 'Per Case', icon: '⏱' },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              {i < 3 && <div className="stat-divider" />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="scroll-indicator"
        >
          <span>SELECT CASE</span>
          <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </section>

      {/* ── CASE SELECTION ── */}
      <section className="case-selection">
        {/* Decorative label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="case-label-row"
        >
          <div className="case-line-left" />
          <div className="case-label-chip">
            <Eye size={12} style={{ color: "var(--accent-purple)" }} />
            <span>Active Case Files</span>
          </div>
          <div className="case-line-right" />
        </motion.div>

        <div className="case-grid">
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
      <div className="footer-wrap">
        <div className="crime-tape footer-tape" />
        <footer className="footer-content">
          <span>
            BUILT WITH ❤ BY{' '}
            <span className="footer-brand">PASTA</span>
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
    <div className="blood-marks-container">
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
        className="blood-svg-layer"
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
        <ellipse cx="30" cy="65" rx="18" ry="20" fill="#8b0000" filter="url(#blood-blur)" />
        <ellipse cx="10" cy="58" rx="6" ry="10" fill="#8b0000" transform="rotate(-30 10 58)" />
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
    <div className="atmospheric-bg">
      {/* Deep purple nebula */}
      <div className="nebula-purple" />
      {/* Red tint bottom right */}
      <div className="nebula-red" />
      {/* Cyan accent */}
      <div className="nebula-cyan" />

      {/* Scanline effect */}
      <div className="scanline-overlay" />

      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-orb"
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
      className="case-card-wrapper"
    >
      {/* Gradient border glow */}
      <div
        className="case-card-glow"
        style={{ background: `linear-gradient(135deg, ${meta.color}60, transparent, ${meta.color}30)`, opacity: isHovered ? 1 : 0 }}
      />

      {/* Card body */}
      <div className="case-card"
        style={{ boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${meta.color}15` : '0 4px 20px rgba(0,0,0,0.4)', borderColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)' }}
      >
        {/* Top accent strip */}
        <div className="case-accent-strip" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`, opacity: isHovered ? 1 : 0.3 }} />

        {/* Case number watermark */}
        <div className="case-watermark">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Header zone */}
        <div className="case-card-header">
          {/* Difficulty badge */}
          <div className="case-badge-row">
            <span
              className="difficulty-badge"
              style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
            >
              {meta.label}
            </span>
            <div className="time-badge">
              <Clock size={10} />
              {Math.floor(caseData.timeLimit / 60)}m
            </div>
          </div>

          {/* Emoji */}
          <motion.div
            animate={isHovered ? { y: -4, scale: 1.08 } : { y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="case-emoji"
            style={{ filter: isHovered ? `drop-shadow(0 0 16px ${meta.color}80)` : 'none' }}
          >
            {caseData.emoji}
          </motion.div>

          {/* Case title */}
          <h3 className="case-title">
            {caseData.title.toUpperCase()}
          </h3>
          <p className="case-subtitle">{caseData.subtitle}</p>

          {/* Location chip */}
          <div className="location-chip">
            <span>📍</span>{caseData.location}
          </div>
        </div>

        {/* Divider */}
        <div className="case-divider" />

        {/* Body */}
        <div className="case-card-body">
          <p className="case-description">
            {caseData.description}
          </p>

          {/* Evidence/Suspect chips */}
          <div className="case-chips-row">
            <InfoChip icon="🧩" value={caseData.suspects.length} label="Suspects" color={meta.color} />
            <InfoChip icon="🔎" value={caseData.evidence.length} label="Evidence" color={meta.color} />
            <InfoChip icon="📍" value={caseData.timeline.length} label="Events" color={meta.color} />
          </div>

          {/* CTA row */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            className="case-cta-row"
          >
            <span className="case-cta-text" style={{ color: meta.color }}>
              Open Case File
            </span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              className="case-cta-icon"
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
          className="case-hover-line"
          style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function InfoChip({ icon, value, label, color }) {
  return (
    <div className="info-chip">
      <span className="info-icon">{icon}</span>
      <span className="info-value" style={{ color }}>{value}</span>
      <span className="info-label">{label}</span>
    </div>
  );
}
