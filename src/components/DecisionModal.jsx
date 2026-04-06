import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ChevronRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Button } from './Shared/Button';

export function DecisionModal() {
  const {
    currentCase,
    gamePhase,
    closeAccuseModal,
    makeAccusation,
    discoveredEvidenceIds,
  } = useGameStore();

  const [selectedSuspectId, setSelectedSuspectId] = useState(null);
  const [confirming, setConfirming] = useState(false);

  if (gamePhase !== 'accusing' || !currentCase) return null;

  const handleAccuse = () => {
    if (!selectedSuspectId) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    makeAccusation(selectedSuspectId);
  };

  const handleClose = () => {
    setSelectedSuspectId(null);
    setConfirming(false);
    closeAccuseModal();
  };

  const evidenceCount = discoveredEvidenceIds.length;
  const selectedSuspect = currentCase.suspects.find((s) => s.id === selectedSuspectId);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="glass-card-elevated max-w-lg w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-red-900/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                ⚖️ Make Your Accusation
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose wisely — a wrong accusation loses 500 points.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/8 text-slate-500 hover:text-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Evidence summary */}
          <div className="px-6 py-3 bg-white/2 border-b border-white/5 flex items-center gap-3 text-xs">
            <span className="text-slate-400">Evidence gathered:</span>
            <span className="font-mono text-purple-400 font-semibold">{evidenceCount} items</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Suspects to choose from:</span>
            <span className="font-mono text-amber-400 font-semibold">{currentCase.suspects.length}</span>
          </div>

          {/* Suspect selector */}
          <div className="px-6 py-4 space-y-2">
            <p className="text-xs text-slate-500 mb-3">Select the perpetrator:</p>
            {currentCase.suspects.map((suspect, i) => {
              const isSelected = selectedSuspectId === suspect.id;
              return (
                <motion.button
                  key={suspect.id}
                  onClick={() => { setSelectedSuspectId(suspect.id); setConfirming(false); }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-red-400/60 bg-red-500/12 shadow-lg shadow-red-900/30'
                      : 'border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/4'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${suspect.color}20`, border: `1px solid ${suspect.color}35` }}
                  >
                    {suspect.photo}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-200">{suspect.name}</div>
                    <div className="text-xs text-slate-500">{suspect.occupation} · {suspect.relation}</div>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0"
                    >
                      <ChevronRight size={11} className="text-white" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Confirmation warning */}
          <AnimatePresence>
            {confirming && selectedSuspect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-6 mb-4 p-3 rounded-xl border border-amber-500/30 bg-amber-500/8 flex items-start gap-2"
              >
                <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-300">Confirm accusation?</p>
                  <p className="text-[11px] text-amber-500/80 mt-0.5">
                    You are accusing <strong>{selectedSuspect.name}</strong>. This cannot be undone.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="px-6 pb-6 flex gap-3">
            <Button variant="ghost" size="md" onClick={handleClose} className="flex-1">
              Back to Investigation
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleAccuse}
              disabled={!selectedSuspectId}
              className="flex-1"
              icon="⚖️"
            >
              {confirming ? 'Confirm Accusation' : 'Accuse Suspect'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
