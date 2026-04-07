import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { ResultsScreen } from './components/ResultsScreen';
import { GuideCharacter } from './components/guide/GuideCharacter';

export default function App() {
  const { gamePhase } = useGameStore();

  return (
    <>
      <AnimatePresence mode="wait">
        {gamePhase === 'home' && <HomePage key="home" />}
        {(gamePhase === 'briefing' || gamePhase === 'playing' || gamePhase === 'accusing') && (
          <GamePage key="game" />
        )}
        {gamePhase === 'result' && <ResultsScreen key="result" />}
      </AnimatePresence>
      <GuideCharacter />
    </>
  );
}
