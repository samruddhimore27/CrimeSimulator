import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Search, Link, Star, ArrowLeft, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Button } from './Shared/Button';

export function ResultsScreen() {
  const {
    currentCase,
    accusedSuspectId,
    scoreBreakdown,
    score,
    goHome,
    selectCase,
  } = useGameStore();

  if (!currentCase || !scoreBreakdown) return null;

  const accused = currentCase.suspects.find((s) => s.id === accusedSuspectId);
  const correct = currentCase.suspects.find((s) => s.id === currentCase.correctSuspectId);
  const isCorrect = scoreBreakdown.isCorrect;

  const grade = getGrade(score, isCorrect);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Atmospheric BG */}
      <div className={`fixed inset-0 transition-colors duration-1000 ${
        isCorrect
          ? 'bg-linear-to-br from-emerald-950 via-[#060810] to-[#060810]'
          : 'bg-linear-to-br from-red-950 via-[#060810] to-[#060810]'
      }`} />

      {/* Particle ring (decorative) */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${isCorrect ? 'bg-emerald-400' : 'bg-red-400'}`}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top:  `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 240 }}
        className="relative z-10 max-w-xl w-full"
      >
        {/* Verdict banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-center py-6 px-8 rounded-t-2xl border-t border-x ${
            isCorrect
              ? 'bg-emerald-900/30 border-emerald-500/30'
              : 'bg-red-900/30 border-red-500/30'
          }`}
        >
          <motion.div
            animate={{ rotate: isCorrect ? [0, -5, 5, 0] : [0, -2, 2, 0] }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-6xl mb-3"
          >
            {isCorrect ? '🎉' : '💀'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-3xl font-bold mb-1 font-serif ${
              isCorrect ? 'text-emerald-300 text-glow-purple' : 'text-red-300 text-glow-red'
            }`}
          >
            {isCorrect ? 'Case Solved!' : 'Wrong Suspect'}
          </motion.h1>

          <p className="text-slate-400 text-sm">{grade.message}</p>
        </motion.div>

        {/* Score body */}
        <div className="glass-card-elevated rounded-b-2xl rounded-t-none border-x border-b border-white/8 p-6 space-y-5">

          {/* Grade + Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black border-2"
                style={{ color: grade.color, borderColor: grade.color, background: `${grade.color}15` }}
              >
                {grade.label}
              </div>
              <div>
                <div className="text-2xl font-black font-mono text-white">{score.toLocaleString()}</div>
                <div className="text-xs text-slate-500">Total Score</div>
              </div>
            </div>
            <Trophy size={32} className="text-amber-400/50" />
          </div>

          {/* Score breakdown */}
          <div className="space-y-2">
            <ScoreLine icon={<Search size={13} />} label="Evidence Discovered" value={scoreBreakdown.evidencePoints} color="purple" />
            <ScoreLine icon={<Link size={13} />}   label="Connections Made"    value={scoreBreakdown.connectionPoints} color="cyan" />
            <ScoreLine icon={<Clock size={13} />}  label="Time Bonus"          value={scoreBreakdown.timeBonus} color="amber" />
            <ScoreLine icon={<Star size={13} />}   label="Accuracy Bonus"      value={scoreBreakdown.accuracyBonus} color={isCorrect ? 'emerald' : 'red'} />
            <div className="border-t border-white/8 pt-2 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-300">Final Score</span>
              <span className="text-xl font-black font-mono text-white">{score.toLocaleString()}</span>
            </div>
          </div>

          {/* Accused vs Correct reveal */}
          <div className="grid grid-cols-2 gap-3">
            <VerdictCard
              label="You Accused"
              suspect={accused}
              isCorrect={isCorrect}
              type="accused"
            />
            <VerdictCard
              label="Actual Culprit"
              suspect={correct}
              isCorrect={isCorrect}
              type="correct"
            />
          </div>

          {/* Case solution desc */}
          {!isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-xs text-slate-300 leading-relaxed"
            >
              <p className="font-semibold text-red-400 mb-1">What really happened:</p>
              {correct?.motive}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="ghost"
              size="md"
              onClick={goHome}
              className="flex-1"
              icon={<ArrowLeft size={14} />}
            >
              Case Select
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => selectCase(currentCase.id)}
              className="flex-1"
              icon={<RotateCcw size={14} />}
            >
              Play Again
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScoreLine({ icon, label, value, color }) {
  const colors = {
    purple:  'text-purple-400',
    cyan:    'text-cyan-400',
    amber:   'text-amber-400',
    emerald: 'text-emerald-400',
    red:     'text-red-400',
  };
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-slate-400">
        <span className={colors[color]}>{icon}</span>
        {label}
      </div>
      <span className={`font-mono font-semibold ${colors[color]}`}>+{value}</span>
    </div>
  );
}

function VerdictCard({ label, suspect, isCorrect, type }) {
  if (!suspect) return null;
  const isAccused = type === 'accused';
  return (
    <div
      className={`p-3 rounded-xl border text-center ${
        isAccused && !isCorrect
          ? 'border-red-500/30 bg-red-500/8'
          : isAccused && isCorrect
          ? 'border-emerald-500/30 bg-emerald-500/8'
          : 'border-purple-500/30 bg-purple-500/8'
      }`}
    >
      <div className="text-[10px] text-slate-500 mb-1">{label}</div>
      <div className="text-2xl mb-0.5">{suspect.photo}</div>
      <div className="text-xs font-semibold text-slate-200">{suspect.name}</div>
      <div className="text-[10px] text-slate-500">{suspect.occupation}</div>
    </div>
  );
}

function getGrade(score, isCorrect) {
  if (!isCorrect) return { label: 'F', color: '#EF4444', message: 'Wrong suspect — the culprit escapes.' };
  if (score >= 1200) return { label: 'S', color: '#F59E0B', message: 'Master Detective — absolutely flawless.' };
  if (score >= 900)  return { label: 'A', color: '#10B981', message: 'Excellent work, Inspector.' };
  if (score >= 600)  return { label: 'B', color: '#6366F1', message: 'Well done — case closed.' };
  if (score >= 300)  return { label: 'C', color: '#8B5CF6', message: 'Case solved, but barely.' };
  return { label: 'D', color: '#EF4444', message: 'Lucky guess at best.' };
}
