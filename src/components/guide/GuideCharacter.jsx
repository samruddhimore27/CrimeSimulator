import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useGuideStore } from '../../store/guideStore';
import { useGameStore } from '../../store/gameStore';
import { GuideDialog } from './GuideDialog';

export const GuideCharacter = () => {
  const { isOpen, isDormant, openTutorial, agentSpeak, startBriefing, customMessage } = useGuideStore();
  const { gamePhase, currentCase } = useGameStore();

  useEffect(() => {
    if (gamePhase === 'briefing' && currentCase) {
         startBriefing(currentCase);
    } else if (gamePhase === 'playing') {
       agentSpeak('The clock is ticking! Start dragging evidence onto the board.');
    } else if (gamePhase === 'accusing') {
       agentSpeak('You think you got them? Make sure the connections are solid!');
    } else if (gamePhase === 'result') {
       agentSpeak('Let\'s see how we did!');
    }
  }, [gamePhase, currentCase, startBriefing, agentSpeak]);

  return (
    <div className="guide-char-wrap">
      
      {/* Dialog box wrapper */}
      <AnimatePresence>
        {isOpen && !isDormant && (
          <div className="guide-dialog-outer">
            <GuideDialog />
          </div>
        )}
      </AnimatePresence>

      {/* The Avatar Character */}
      <AnimatePresence>
        {(isOpen || isDormant) && (
          <motion.button
            onClick={isDormant ? openTutorial : undefined}
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ 
              scale: isDormant ? 0.7 : 1, 
              opacity: 1, 
              y: 0 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`gc-btn-active ${isDormant ? 'gc-btn-dormant' : 'gc-btn-playing animate-float'}`}
          >
            {/* Glow / Pulse Rings */}
            <div className="gc-ping" />
            <div className={`gc-blur ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

            {/* Character Base */}
            <div className="gc-avatar-box">
              <img 
                src="/agent.png" 
                alt="Agent Assistant" 
                className="gc-img"
              />
              <div className="gc-gradient-overlay" />

              {/* Fake AI "Sparkles"/Processing overlay */}
              {!isDormant && (
                <motion.div 
                  className="gc-sparkles"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
              )}
            </div>

            {/* Inactive / Hover prompt for Dormant Mode */}
            {isDormant && (
              <div className="gc-prompt">
                Call Assistant
              </div>
            )}
            
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
