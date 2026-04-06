import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star, ChevronRight, Zap } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { CASES } from '../data/cases';
import { Button } from '../components/Shared/Button';

const DIFFICULTY_STYLES = {
  Beginner:     { badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', dot: 'bg-emerald-500' },
  Intermediate: { badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',   dot: 'bg-amber-500'   },
  Hard:         { badge: 'text-red-400 bg-red-500/10 border-red-500/30',           dot: 'bg-red-500'     },
};

export function HomePage() {
  const { selectCase } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Atmospheric BG blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/6 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%]  w-[500px] h-[500px] rounded-full bg-red-600/5    blur-3xl" />
        <div className="absolute top-[40%]  left-[40%]      w-[300px] h-[300px] rounded-full bg-cyan-600/4   blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Shield size={18} className="text-purple-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white font-serif tracking-wide">CrimeFiles</div>
            <div className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Interactive Simulator</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Zap size={12} className="text-amber-400" />
          <span>Hackathon Edition</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl mb-6 inline-block animate-float"
          >
            🔍
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl md:text-6xl font-black font-serif mb-4 leading-tight"
          >
            <span className="shimmer-text">Interactive Crime</span>
            <br />
            <span className="text-white">Investigation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Step into the shoes of a detective. Analyse evidence, expose contradictions,
            and name the culprit before time runs out.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-8 mt-10"
        >
          {[
            { value: '3', label: 'Cases' },
            { value: '15+', label: 'Evidence Items' },
            { value: '15–20m', label: 'Per Case' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black font-mono text-purple-400">{stat.value}</div>
              <div className="text-xs text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Case Cards */}
      <section className="relative z-10 px-6 pb-20 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6 text-center"
        >
          — Select a Case —
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <CaseCard
              key={c.id}
              caseData={c}
              delay={i * 0.1 + 0.55}
              onSelect={() => selectCase(c.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 border-t border-white/5 text-xs text-slate-700">
        Built with ❤️ by PASTA
      </footer>
    </div>
  );
}

function CaseCard({ caseData, delay, onSelect }) {
  const diff = DIFFICULTY_STYLES[caseData.difficulty] || DIFFICULTY_STYLES.Hard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', damping: 20, stiffness: 220 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onSelect}
      className="glass-card group cursor-pointer hover:border-purple-500/30 hover:glow-purple transition-all duration-300 flex flex-col relative overflow-hidden"
    >
      {/* Crime tape accent strip */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Emoji hero */}
      <div className="pt-6 pb-4 text-center bg-linear-to-b from-white/2 to-transparent">
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: delay }}
          className="text-5xl inline-block"
        >
          {caseData.emoji}
        </motion.span>
      </div>

      {/* Card content */}
      <div className="p-5 pt-2 flex flex-col flex-1">
        {/* Difficulty badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${diff.badge}`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${diff.dot}`}></span>
            {caseData.difficulty}
          </span>
          <span className="text-[10px] text-slate-600 font-mono flex items-center gap-1">
            <Clock size={10} />
            {Math.floor(caseData.timeLimit / 60)}m
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-1 font-serif leading-tight group-hover:text-purple-200 transition-colors">
          {caseData.title}
        </h3>
        <p className="text-xs text-slate-500 mb-1">{caseData.subtitle}</p>

        <div className="text-[10px] text-slate-600 flex items-center gap-1 mb-3">
          📍 {caseData.location}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {caseData.description}
        </p>

        {/* Stats chips */}
        <div className="flex gap-2 mt-4">
          <Chip value={caseData.suspects.length} label="Suspects" />
          <Chip value={caseData.evidence.length} label="Evidence" />
        </div>

        {/* CTA */}
        <motion.div
          className="mt-4 flex items-center justify-between text-xs"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span className="text-purple-400 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Begin Investigation <ChevronRight size={12} />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Chip({ value, label }) {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/4 border border-white/6">
      <span className="text-[10px] font-bold font-mono text-purple-400">{value}</span>
      <span className="text-[10px] text-slate-600">{label}</span>
    </div>
  );
}
