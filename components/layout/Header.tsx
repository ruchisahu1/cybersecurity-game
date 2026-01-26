'use client';

import { useState, useCallback, useEffect } from 'react';
import { CreditCounter } from '@/components/ui/CreditCounter';

interface HeaderProps {
  onReplayTutorial?: () => void;
  onResetGame?: () => void;
}

export function Header({ onReplayTutorial, onResetGame }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetClick = useCallback(() => {
    setShowMenu(false);
    setShowResetConfirm(true);
  }, []);

  const handleConfirmReset = useCallback(() => {
    setShowResetConfirm(false);
    onResetGame?.();
  }, [onResetGame]);

  const handleCancelReset = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  // Handle Escape key to close reset confirmation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showResetConfirm) {
        setShowResetConfirm(false);
      }
    };

    if (showResetConfirm) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showResetConfirm]);

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">🔐</span>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                CyberSleuth
              </h1>
              <p className="text-xs text-slate-400">
                Account Recovery Investigation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 
                         rounded-lg transition-colors"
                aria-label="Settings menu"
                aria-expanded={showMenu}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 
                                rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {onReplayTutorial && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onReplayTutorial();
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-300 
                                 hover:bg-slate-700 hover:text-white transition-colors
                                 flex items-center gap-2"
                      >
                        <span>📖</span>
                        <span>Replay Tutorial</span>
                      </button>
                    )}
                    {onResetGame && (
                      <button
                        onClick={handleResetClick}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 
                                 hover:bg-red-500/10 hover:text-red-300 transition-colors
                                 flex items-center gap-2"
                      >
                        <span>🔄</span>
                        <span>Reset Game</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Credit Counter */}
            <div id="credit-counter">
              <CreditCounter />
            </div>
          </div>
        </div>
      </header>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCancelReset}
            aria-hidden="true"
          />

          {/* Modal */}
          <div 
            className="relative w-full max-w-md bg-slate-900 border border-red-500/30 
                     rounded-xl shadow-2xl shadow-red-500/10 overflow-hidden
                     animate-in fade-in zoom-in-95 duration-200"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            aria-describedby="reset-description"
          >
            {/* Warning Header */}
            <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <h2 id="reset-title" className="text-xl font-bold text-red-400">
                  Reset Game?
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <p id="reset-description" className="text-slate-300 leading-relaxed">
                This will <span className="text-red-400 font-medium">permanently delete</span> all your progress:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">×</span>
                  All unlocked clues and evidence
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">×</span>
                  Chat history with the victim
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">×</span>
                  Accusations and recovery actions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">×</span>
                  Credits will reset to 100
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleCancelReset}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 
                         text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 
                         text-white rounded-lg font-medium transition-colors
                         flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>Reset Game</span>
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="px-6 pb-4 text-center">
              <p className="text-xs text-slate-600">
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Esc</kbd> to cancel
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
