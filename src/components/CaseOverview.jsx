import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, User, AlertTriangle, FileText, Shield, Lock } from 'lucide-react';
import { Button } from './Shared/Button';
import { useGameStore } from '../store/gameStore';

export function CaseOverview() {
  const { currentCase, startGame, showBriefing } = useGameStore();
  if (!showBriefing || !currentCase) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(3,5,8,0.92)', backdropFilter: 'blur(20px)' }}
      >
<<<<<<< Updated upstream
        {/* Decorative spotlight */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' }} />
=======
        {/* Atmospheric glow */}
        <div className="overview-spotlight-wrapper">
          <div className="overview-spotlight" />
>>>>>>> Stashed changes
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.90, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
<<<<<<< Updated upstream
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="relative max-w-xl w-full z-10"
        >
          {/* Glow border */}
          <div className="absolute -inset-0.5 rounded-[20px] blur-md opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.2), rgba(139,92,246,0.1))' }} />

          <div className="relative rounded-[18px] overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #0f1a2a 0%, #080e18 100%)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            {/* Top stripe — crime tape */}
            <div className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #8b5cf6, #06b6d4, #8b5cf6, #7c3aed)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }} />

            {/* Classification banner */}
            <div className="flex items-center justify-between px-6 py-2.5 border-b"
              style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.12)' }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[10px] font-mono font-bold text-amber-400/80 tracking-[0.2em] uppercase">TOP SECRET · CASE BRIEFING</span>
              </div>
              <span className="text-[10px] font-mono text-amber-500/40">CASE #{currentCase.id.replace('case-', '').padStart(4, '0')}</span>
            </div>

            {/* Hero */}
            <div className="px-6 pt-8 pb-5 text-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1], filter: ['drop-shadow(0 0 20px rgba(139,92,246,0.4))', 'drop-shadow(0 0 40px rgba(139,92,246,0.8))', 'drop-shadow(0 0 20px rgba(139,92,246,0.4))'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-5 block"
=======
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 240 }}
          className="overview-modal-wrap"
        >
          {/* Animated border glow */}
          <div className="overview-glow-border" />

          <div className="overview-modal-content">
            {/* Crime tape top edge */}
            <div className="overview-crime-tape" />

            {/* Classification header bar */}
            <div className="overview-classification">
              <div className="class-left">
                <span className="class-pulse-dot" />
                <Lock size={10} style={{ color: '#ef4444', opacity: 0.7 }} />
                <span className="class-title">TOP SECRET · CASE BRIEFING</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="class-id">
                  CASE #{currentCase.id.replace('case-', '').padStart(4, '0')}
                </span>
                <div style={{
                  padding: '2px 8px', borderRadius: 4,
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
                  color: '#f87171', letterSpacing: '0.1em', fontWeight: 700,
                }}>
                  CLASSIFIED
                </div>
              </div>
            </div>

            {/* Hero area */}
            <div className="overview-hero">
              {/* Emoji with glow */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  filter: [
                    'drop-shadow(0 0 16px rgba(139,92,246,0.4))',
                    'drop-shadow(0 0 48px rgba(139,92,246,0.9))',
                    'drop-shadow(0 0 16px rgba(139,92,246,0.4))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="overview-emoji"
>>>>>>> Stashed changes
              >
                {currentCase.emoji}
              </motion.div>

              <h2 className="font-display text-3xl text-white mb-1.5 text-glow-white">
                {currentCase.title.toUpperCase()}
              </h2>
              <p className="text-sm text-slate-500 mb-5">{currentCase.subtitle}</p>

              {/* Meta chips */}
<<<<<<< Updated upstream
              <div className="flex flex-wrap justify-center gap-2 mb-5">
=======
              <div className="overview-meta-chips">
>>>>>>> Stashed changes
                <MetaBadge icon={<MapPin size={11} />} text={currentCase.location} color="purple" />
                <MetaBadge icon={<Clock size={11} />} text={currentCase.timeOfCrime} color="amber" />
                <MetaBadge icon={<User size={11} />} text={`Victim: ${currentCase.victim}`} color="red" />
              </div>

<<<<<<< Updated upstream
              {/* Description */}
              <div className="text-left p-4 rounded-xl mb-5 text-sm text-slate-400 leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {currentCase.description}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
=======
              {/* Description box — styled as a classified document */}
              <div className="overview-description">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <FileText size={11} style={{ color: 'rgba(139,92,246,0.6)' }} />
                  <span style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(139,92,246,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
                    Case Summary
                  </span>
                </div>
                {currentCase.description}
              </div>

              {/* Stat boxes */}
              <div className="overview-stats-grid">
>>>>>>> Stashed changes
                <StatBox value={currentCase.suspects.length} label="Suspects" color="#8b5cf6" icon="👤" />
                <StatBox value={currentCase.evidence.length} label="Evidence" color="#06b6d4" icon="🔎" />
                <StatBox value={`${Math.floor(currentCase.timeLimit / 60)}m`} label="Time Limit" color="#f59e0b" icon="⏱" />
              </div>

<<<<<<< Updated upstream
              {/* Warning */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl mb-6"
                style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-red-400/70 leading-relaxed text-left">
                  A wrong accusation costs <strong className="text-red-400">500 points</strong>. Gather evidence before naming a suspect.
                </p>
              </div>

              <Button onClick={startGame} variant="primary" size="lg" className="w-full text-sm tracking-widest font-display" icon="🔍">
=======
              {/* Warning strip */}
              <div className="overview-warning">
                <AlertTriangle size={14} className="warning-exclamation" />
                <p className="warning-text">
                  A wrong accusation costs <strong style={{ color: '#f87171' }}>500 points</strong>.
                  Gather evidence before naming a suspect.
                </p>
              </div>

              {/* CTA */}
              <Button onClick={startGame} variant="primary" size="lg" className="overview-start-btn" icon="🔍">
>>>>>>> Stashed changes
                BEGIN INVESTIGATION
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MetaBadge({ icon, text, color }) {
<<<<<<< Updated upstream
  const styles = {
    purple: { color: '#a78bfa', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
    amber:  { color: '#fbbf24', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)' },
    red:    { color: '#f87171', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)' },
  };
  const s = styles[color];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
=======
  return (
    <span className={`meta-badge color-${color}`}>
>>>>>>> Stashed changes
      {icon}{text}
    </span>
  );
}

function StatBox({ value, label, color, icon }) {
  return (
<<<<<<< Updated upstream
    <div className="text-center py-3 px-2 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="text-base mb-0.5">{icon}</div>
      <div className="text-xl font-black font-mono mb-0.5" style={{ color }}>{value}</div>
      <div className="text-[9px] text-slate-600 uppercase tracking-wider">{label}</div>
    </div>
=======
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: 'spring', damping: 14 }}
      className="overview-stat-box"
    >
      <div className="stat-box-icon">{icon}</div>
      <div className="stat-box-val" style={{ color }}>{value}</div>
      <div className="stat-box-label">{label}</div>
    </motion.div>
>>>>>>> Stashed changes
  );
}
