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
    <div className="game-layout">
      <TimerMount />

      {/* ── TOP BAR ── */}
      <header className="game-header">
        {/* Animated top edge line */}
        <div className="game-header-glow-line" />

        {/* Left: exit + case name */}
        <div className="game-header-left">
          <button
            onClick={goHome}
            className="game-exit-btn"
          >
            <ArrowLeft size={12} />
            <span className="game-exit-text">Exit</span>
          </button>

          {/* Divider */}
          <div className="game-header-divider" />

          {/* Case badge */}
          <div className="game-case-badge">
            <div className="game-case-icon">
              <FileText size={11} style={{ color: "var(--accent-purple)" }} />
            </div>
            <div className="game-case-info">
              <div className="game-case-title">
                {currentCase?.title?.toUpperCase()}
              </div>
              <div className="game-case-location">{currentCase?.location}</div>
            </div>
          </div>
        </div>

        {/* Centre: progress bar */}
        <div className="game-header-centre">
          <ProgressBar value={progress} label="Investigation" color="purple" showPercent />
        </div>

        {/* Right: timer + accuse */}
        <div className="game-header-right">
          <Timer />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openAccuseModal}
            disabled={discoveredEvidenceIds.length < 2}
            className={`btn-action game-accuse-btn ${discoveredEvidenceIds.length < 2 ? 'disabled' : ''}`}
          >
            <Target size={12} className="accuse-icon" />
            <span className="accuse-text">ACCUSE</span>
          </motion.button>
        </div>
      </header>

      {/* ── 3-PANEL LAYOUT ── */}
      <div className="game-main-content">
        {/* Evidence Hub — Left */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="game-panel-side panel"
        >
          <EvidenceHub />
        </motion.div>

        {/* Canvas — Centre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="game-panel-centre"
        >
          <EvidenceBoardCanvas />
        </motion.div>

        {/* Suspect Panel — Right */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="game-panel-side panel"
        >
          <SuspectPanel />
        </motion.div>
      </div>

      <CaseOverview />
      <DecisionModal />
    </div>
  );
}
