import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, FileText } from 'lucide-react';
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

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#04070f' }}>
      <TimerMount />

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
            onClick={goHome}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-200 border border-white/5 hover:border-white/12 hover:bg-white/4 transition-all"
          >
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
            </div>
          </div>
        </div>

        {/* Centre: progress bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <ProgressBar value={progress} label="Investigation" color="purple" showPercent />
        </div>

        {/* Right: timer + accuse */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0">
          <Timer />
          <motion.button
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
          </motion.button>
        </div>
      </header>

      {/* ── 3-PANEL LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Evidence Hub — Left */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="w-60 shrink-0 overflow-hidden"
          style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}
        >
          <EvidenceHub />
        </motion.div>

        {/* Canvas — Centre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="flex-1 overflow-hidden"
        >
          <EvidenceBoardCanvas />
        </motion.div>

        {/* Suspect Panel — Right */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="w-60 shrink-0 overflow-hidden"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}
        >
          <SuspectPanel />
        </motion.div>
      </div>

      <CaseOverview />
      <DecisionModal />
    </div>
  );
}
