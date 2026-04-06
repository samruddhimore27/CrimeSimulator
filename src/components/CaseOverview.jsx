import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, User, AlertCircle } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="glass-card-elevated max-w-2xl w-full overflow-hidden"
        >
          {/* Header tape */}
          <div className="crime-tape-bg bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold font-mono tracking-widest uppercase">
              Case Briefing — Classified
            </span>
          </div>

          {/* Case emoji hero */}
          <div className="relative px-6 pt-8 pb-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="text-7xl mb-4 animate-float inline-block"
            >
              {currentCase.emoji}
            </motion.div>

            <h2 className="text-3xl font-bold text-white font-serif text-glow-purple mb-1">
              {currentCase.title}
            </h2>
            <p className="text-slate-400 text-sm">{currentCase.subtitle}</p>
          </div>

          {/* Meta info row */}
          <div className="flex flex-wrap justify-center gap-3 px-6 pb-5">
            <MetaBadge icon={<MapPin size={12} />} label={currentCase.location} color="purple" />
            <MetaBadge icon={<Clock size={12} />} label={currentCase.timeOfCrime} color="amber" />
            <MetaBadge icon={<User size={12} />} label={`Victim: ${currentCase.victim}`} color="red" />
          </div>

          {/* Description */}
          <div className="mx-6 mb-5 p-4 bg-white/3 rounded-xl border border-white/8">
            <p className="text-slate-300 text-sm leading-relaxed">{currentCase.description}</p>
          </div>

          {/* Evidence count facts */}
          <div className="grid grid-cols-3 gap-3 mx-6 mb-6">
            <StatBox value={currentCase.suspects.length} label="Suspects" color="#8b5cf6" />
            <StatBox value={currentCase.evidence.length} label="Evidence Items" color="#06b6d4" />
            <StatBox value={`${Math.floor(currentCase.timeLimit / 60)}m`} label="Time Limit" color="#f59e0b" />
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <Button
              onClick={startGame}
              variant="primary"
              size="lg"
              className="w-full text-base tracking-wide"
              icon="🔍"
            >
              Begin Investigation
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MetaBadge({ icon, label, color }) {
  const colors = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    amber:  'text-amber-400 bg-amber-500/10 border-amber-500/30',
    red:    'text-red-400 bg-red-500/10 border-red-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${colors[color]}`}>
      {icon}
      {label}
    </span>
  );
}

function StatBox({ value, label, color }) {
  return (
    <div className="text-center p-3 rounded-xl bg-white/3 border border-white/8">
      <div className="text-2xl font-bold font-mono mb-0.5" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
