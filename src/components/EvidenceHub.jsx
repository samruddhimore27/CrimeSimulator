import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, Clock, ChevronRight, Fingerprint, Image, FileText, Users } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useGameLogic } from '../hooks/useGameLogic';
import { Button } from './Shared/Button';

const TABS = [
  { id: 'evidence', label: 'Evidence', icon: Fingerprint },
  { id: 'photos',   label: 'Photos',   icon: Image },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'suspects', label: 'Suspects', icon: Users },
];

export function EvidenceHub() {
  const { currentCase, discoveredEvidenceIds, activeEvidenceTab, setActiveEvidenceTab, addEvidenceToBoard, boardItems } =
    useGameStore();
  const { handleEvidenceClick } = useGameLogic();
  const [expandedId, setExpandedId] = useState(null);

  if (!currentCase) return null;

  const allEvidence = currentCase.evidence;
  const typeFilter =
    activeEvidenceTab === 'photos' ? 'photo' :
    activeEvidenceTab === 'evidence' ? null : null;

  const visibleEvidence =
    activeEvidenceTab === 'evidence' ? allEvidence :
    activeEvidenceTab === 'photos'   ? allEvidence.filter(e => e.type === 'photo') :
    allEvidence;

  const onBoardIds = new Set(boardItems.map(b => b.evidenceId));

  return (
    <div className="flex flex-col h-full bg-[#0a0f1a] border-r border-white/5">
      {/* Hub Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse inline-block"></span>
          Evidence Hub
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {discoveredEvidenceIds.length}/{allEvidence.length} items discovered
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeEvidenceTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveEvidenceTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors relative ${
                isActive ? 'text-purple-400 tab-active' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvidenceTab}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
          >
            {activeEvidenceTab === 'timeline' ? (
              <TimelineView timeline={currentCase.timeline} suspects={currentCase.suspects} />
            ) : activeEvidenceTab === 'suspects' ? (
              <SuspectMiniList suspects={currentCase.suspects} />
            ) : (
              <EvidenceList
                evidence={visibleEvidence}
                discoveredIds={discoveredEvidenceIds}
                onBoardIds={onBoardIds}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                onDiscover={handleEvidenceClick}
                onAddToBoard={addEvidenceToBoard}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Evidence List ────────────────────────────────────────────────────────────

function EvidenceList({ evidence, discoveredIds, onBoardIds, expandedId, setExpandedId, onDiscover, onAddToBoard }) {
  return (
    <div className="space-y-2">
      {evidence.map((item, i) => {
        const isDiscovered = discoveredIds.includes(item.id);
        const isExpanded   = expandedId === item.id;
        const onBoard      = onBoardIds.has(item.id);

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isDiscovered
                ? 'border-purple-500/25 bg-purple-500/5 hover:border-purple-500/40'
                : 'border-white/5 bg-white/2 opacity-60'
            }`}
          >
            {/* Evidence card header */}
            <button
              onClick={() => {
                if (!isDiscovered) {
                  onDiscover(item.id);
                } else {
                  setExpandedId(isExpanded ? null : item.id);
                }
              }}
              className="w-full flex items-center gap-3 p-3 text-left"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg ${
                  isDiscovered ? 'bg-purple-500/15' : 'bg-white/4'
                }`}
              >
                {isDiscovered ? item.icon : <Lock size={14} className="text-slate-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold truncate ${isDiscovered ? 'text-slate-200' : 'text-slate-600'}`}>
                    {isDiscovered ? item.title : '??? Locked'}
                  </span>
                  {isDiscovered && (
                    <TypeBadge type={item.type} />
                  )}
                </div>
                {isDiscovered && (
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                )}
              </div>
              <ChevronRight
                size={12}
                className={`text-slate-600 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              />
            </button>

            {/* Expanded detail */}
            <AnimatePresence>
              {isExpanded && isDiscovered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 pb-3"
                >
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 p-3 bg-white/3 rounded-lg border border-white/5">
                    {item.description}
                  </p>
                  {!onBoard ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAddToBoard(item.id)}
                      className="w-full text-[11px]"
                      icon={<Eye size={11} />}
                    >
                      Pin to Board
                    </Button>
                  ) : (
                    <div className="text-center text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      On Investigation Board
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Timeline ─────────────────────────────────────────────────────────────────

function TimelineView({ timeline, suspects }) {
  return (
    <div className="space-y-0">
      {timeline.map((event, i) => {
        const suspect = suspects.find(s => s.id === event.suspect);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-3"
          >
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1 shrink-0 ring-2 ring-purple-500/20"></div>
              {i < timeline.length - 1 && (
                <div className="w-px flex-1 bg-white/8 my-1"></div>
              )}
            </div>

            <div className="pb-4 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-amber-400 font-semibold">{event.time}</span>
                {suspect && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
                    {suspect.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{event.event}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Suspect Mini List ─────────────────────────────────────────────────────────

function SuspectMiniList({ suspects }) {
  return (
    <div className="space-y-2">
      {suspects.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="p-3 rounded-xl border border-white/8 bg-white/2"
          style={{ borderLeftColor: s.color, borderLeftWidth: 2 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{s.photo}</span>
            <div>
              <div className="text-xs font-semibold text-slate-200">{s.name}</div>
              <div className="text-[10px] text-slate-500">{s.occupation}</div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 line-clamp-2">{s.alibi}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Type Badge ────────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  const colors = {
    physical: 'bg-amber-500/15 text-amber-400',
    document: 'bg-blue-500/15 text-blue-400',
    witness:  'bg-emerald-500/15 text-emerald-400',
    photo:    'bg-pink-500/15 text-pink-400',
    digital:  'bg-cyan-500/15 text-cyan-400',
  };
  return (
    <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${colors[type] || 'bg-white/10 text-white'}`}>
      {type}
    </span>
  );
}
