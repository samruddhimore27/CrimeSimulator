import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Link, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useEvidenceConnections } from '../hooks/useEvidenceConnections';

export function EvidenceBoardCanvas() {
  const {
    currentCase,
    boardItems,
    connections,
    discoveredEvidenceIds,
    updateBoardItemPosition,
    removeFromBoard,
    addEvidenceToBoard,
  } = useGameStore();

  const {
    pendingFrom,
    startConnection,
    finishConnection,
    cancelConnection,
    deleteConnection,
    getItemCenter,
  } = useEvidenceConnections();

  const svgRef = useRef(null);
  const boardRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // ── Drag logic ──────────────────────────────────────────

  const getBoardPos = (clientX, clientY) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (clientX - rect.left) / zoom,
      y: (clientY - rect.top)  / zoom,
    };
  };

  const onMouseMove = useCallback(
    (e) => {
      const pos = getBoardPos(e.clientX, e.clientY);
      setMousePos(pos);

      if (draggingId) {
        updateBoardItemPosition(
          draggingId,
          pos.x - dragOffset.x,
          pos.y - dragOffset.y
        );
      }
    },
    [draggingId, dragOffset, zoom]
  );

  const onMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const startDrag = (e, boardItemId) => {
    e.preventDefault();
    const item = boardItems.find((i) => i.id === boardItemId);
    if (!item) return;
    const pos = getBoardPos(e.clientX, e.clientY);
    setDragOffset({ x: pos.x - item.x, y: pos.y - item.y });
    setDraggingId(boardItemId);
  };

  // ── Node click (connect) ─────────────────────────────────

  const handleNodeClick = (e, boardItemId) => {
    if (draggingId) return; // was dragging, not clicking
    e.stopPropagation();

    if (pendingFrom) {
      finishConnection(boardItemId);
    } else {
      startConnection(boardItemId);
    }
  };

  // ── SVG connection lines ──────────────────────────────────

  const renderConnections = () =>
    connections.map((conn) => {
      const from = getItemCenter(conn.from);
      const to   = getItemCenter(conn.to);
      if (!from || !to) return null;

      // Figure out if it's a canonical (valid) connection
      const fromBoardItem = boardItems.find((i) => i.id === conn.from);
      const toBoardItem   = boardItems.find((i) => i.id === conn.to);
      const fromEvidence  = currentCase?.evidence.find((e) => e.id === fromBoardItem?.evidenceId);
      const isValid       = fromEvidence?.connectsTo?.includes(toBoardItem?.evidenceId);

      return (
        <g key={conn.id}>
          <line
            x1={from.x} y1={from.y}
            x2={to.x}   y2={to.y}
            stroke={isValid ? '#10b981' : '#8b5cf6'}
            strokeWidth={isValid ? 2 : 1.5}
            strokeDasharray={isValid ? 'none' : '6 4'}
            strokeOpacity={0.7}
          />
          {/* Clickable delete midpoint */}
          <circle
            cx={(from.x + to.x) / 2}
            cy={(from.y + to.y) / 2}
            r={6}
            fill="#1a2234"
            stroke={isValid ? '#10b981' : '#8b5cf6'}
            strokeWidth={1}
            className="cursor-pointer hover:fill-red-900/60"
            onClick={() => deleteConnection(conn.id)}
          />
          <text
            x={(from.x + to.x) / 2}
            y={(from.y + to.y) / 2 + 4}
            textAnchor="middle"
            fill="#ef4444"
            fontSize={9}
            className="cursor-pointer select-none pointer-events-none"
          >
            ×
          </text>
        </g>
      );
    });

  // ── Render evidence nodes ────────────────────────────────

  const renderNodes = () =>
    boardItems.map((item) => {
      const evidence = currentCase?.evidence.find((e) => e.id === item.evidenceId);
      if (!evidence) return null;
      const isConnecting = pendingFrom === item.id;
      const isDragging   = draggingId === item.id;

      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            left: item.x,
            top:  item.y,
            width: 120,
            zIndex: isDragging ? 20 : 10,
            transform: isDragging ? 'scale(1.06)' : 'scale(1)',
          }}
          className={`evidence-node glass-card-elevated ${isConnecting ? 'connecting' : ''}`}
        >
          {/* Drag handle area */}
          <div
            onMouseDown={(e) => startDrag(e, item.id)}
            className="p-2 pb-1 cursor-grab"
          >
            <div className="text-2xl text-center">{evidence.icon}</div>
          </div>

          {/* Click to connect */}
          <div
            onClick={(e) => handleNodeClick(e, item.id)}
            className="px-2 pb-2 text-center cursor-pointer"
          >
            <p className="text-[10px] font-semibold text-slate-200 leading-tight line-clamp-2">
              {evidence.title}
            </p>
            <TypeDot type={evidence.type} />
          </div>

          {/* Remove button */}
          <button
            onClick={(e) => { e.stopPropagation(); removeFromBoard(item.id); }}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-900/80 border border-red-600/50 flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <X size={9} className="text-red-300" />
          </button>
        </motion.div>
      );
    });

  // ── Empty state ─────────────────────────────────────────

  const noItems = boardItems.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#080d16]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Investigation Board</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20">
            {boardItems.length} items · {connections.length} connections
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {pendingFrom && (
            <button
              onClick={cancelConnection}
              className="text-[10px] px-2 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center gap-1 hover:bg-amber-500/25"
            >
              <X size={10} />
              Cancel Link
            </button>
          )}
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
            className="p-1.5 rounded text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <ZoomIn size={13} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
            className="p-1.5 rounded text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <ZoomOut size={13} />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Instructions banner */}
      {pendingFrom && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-3 mt-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2"
        >
          <Link size={11} />
          Click another evidence node to connect, or press Cancel Link.
        </motion.div>
      )}

      {/* Canvas */}
      <div
        ref={boardRef}
        className="relative flex-1 evidence-board overflow-hidden scanlines"
        onClick={() => pendingFrom && cancelConnection()}
      >
        {/* SVG for connection lines */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {renderConnections()}

          {/* Pending connection line */}
          {pendingFrom && (() => {
            const from = getItemCenter(pendingFrom);
            return (
              <line
                x1={from.x} y1={from.y}
                x2={mousePos.x} y2={mousePos.y}
                stroke="#8b5cf6"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                strokeOpacity={0.6}
              />
            );
          })()}
        </svg>

        {/* Nodes layer */}
        <div
          className="absolute inset-0"
          style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
        >
          {renderNodes()}
        </div>

        {/* Empty state */}
        {noItems && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-5xl mb-3"
            >
              📌
            </motion.div>
            <p className="text-slate-600 text-sm font-medium">Investigation board is empty</p>
            <p className="text-slate-700 text-xs mt-1">
              Open evidence from the hub and click "Pin to Board"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TypeDot({ type }) {
  const colors = {
    physical: 'bg-amber-400',
    document: 'bg-blue-400',
    witness:  'bg-emerald-400',
    photo:    'bg-pink-400',
    digital:  'bg-cyan-400',
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1 ${colors[type] || 'bg-slate-400'}`} />
  );
}
