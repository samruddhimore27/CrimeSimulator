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
    <div className="results-min-h-screen">
      <div className={`results-bg ${isCorrect ? 'correct' : 'wrong'}`} />

      <div className="results-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`particle-dot ${isCorrect ? 'particle-correct' : 'particle-wrong'}`}
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
        className="results-modal"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`results-verdict-banner ${isCorrect ? 'correct' : 'wrong'}`}
        >
          <motion.div
            animate={{ rotate: isCorrect ? [0, -5, 5, 0] : [0, -2, 2, 0] }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="results-emoji"
          >
            {isCorrect ? '🎉' : '💀'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`results-title ${isCorrect ? 'results-title-correct' : 'results-title-wrong'}`}
          >
            {isCorrect ? 'Case Solved!' : 'Wrong Suspect'}
          </motion.h1>

          <p className="results-msg">{grade.message}</p>
        </motion.div>

        <div className="results-body">
          <div className="results-grade-wrap">
            <div className="results-grade-inner">
              <div
                className="results-grade-mark"
                style={{ color: grade.color, borderColor: grade.color, background: `${grade.color}15` }}
              >
                {grade.label}
              </div>
              <div>
                <div className="results-score-val">{score.toLocaleString()}</div>
                <div className="results-score-lbl">Total Score</div>
              </div>
            </div>
            <Trophy size={32} className="results-trophy" />
          </div>

          <div className="results-breakdown">
            <ScoreLine icon={<Search size={13} />} label="Evidence Discovered" value={scoreBreakdown.evidencePoints} color="purple" />
            <ScoreLine icon={<Link size={13} />}   label="Connections Made"    value={scoreBreakdown.connectionPoints} color="cyan" />
            <ScoreLine icon={<Clock size={13} />}  label="Time Bonus"          value={scoreBreakdown.timeBonus} color="amber" />
            <ScoreLine icon={<Star size={13} />}   label="Accuracy Bonus"      value={scoreBreakdown.accuracyBonus} color={isCorrect ? 'emerald' : 'red'} />
            <div className="results-final-score">
              <span className="results-final-lbl">Final Score</span>
              <span className="results-final-val">{score.toLocaleString()}</span>
            </div>
          </div>

          <div className="results-comparisons">
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

          {!isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="results-solution"
            >
              <p className="sol-lbl">What really happened:</p>
              {correct?.motive}
            </motion.div>
          )}

          <div className="results-actions">
            <Button variant="ghost" size="md" onClick={goHome} className="flex-1" icon={<ArrowLeft size={14} />}>
              Case Select
            </Button>
            <Button variant="primary" size="md" onClick={() => selectCase(currentCase.id)} className="flex-1" icon={<RotateCcw size={14} />}>
              Play Again
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScoreLine({ icon, label, value, color }) {
  const cClass = `text-${color}-400`;
  return (
    <div className="results-score-line">
      <div className="results-line-lbl">
        <span className={cClass}>{icon}</span>
        {label}
      </div>
      <span className={`results-line-val ${cClass}`}>+{value}</span>
    </div>
  );
}

function VerdictCard({ label, suspect, isCorrect, type }) {
  if (!suspect) return null;
  const isAccused = type === 'accused';
  let vcClass = 'vc-neutral';
  if (isAccused && !isCorrect) vcClass = 'vc-wrong';
  else if (isAccused && isCorrect) vcClass = 'vc-correct';

  return (
    <div className={`verdict-card ${vcClass}`}>
      <div className="vc-lbl">{label}</div>
      <div className="vc-photo">{suspect.photo}</div>
      <div className="vc-name">{suspect.name}</div>
      <div className="vc-occ">{suspect.occupation}</div>
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
