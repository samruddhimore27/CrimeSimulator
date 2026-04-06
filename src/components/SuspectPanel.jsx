import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useGameLogic } from '../hooks/useGameLogic';
import { Button } from './Shared/Button';

export function SuspectPanel() {
  const {
    currentCase,
    activeSuspectId,
    discoveredEvidenceIds,
    setActiveSuspect,
    openAccuseModal,
  } = useGameStore();

  const { hasContradiction, contradictionCount } = useGameLogic();

  if (!currentCase) return null;

  const activeSuspect = currentCase.suspects.find((s) => s.id === activeSuspectId);

  return (
    <div className="flex flex-col h-full bg-[#0a0f1a] border-l border-white/5">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/5">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block"></span>
          Suspects
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Click a suspect to examine</p>
      </div>

      {/* Suspect list */}
      <div className="p-3 space-y-2 border-b border-white/5">
        {currentCase.suspects.map((suspect, i) => {
          const isActive        = activeSuspectId === suspect.id;
          const contradiction   = hasContradiction(suspect.id);
          const contradictions  = contradictionCount(suspect.id);

          return (
            <motion.button
              key={suspect.id}
              onClick={() => setActiveSuspect(suspect.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                isActive
                  ? 'border-red-500/40 bg-red-500/8'
                  : 'border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border border-white/10"
                style={{ background: `${suspect.color}18` }}
              >
                {suspect.photo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-200 truncate">{suspect.name}</span>
                  {contradiction && (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <AlertTriangle size={11} className="text-red-400 shrink-0" />
                    </motion.span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{suspect.occupation}</div>
              </div>
              {contradictions > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-mono shrink-0">
                  {contradictions}⚠
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active suspect detail */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeSuspect ? (
          <SuspectDetail
            suspect={activeSuspect}
            discoveredEvidenceIds={discoveredEvidenceIds}
            contradictions={contradictionCount(activeSuspect.id)}
            caseEvidence={currentCase.evidence}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <User size={30} className="text-slate-700 mb-2" />
            <p className="text-slate-600 text-xs">Select a suspect to view details</p>
          </div>
        )}
      </div>

      {/* Accuse button */}
      <div className="p-3 border-t border-white/5">
        <Button
          variant="danger"
          size="md"
          className="w-full"
          onClick={openAccuseModal}
          disabled={discoveredEvidenceIds.length < 2}
          icon="⚖️"
        >
          Make Accusation
        </Button>
        {discoveredEvidenceIds.length < 2 && (
          <p className="text-[10px] text-slate-600 text-center mt-1.5">
            Discover at least 2 evidence items first
          </p>
        )}
      </div>
    </div>
  );
}

// ── Suspect Detail Panel ─────────────────────────────────────────────────────

function SuspectDetail({ suspect, discoveredEvidenceIds, contradictions, caseEvidence }) {
  const contraItems = caseEvidence.filter(
    (e) => suspect.contradictions?.includes(e.id) && discoveredEvidenceIds.includes(e.id)
  );

  return (
    <motion.div
      key={suspect.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Suspect card */}
      <div
        className="p-3 rounded-xl border border-white/8 bg-white/2"
        style={{ borderTopColor: suspect.color, borderTopWidth: 2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{suspect.photo}</div>
          <div>
            <div className="text-sm font-bold text-slate-200">{suspect.name}</div>
            <div className="text-xs text-slate-500">{suspect.age} yrs · {suspect.relation}</div>
          </div>
        </div>

        <InfoRow label="Occupation">{suspect.occupation}</InfoRow>

        <div className="mt-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Shield size={9} /> Alibi
          </div>
          <p className="text-xs text-slate-300 leading-relaxed p-2 bg-white/3 rounded-lg border border-white/5">
            "{suspect.alibi}"
          </p>
        </div>

        <div className="mt-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Motive</div>
          <p className="text-xs text-slate-400 leading-relaxed">{suspect.motive}</p>
        </div>
      </div>

      {/* Contradictions */}
      {contraItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] text-red-400 uppercase tracking-wider font-semibold flex items-center gap-1">
            <AlertTriangle size={10} />
            Alibi Contradictions Found
          </div>
          {contraItems.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-2.5 rounded-lg border border-red-500/25 bg-red-500/6"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{e.icon}</span>
                <span className="text-xs font-semibold text-red-300">{e.title}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">{e.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {contradictions === 0 && (
        <div className="p-3 rounded-xl border border-white/6 bg-white/2 text-center">
          <Shield size={20} className="text-slate-700 mx-auto mb-1" />
          <p className="text-[10px] text-slate-600">No contradictions found yet</p>
          <p className="text-[10px] text-slate-700 mt-0.5">Discover more evidence to expose inconsistencies</p>
        </div>
      )}
    </motion.div>
  );
}

function InfoRow({ label, children }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-slate-600 shrink-0 w-20">{label}:</span>
      <span className="text-slate-300">{children}</span>
    </div>
  );
}
