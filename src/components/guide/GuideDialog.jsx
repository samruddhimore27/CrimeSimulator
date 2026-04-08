import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGuideStore, tutorialSteps } from '../../store/guideStore';
import { ChevronRight, SkipForward, Bot } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const GuideDialog = () => {
  const { currentStepIndex, nextStep, skipTutorial, setTyping, isTyping, customMessage, isDormant } = useGuideStore();
  const { gamePhase } = useGameStore();
  const [displayedText, setDisplayedText] = useState('');
  
  const currentStep = tutorialSteps ? tutorialSteps[currentStepIndex] : { text: '' };
  const targetText = customMessage || currentStep?.text || '';

  useEffect(() => {
    setDisplayedText('');
    setTyping(true);

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < targetText.length) {
        setDisplayedText(targetText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTyping(false);
      }
    }, 20); 

    return () => clearInterval(typingInterval);
  }, [currentStepIndex, targetText]);

  const handleNext = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (customMessage) {
        skipTutorial(); 
    } else {
        nextStep();
    }
  };

  const handleSkip = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    skipTutorial();
  };

  if (isDormant) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="guide-dialog"
    >
      <div className="guide-dialog-arrow" />

      {/* Header */}
      <div className="gd-header">
        <h3 className="gd-title">
          <Bot size={20} className="gd-icon" />
          {gamePhase === 'home' && !customMessage ? 'System Initialization' : 'Agent Assist'}
        </h3>
        {(!customMessage) && tutorialSteps && (
          <div className="gd-step">
             Seq {currentStepIndex + 1}/{tutorialSteps.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="gd-content">
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
        <div className="gd-text-wrap">
          {displayedText}
          {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="gd-cursor" />}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="gd-footer">
         {!customMessage && tutorialSteps && currentStepIndex < tutorialSteps.length - 1 && (
            <button onClick={handleSkip} className="gd-btn-skip">
              <SkipForward size={16} /> Skip
            </button>
         )}

        <button onClick={handleNext} className="gd-btn-next">
          {customMessage || (tutorialSteps && currentStepIndex === tutorialSteps.length - 1) ? 'Got it!' : 'Next'} 
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};
