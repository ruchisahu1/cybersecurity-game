'use client';

import { useState, useEffect, useCallback } from 'react';
import { TabId } from '@/types';

// ============================================
// TUTORIAL CONFIGURATION
// ============================================

interface TutorialConfig {
  title: string;
  content: string;
  icon: string;
  highlight?: string; // CSS selector or element ID to highlight
}

const TUTORIAL_CONFIGS: Record<TabId, TutorialConfig> = {
  evidence: {
    title: 'Evidence Locker',
    content: 'Start here! You\'ll find clues that help identify the attacker. Some clues are free to view, others cost credits to unlock. Pay attention to clue strength - Strong evidence is most reliable.',
    icon: '🔍',
    highlight: 'tab-evidence',
  },
  chat: {
    title: 'Interview the Victim',
    content: 'Talk to Rashid, the victim. Ask questions to understand what happened. Each question costs 3 credits, so choose wisely. His answers may reveal important details about the attack.',
    icon: '💬',
    highlight: 'tab-chat',
  },
  timeline: {
    title: 'Attack Timeline',
    content: 'Review the sequence of events. Understanding when things happened helps identify patterns and narrow down suspects. Events are chronologically ordered to show the progression of the attack.',
    icon: '📅',
    highlight: 'tab-timeline',
  },
  suspects: {
    title: 'Suspect Board',
    content: 'Four suspects have been identified. Examine their profiles, motives, and technical skills. When you\'re confident, you can accuse a suspect (costs 15 credits). Be careful - wrong accusations waste credits!',
    icon: '🕵️',
    highlight: 'tab-suspects',
  },
  wiki: {
    title: 'Tech Wiki',
    content: 'Don\'t understand a technical term? The Wiki explains cybersecurity concepts. First lookup is free for each term.',
    icon: '📚',
    highlight: 'tab-wiki',
  },
  support: {
    title: 'External Support',
    content: 'Stuck? You can contact external resources like tech support or cybersecurity experts for hints. This costs credits but can provide valuable insights to help your investigation.',
    icon: '🛠️',
    highlight: 'tab-support',
  },
  recovery: {
    title: 'Recovery Phase',
    content: 'Help Rashid recover his account by taking recovery actions. Each action costs credits but brings you closer to a better ending. Choose wisely to maximize your final score.',
    icon: '🔧',
    highlight: 'tab-recovery',
  },
};

// ============================================
// STORAGE HELPERS
// ============================================

function getTutorialStorageKey(tabId: TabId): string {
  return `tutorial-${tabId}-completed`;
}

export function isTabTutorialCompleted(tabId: TabId): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(getTutorialStorageKey(tabId)) === 'true';
}

export function markTabTutorialCompleted(tabId: TabId): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getTutorialStorageKey(tabId), 'true');
}

export function resetTabTutorial(tabId: TabId): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getTutorialStorageKey(tabId));
}

export function resetAllTutorials(): void {
  if (typeof window === 'undefined') return;
  Object.keys(TUTORIAL_CONFIGS).forEach((tabId) => {
    localStorage.removeItem(getTutorialStorageKey(tabId as TabId));
  });
}

// Legacy function for backward compatibility
export function resetTutorial(): void {
  resetAllTutorials();
}

// ============================================
// TUTORIAL COMPONENT
// ============================================

interface TutorialProps {
  tabId: TabId;
  onComplete: () => void;
  forceShow?: boolean;
}

export function Tutorial({ tabId, onComplete, forceShow = false }: TutorialProps) {
  const [isVisible, setIsVisible] = useState(false);

  const tutorial = TUTORIAL_CONFIGS[tabId];

  // Check if tutorial should be shown
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    // Check if this tab's tutorial has been completed
    const hasCompleted = isTabTutorialCompleted(tabId);
    if (!hasCompleted) {
      setIsVisible(true);
    }
  }, [tabId, forceShow]);

  const handleComplete = useCallback(() => {
    markTabTutorialCompleted(tabId);
    setIsVisible(false);
    onComplete();
  }, [tabId, onComplete]);

  const handleSkip = useCallback(() => {
    markTabTutorialCompleted(tabId);
    setIsVisible(false);
    onComplete();
  }, [tabId, onComplete]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      switch (e.key) {
        case 'Enter':
        case 'Escape':
          handleComplete();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleComplete]);

  if (!isVisible || !tutorial) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleComplete}
      />

      {/* Tutorial Card */}
      <div
        className="relative w-full max-w-lg mx-4 bg-slate-900 border border-cyan-500/30 
                   rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden
                   animate-in fade-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl" aria-hidden="true">{tutorial.icon}</span>
            <div>
              <p className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                Tutorial
              </p>
              <h2 id="tutorial-title" className="text-xl font-bold text-white">
                {tutorial.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-slate-300 leading-relaxed">
            {tutorial.content}
          </p>
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex items-center justify-end gap-4">
          <button
            onClick={handleSkip}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleComplete}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white 
                     rounded-lg font-medium transition-colors flex items-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 
                     focus:ring-offset-slate-900"
          >
            <span>Got it</span>
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="px-6 pb-4 text-center">
          <p className="text-xs text-slate-600">
            Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Enter</kbd> or{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
