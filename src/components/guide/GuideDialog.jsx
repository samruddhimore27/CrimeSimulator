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
      className="glass-card-elevated p-0 overflow-hidden relative rounded-2xl w-[85vw] max-w-xl md:w-[600px] shadow-2xl z-50 border border-violet-500/30"
    >
      <div className="absolute -right-3 top-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[12px] border-l-[#0f1020] border-b-[10px] border-b-transparent z-40 hidden md:block" />

      {/* Header */}
      <div className="bg-violet-900/40 border-b border-violet-500/20 px-6 py-4 flex justify-between items-center">
        <h3 className="text-violet-300 font-bold flex items-center gap-2 text-base md:text-lg uppercase tracking-wider font-display">
          <Bot size={20} className="text-violet-400" />
          {gamePhase === 'home' && !customMessage ? 'System Initialization' : 'Agent Assist'}
        </h3>
        {(!customMessage) && tutorialSteps && (
          <div className="text-sm text-violet-400/60 font-mono">
             Seq {currentStepIndex + 1}/{tutorialSteps.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6 min-h-[140px] text-slate-100 text-lg md:text-xl leading-relaxed relative">
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
        <div className="relative z-10 font-medium">
          {displayedText}
          {isTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-2.5 h-6 bg-violet-400 ml-1 translate-y-1" />}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-black/30 px-6 py-4 border-t border-white/5 flex justify-end gap-3 rounded-b-2xl">
         {!customMessage && tutorialSteps && currentStepIndex < tutorialSteps.length - 1 && (
            <button
              onClick={handleSkip}
              className="text-sm md:text-base px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1 font-semibold"
            >
              <SkipForward size={16} /> Skip
            </button>
         )}

        <button
          onClick={handleNext}
          className="text-sm md:text-base px-6 py-2 rounded-lg text-white font-bold bg-violet-600 hover:bg-violet-500 shadow-lg hover:shadow-violet-500/50 transition-all flex items-center gap-1"
        >
          {customMessage || (tutorialSteps && currentStepIndex === tutorialSteps.length - 1) ? 'Got it!' : 'Next'} 
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};
