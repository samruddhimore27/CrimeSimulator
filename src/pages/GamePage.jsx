import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target } from 'lucide-react';
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

// The timer hook must be mounted here so the interval runs
function TimerMount() {
  useTimer();
  return null;
}

export function GamePage() {
  const { currentCase, goHome, openAccuseModal, discoveredEvidenceIds } = useGameStore();
  const { investigationProgress } = useGameLogic();

  const progress = investigationProgress();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#060810]">
      {/* Mount timer (triggers interval via hook) */}
      <TimerMount />

      {/* Game Top Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-white/6 bg-[#080d16] shrink-0 gap-4">
        {/* Left: back + case name */}
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={goHome}
            icon={<ArrowLeft size={13} />}
            className="shrink-0 text-xs px-2.5 py-1.5"
          >
            Exit
          </Button>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">{currentCase?.title}</div>
            <div className="text-[10px] text-slate-600 truncate">{currentCase?.location}</div>
          </div>
        </div>

        {/* Centre: progress */}
        <div className="flex-1 max-w-xs hidden md:block">
          <ProgressBar
            value={progress}
            label="Investigation"
            color="purple"
            showPercent
          />
        </div>

        {/* Right: timer + accuse */}
        <div className="flex items-center gap-3 shrink-0">
          <Timer />
          <Button
            variant="danger"
            size="sm"
            onClick={openAccuseModal}
            disabled={discoveredEvidenceIds.length < 2}
            icon={<Target size={13} />}
            className="hidden sm:flex"
          >
            Accuse
          </Button>
        </div>
      </header>

      {/* Main 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel 1 — Evidence Hub (left) */}
        <motion.div
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-64 shrink-0 overflow-hidden border-r border-white/5"
        >
          <EvidenceHub />
        </motion.div>

        {/* Panel 2 — Evidence Board Canvas (centre) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-hidden"
        >
          <EvidenceBoardCanvas />
        </motion.div>

        {/* Panel 3 — Suspect Panel (right) */}
        <motion.div
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-64 shrink-0 overflow-hidden border-l border-white/5"
        >
          <SuspectPanel />
        </motion.div>
      </div>

      {/* Overlays */}
      <CaseOverview />
      <DecisionModal />
    </div>
  );
}
