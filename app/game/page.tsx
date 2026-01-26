'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { Header } from '@/components/layout/Header';
import { GameTabs } from '@/components/layout/GameTabs';
import { EvidenceLocker } from '@/components/game/EvidenceLocker';
import { VictimChat } from '@/components/game/VictimChat';
import { Timeline } from '@/components/game/Timeline';
import { SuspectBoard } from '@/components/game/SuspectBoard';
import { TechWiki } from '@/components/game/TechWiki';
import { ExternalSupport } from '@/components/game/ExternalSupport';
import { RecoveryPhase } from '@/components/game/RecoveryPhase';
import { EndingScreen } from '@/components/game/EndingScreen';
import { Tutorial, resetAllTutorials, isTabTutorialCompleted } from '@/components/ui/Tutorial';

function TabContent() {
  const { state } = useGame();

  switch (state.currentTab) {
    case 'evidence':
      return <EvidenceLocker />;
    case 'chat':
      return <VictimChat />;
    case 'timeline':
      return <Timeline />;
    case 'suspects':
      return <SuspectBoard />;
    case 'wiki':
      return <TechWiki />;
    case 'support':
      return <ExternalSupport />;
    case 'recovery':
      return <RecoveryPhase />;
    default:
      return <EvidenceLocker />;
  }
}

export default function GamePage() {
  const { state, dispatch } = useGame();
  const [showEnding, setShowEnding] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [forceTutorial, setForceTutorial] = useState(false);
  const [tutorialTab, setTutorialTab] = useState<typeof state.currentTab | null>(null);

  // Show ending screen when game phase becomes 'ended'
  useEffect(() => {
    if (state.gamePhase === 'ended') {
      setShowEnding(true);
    }
  }, [state.gamePhase]);

  // Show tab-specific tutorial when user first visits a tab
  useEffect(() => {
    // Don't show tutorial if ending screen is showing
    if (showEnding) return;

    if (forceTutorial) {
      // Force show tutorial for current tab
      setTutorialTab(state.currentTab);
      setShowTutorial(true);
      return;
    }

    // Check if tutorial for current tab has been shown
    const hasCompleted = isTabTutorialCompleted(state.currentTab);
    if (!hasCompleted) {
      setTutorialTab(state.currentTab);
      setShowTutorial(true);
    }
  }, [state.currentTab, forceTutorial, showEnding]);

  // Handle tutorial completion
  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false);
    setForceTutorial(false);
    setTutorialTab(null);
  }, []);

  // Handle replay tutorial (called from Header)
  const handleReplayTutorial = useCallback(() => {
    setForceTutorial(true);
    setShowTutorial(true);
    setTutorialTab(state.currentTab);
  }, [state.currentTab]);

  // Handle reset game (called from Header)
  const handleResetGame = useCallback(() => {
    // Reset game state
    dispatch({ type: 'RESET_GAME' });
    
    // Don't reset tutorials - they persist across game resets
    // Tutorials and hints will remain completed as they are user preferences
    
    // Reset UI states
    setShowEnding(false);
    // Don't force tutorial to show - respect user's tutorial completion status
    setForceTutorial(false);
    setShowTutorial(false);
    setTutorialTab(null);
  }, [dispatch]);

  // If showing ending screen
  if (showEnding && state.gamePhase === 'ended') {
    return <EndingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header onReplayTutorial={handleReplayTutorial} onResetGame={handleResetGame} />
      <GameTabs />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <TabContent />
        </div>
      </main>
      
      {/* View Results button when game is completed but reviewing */}
      {state.gamePhase === 'ended' && !showEnding && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setShowEnding(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg 
                     shadow-lg flex items-center gap-2 transition-colors"
          >
            <span>🏆</span>
            <span>View Results</span>
          </button>
        </div>
      )}

      {/* Tutorial Overlay */}
      {showTutorial && tutorialTab && (
        <Tutorial 
          tabId={tutorialTab}
          onComplete={handleTutorialComplete} 
          forceShow={forceTutorial} 
        />
      )}
    </div>
  );
}
