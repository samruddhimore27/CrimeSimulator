import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, FileText, Radio, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useTimer } from '../hooks/useTimer';
import { useGameLogic } from '../hooks/useGameLogic';
import { EvidenceHub } from '../components/EvidenceHub';
import { EvidenceBoardCanvas } from '../components/EvidenceBoardCanvas';
import { SuspectPanel } from '../components/SuspectPanel';
import { CaseOverview } from '../components/CaseOverview';
import { DecisionModal } from '../components/DecisionModal';
import { Timer } from '../components/Shared/Timer';
import { ProgressBar } from '../components/Shared/ProgressBar';
import { Button } from '../components/Shared/Button';

function TimerMount() {
  useTimer();
  return null;
}

export function GamePage() {
  const { currentCase, goHome, openAccuseModal, discoveredEvidenceIds } = useGameStore();
  const { investigationProgress } = useGameLogic();
  const progress = investigationProgress();
  const canAccuse = discoveredEvidenceIds.length >= 2;

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#04070f' }}>
      <TimerMount />

<<<<<<< Updated upstream
      {/* ── TOP BAR ── */}
      <header className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0 relative"
        style={{
          background: 'linear-gradient(180deg, #080d16 0%, #060a12 100%)',
          borderColor: 'rgba(255,255,255,0.05)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
        }}
      >
        {/* Animated top edge line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(6,182,212,0.4), transparent)' }} />

        {/* Left: exit + case name */}
        <div className="flex items-center gap-3 min-w-0">
          <button
=======
      {/* ── COMMAND CENTER HEADER ── */}
      <header className="game-header">
        {/* Animated rainbow top glow line */}
        <div className="game-header-glow-line" />

        {/* Scanline overlay on header */}
        <div className="game-header-scanline" />

        {/* LEFT: exit + classification + case name */}
        <div className="game-header-left">
          <motion.button
            whileHover={{ scale: 1.04, x: -2 }}
            whileTap={{ scale: 0.96 }}
>>>>>>> Stashed changes
            onClick={goHome}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-200 border border-white/5 hover:border-white/12 hover:bg-white/4 transition-all"
          >
<<<<<<< Updated upstream
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Exit</span>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/8" />

          {/* Case badge */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-6 h-6 rounded shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
              <FileText size={11} className="text-purple-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-200 truncate font-display tracking-wider">
                {currentCase?.title?.toUpperCase()}
              </div>
              <div className="text-[9px] text-slate-600 truncate font-mono">{currentCase?.location}</div>
=======
            <ArrowLeft size={13} />
            <span className="game-exit-text">Exit</span>
          </motion.button>

          <div className="game-header-divider" />

          {/* LIVE pulse dot */}
          <div className="game-live-chip">
            <span className="game-live-dot" />
            <span>LIVE</span>
          </div>

          <div className="game-header-divider" />

          {/* Case badge */}
          <div className="game-case-badge">
            <div className="game-case-icon">
              <FileText size={11} style={{ color: 'var(--accent-purple)' }} />
            </div>
            <div className="game-case-info">
              <div className="game-case-title">{currentCase?.title?.toUpperCase()}</div>
              <div className="game-case-location">
                <span style={{ color: 'var(--accent-emerald)', marginRight: 4 }}>●</span>
                {currentCase?.location}
              </div>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Centre: progress bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <ProgressBar value={progress} label="Investigation" color="purple" showPercent />
        </div>

        {/* Right: timer + accuse */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0">
=======
        {/* CENTRE: investigation progress */}
        <div className="game-header-centre">
          <ProgressBar value={progress} label="Investigation Progress" color="purple" showPercent />
        </div>

        {/* RIGHT: timer + accuse */}
        <div className="game-header-right">
>>>>>>> Stashed changes
          <Timer />

          <motion.button
<<<<<<< Updated upstream
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openAccuseModal}
            disabled={discoveredEvidenceIds.length < 2}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08))',
              borderColor: 'rgba(239,68,68,0.35)',
              boxShadow: discoveredEvidenceIds.length >= 2 ? '0 0 16px rgba(239,68,68,0.15)' : 'none'
            }}
          >
            <Target size={12} className="text-red-400" />
            <span className="font-display tracking-wider">ACCUSE</span>
=======
            whileHover={canAccuse ? { scale: 1.04 } : {}}
            whileTap={canAccuse ? { scale: 0.96 } : {}}
            onClick={canAccuse ? openAccuseModal : undefined}
            className={`game-accuse-btn ${!canAccuse ? 'disabled' : ''}`}
            title={!canAccuse ? 'Collect at least 2 pieces of evidence first' : 'Make your accusation'}
          >
            <Target size={13} className="accuse-icon" />
            <span className="accuse-text">ACCUSE</span>
            {canAccuse && (
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="accuse-ready-dot"
              />
            )}
>>>>>>> Stashed changes
          </motion.button>
        </div>
      </header>

<<<<<<< Updated upstream
      {/* ── 3-PANEL LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
=======
      {/* ── 3-PANEL COMMAND CENTER LAYOUT ── */}
      <div className="game-main-content">

>>>>>>> Stashed changes
        {/* Evidence Hub — Left */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
<<<<<<< Updated upstream
          transition={{ delay: 0.08 }}
          className="w-60 shrink-0 overflow-hidden"
          style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
=======
          transition={{ delay: 0.08, type: 'spring', damping: 20 }}
          className="game-panel-side panel game-panel-evidence"
>>>>>>> Stashed changes
        >
          <div className="panel-top-accent panel-accent-purple" />
          <EvidenceHub />
        </motion.div>

        {/* Canvas — Centre */}
        <motion.div
<<<<<<< Updated upstream
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="flex-1 overflow-hidden"
=======
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.16, type: 'spring', damping: 22 }}
          className="game-panel-centre"
>>>>>>> Stashed changes
        >
          <EvidenceBoardCanvas />
        </motion.div>

        {/* Suspect Panel — Right */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
<<<<<<< Updated upstream
          transition={{ delay: 0.08 }}
          className="w-60 shrink-0 overflow-hidden"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}
=======
          transition={{ delay: 0.08, type: 'spring', damping: 20 }}
          className="game-panel-side panel game-panel-suspects"
>>>>>>> Stashed changes
        >
          <div className="panel-top-accent panel-accent-red" />
          <SuspectPanel />
        </motion.div>
      </div>

      <CaseOverview />
      <DecisionModal />
    </div>
  );
}
