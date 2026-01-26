'use client';

import { useState, useEffect, useCallback } from 'react';

// ============================================
// STORAGE KEY
// ============================================

const HINT_STORAGE_KEY = 'evidence-chat-hint-shown';

// ============================================
// HINT POPUP COMPONENT
// ============================================

interface HintPopupProps {
  onDismiss?: () => void;
  show?: boolean; // Allow parent to control visibility
  onNavigateToChat?: () => void; // Callback to navigate to chat tab
}

export function HintPopup({ onDismiss, show, onNavigateToChat }: HintPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If parent explicitly controls visibility via show prop, respect it
    if (show !== undefined) {
      setIsVisible(show);
    } else {
      // If no show prop, check localStorage only
      const hasShown = typeof window !== 'undefined' && localStorage.getItem(HINT_STORAGE_KEY) === 'true';
      setIsVisible(!hasShown);
    }
  }, [show]);

  useEffect(() => {
    // Auto-dismiss after 8 seconds if visible
    if (isVisible) {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(HINT_STORAGE_KEY, 'true');
        }
        setIsVisible(false);
        onDismiss?.();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  const handleDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(HINT_STORAGE_KEY, 'true');
    }
    setIsVisible(false);
    onDismiss?.();
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-white mb-1">Tip</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Visit{' '}
              <button
                onClick={() => {
                  onNavigateToChat?.();
                  handleDismiss();
                }}
                className="text-cyan-400 font-medium hover:text-cyan-300 underline transition-colors cursor-pointer"
              >
                Victim Chat
              </button>{' '}
              to get more details about the evidence you've found!
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Dismiss hint"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if the evidence chat hint has been shown
 */
export function isHintShown(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(HINT_STORAGE_KEY) === 'true';
}

/**
 * Reset the hint shown status
 */
export function resetHint(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HINT_STORAGE_KEY);
}
