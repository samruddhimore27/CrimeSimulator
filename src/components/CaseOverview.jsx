import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, User, AlertTriangle, FileText } from 'lucide-react';
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
        className="overview-backdrop"
      >
        <div className="overview-spotlight-wrapper">
          <div className="overview-spotlight" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="overview-modal-wrap"
        >
          <div className="overview-glow-border" />

          <div className="overview-modal-content">
            <div className="overview-crime-tape" />

            <div className="overview-classification">
              <div className="class-left">
                <span className="class-pulse-dot"></span>
                <span className="class-title">TOP SECRET · CASE BRIEFING</span>
              </div>
              <span className="class-id">CASE #{currentCase.id.replace('case-', '').padStart(4, '0')}</span>
            </div>

            <div className="overview-hero">
              <motion.div
                animate={{ scale: [1, 1.06, 1], filter: ['drop-shadow(0 0 20px rgba(139,92,246,0.4))', 'drop-shadow(0 0 40px rgba(139,92,246,0.8))', 'drop-shadow(0 0 20px rgba(139,92,246,0.4))'] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="overview-emoji"
              >
                {currentCase.emoji}
              </motion.div>

              <h2 className="overview-case-name text-glow-white">
                {currentCase.title.toUpperCase()}
              </h2>
              <p className="overview-case-sub">{currentCase.subtitle}</p>

              <div className="overview-meta-chips">
                <MetaBadge icon={<MapPin size={11} />} text={currentCase.location} color="purple" />
                <MetaBadge icon={<Clock size={11} />} text={currentCase.timeOfCrime} color="amber" />
                <MetaBadge icon={<User size={11} />} text={`Victim: ${currentCase.victim}`} color="red" />
              </div>

              <div className="overview-description">
                {currentCase.description}
              </div>

              <div className="overview-stats-grid">
                <StatBox value={currentCase.suspects.length} label="Suspects" color="#8b5cf6" icon="👤" />
                <StatBox value={currentCase.evidence.length} label="Evidence" color="#06b6d4" icon="🔎" />
                <StatBox value={`${Math.floor(currentCase.timeLimit / 60)}m`} label="Time Limit" color="#f59e0b" icon="⏱" />
              </div>

              <div className="overview-warning">
                <AlertTriangle size={14} className="warning-exclamation" />
                <p className="warning-text">
                  A wrong accusation costs <strong style={{ color: '#f87171' }}>500 points</strong>. Gather evidence before naming a suspect.
                </p>
              </div>

              <Button onClick={startGame} variant="primary" size="lg" className="overview-start-btn" icon="🔍">
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
  const badgeClass = `meta-badge color-${color}`;
  return (
    <span className={badgeClass}>
      {icon}{text}
    </span>
  );
}

function StatBox({ value, label, color, icon }) {
  return (
    <div className="overview-stat-box">
      <div className="stat-box-icon">{icon}</div>
      <div className="stat-box-val" style={{ color }}>{value}</div>
      <div className="stat-box-label">{label}</div>
    </div>
  );
}
