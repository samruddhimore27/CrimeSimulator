import { create } from 'zustand';
import { getCaseById } from '../data/cases';

const INITIAL_STATE = {
  // Navigation
  gamePhase: 'home', // 'home' | 'briefing' | 'playing' | 'accusing' | 'result'
  currentCaseId: null,
  currentCase: null,

  // Evidence state
  discoveredEvidenceIds: [],
  boardItems: [], // { id, evidenceId, x, y }
  connections: [], // { id, from, to }

  // Suspect state
  activeSuspectId: null,
  accusedSuspectId: null,

  // Timer
  timeRemaining: 0,
  timerRunning: false,

  // Score
  score: 0,
  scoreBreakdown: null,

  // UI
  activeEvidenceTab: 'evidence',
  showBriefing: true,
};

export const useGameStore = create((set, get) => ({
  ...INITIAL_STATE,

  // ── NAVIGATION ──────────────────────────────────────────

  goHome: () => set({ ...INITIAL_STATE }),

  selectCase: (caseId) => {
    const caseData = getCaseById(caseId);
    const initialEvidence = caseData.evidence
      .filter((e) => e.unlocked)
      .map((e) => e.id);

    set({
      currentCaseId: caseId,
      currentCase: caseData,
      gamePhase: 'briefing',
      discoveredEvidenceIds: initialEvidence,
      boardItems: [],
      connections: [],
      activeSuspectId: null,
      accusedSuspectId: null,
      timeRemaining: caseData.timeLimit,
      timerRunning: false,
      score: 0,
      scoreBreakdown: null,
      activeEvidenceTab: 'evidence',
      showBriefing: true,
    });
  },

  startGame: () => {
    set({ gamePhase: 'playing', showBriefing: false, timerRunning: true });
  },

  openAccuseModal: () => set({ gamePhase: 'accusing' }),
  closeAccuseModal: () => set({ gamePhase: 'playing' }),

  // ── EVIDENCE ────────────────────────────────────────────

  discoverEvidence: (evidenceId) => {
    const { discoveredEvidenceIds } = get();
    if (!discoveredEvidenceIds.includes(evidenceId)) {
      set({ discoveredEvidenceIds: [...discoveredEvidenceIds, evidenceId] });
    }
  },

  addEvidenceToBoard: (evidenceId) => {
    const { boardItems } = get();
    if (boardItems.find((i) => i.evidenceId === evidenceId)) return;
    const newItem = {
      id: `board-${Date.now()}`,
      evidenceId,
      x: 100 + Math.random() * 400,
      y: 80 + Math.random() * 300,
    };
    set({ boardItems: [...boardItems, newItem] });
  },

  removeFromBoard: (boardItemId) => {
    const { boardItems, connections } = get();
    set({
      boardItems: boardItems.filter((i) => i.id !== boardItemId),
      connections: connections.filter(
        (c) => c.from !== boardItemId && c.to !== boardItemId
      ),
    });
  },

  updateBoardItemPosition: (boardItemId, x, y) => {
    set((state) => ({
      boardItems: state.boardItems.map((item) =>
        item.id === boardItemId ? { ...item, x, y } : item
      ),
    }));
  },

  addConnection: (fromId, toId) => {
    const { connections } = get();
    const exists = connections.find(
      (c) =>
        (c.from === fromId && c.to === toId) ||
        (c.from === toId && c.to === fromId)
    );
    if (!exists) {
      set({
        connections: [
          ...connections,
          { id: `conn-${Date.now()}`, from: fromId, to: toId },
        ],
      });
    }
  },

  removeConnection: (connectionId) => {
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== connectionId),
    }));
  },

  // ── SUSPECTS ────────────────────────────────────────────

  setActiveSuspect: (suspectId) => set({ activeSuspectId: suspectId }),

  // ── TIMER ───────────────────────────────────────────────

  tickTimer: () => {
    const { timeRemaining } = get();
    if (timeRemaining <= 0) {
      set({ timerRunning: false });
      get().endGame(null); // time up — no accusation
      return;
    }
    set({ timeRemaining: timeRemaining - 1 });
  },

  pauseTimer: () => set({ timerRunning: false }),
  resumeTimer: () => set({ timerRunning: true }),

  // ── GAME END ────────────────────────────────────────────

  makeAccusation: (suspectId) => {
    const { currentCase, timeRemaining, discoveredEvidenceIds, connections } = get();
    const isCorrect = suspectId === currentCase.correctSuspectId;

    const evidencePoints = discoveredEvidenceIds.length * 100;
    const connectionPoints = connections.length * 75;
    const timeBonus = Math.floor(timeRemaining * 0.5);
    const accuracyBonus = isCorrect ? 500 : 0;
    const totalScore = evidencePoints + connectionPoints + timeBonus + accuracyBonus;

    set({
      accusedSuspectId: suspectId,
      timerRunning: false,
      gamePhase: 'result',
      score: totalScore,
      scoreBreakdown: {
        evidencePoints,
        connectionPoints,
        timeBonus,
        accuracyBonus,
        isCorrect,
      },
    });
  },

  endGame: (suspectId) => {
    get().makeAccusation(suspectId || '');
  },

  // ── UI STATE ────────────────────────────────────────────

  setActiveEvidenceTab: (tab) => set({ activeEvidenceTab: tab }),
}));
