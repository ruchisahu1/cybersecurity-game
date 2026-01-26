'use client';

import { useState, useCallback, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import { GlossaryTooltip } from '@/components/ui/Tooltip';
import { HintPopup } from '@/components/ui/HintPopup';
import {
  getStarterClues,
  getLockedClues,
  getClueById,
  getClueStrengthColor,
  getClueStrengthLabel,
} from '@/data/clues';
import { getTermById } from '@/data/glossary';
import { Clue, InvestigationAction } from '@/types/clue';

// ============================================
// CLUE DETAIL MODAL CONTENT
// ============================================

interface ClueDetailProps {
  clue: Clue;
  onInvestigate: (action: InvestigationAction) => void;
  canAfford: (cost: number) => boolean;
  onClose: () => void;
  onLearnMore?: (termId: string) => void;
}

function ClueDetail({ clue, onInvestigate, canAfford, onClose, onLearnMore }: ClueDetailProps) {
  const strengthColor = getClueStrengthColor(clue.strength);
  const strengthLabel = getClueStrengthLabel(clue.strength);

  const handleInvestigate = (action: InvestigationAction) => {
    if (!canAfford(action.cost)) return;
    onInvestigate(action);
    onClose();
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{clue.icon || '📄'}</div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{clue.title}</h2>
            {clue.subtitle && (
              <p className="text-slate-400 text-sm mt-1">{clue.subtitle}</p>
            )}
          </div>
          <div className={`px-3 py-1.5 text-sm rounded border ${strengthColor}`}>
            {strengthLabel}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed bg-slate-800/30 rounded-lg p-4 border border-slate-700">
          {clue.content}
        </pre>
      </div>

      {/* Metadata */}
      <div className="px-6 pb-4 space-y-3">
        {/* Points To */}
        {clue.pointsTo.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Points to:</span>
            {clue.pointsTo.map((suspect) => (
              <span
                key={suspect}
                className="inline-block px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded border border-red-500/30"
              >
                {suspect.replace('suspect_', 'Suspect ').toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* Rules Out */}
        {clue.rulesOut && clue.rulesOut.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Rules out:</span>
            {clue.rulesOut.map((suspect) => (
              <span
                key={suspect}
                className="inline-block px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded border border-green-500/30"
              >
                {suspect.replace('suspect_', 'Suspect ').toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* Keywords with Glossary Tooltips */}
        {clue.keywords.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Learn about:</span>
            {clue.keywords.map((keyword) => {
              const term = getTermById(keyword);
              if (!term) {
                // Fallback for keywords without glossary entries
                return (
                  <span
                    key={keyword}
                    className="inline-block px-2 py-1 text-xs bg-slate-600/20 text-slate-400 
                               rounded border border-slate-600/30"
                  >
                    {keyword.replace(/_/g, ' ')}
                  </span>
                );
              }
              return (
                <GlossaryTooltip
                  key={keyword}
                  termId={keyword}
                  onLearnMore={onLearnMore}
                >
                  <span className="inline-flex items-center gap-1">
                    <span>{term.icon}</span>
                    <span>{term.term}</span>
                  </span>
                </GlossaryTooltip>
              );
            })}
          </div>
        )}
      </div>

      {/* Investigation Actions */}
      {clue.investigationActions && clue.investigationActions.length > 0 && (
        <div className="p-6 bg-slate-800/50 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-4 font-medium">
            🔍 Available Investigations
          </p>
          <div className="flex flex-col gap-3">
            {clue.investigationActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleInvestigate(action)}
                disabled={!canAfford(action.cost)}
                className={`
                  w-full px-4 py-3 rounded-lg text-sm font-medium
                  transition-all flex items-center justify-between
                  ${canAfford(action.cost)
                    ? 'bg-amber-600/20 border border-amber-500/30 text-amber-400 hover:bg-amber-600/30 hover:scale-[1.02]'
                    : 'bg-slate-700/50 border border-slate-600 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span>🔍</span>
                  <span>{action.label}</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs ${canAfford(action.cost) ? 'bg-amber-500/20' : 'bg-slate-600/50'}`}>
                  {action.cost} credits
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Close Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ============================================
// UNLOCK NOTIFICATION COMPONENT
// ============================================

interface UnlockNotificationProps {
  clue: Clue;
  onViewDetails: () => void;
  onClose: () => void;
}

function UnlockNotification({ clue, onViewDetails, onClose }: UnlockNotificationProps) {
  const strengthColor = getClueStrengthColor(clue.strength);
  const strengthLabel = getClueStrengthLabel(clue.strength);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Get preview text (first 2-3 lines)
  const previewLines = clue.content.split('\n').slice(0, 3).join('\n');
  const previewText = previewLines.length < clue.content.length 
    ? previewLines + '...' 
    : previewLines;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pointer-events-none">
      <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-lg shadow-2xl max-w-lg w-full mx-4 pointer-events-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{clue.icon || '📄'}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-cyan-400">🔓 Clue Unlocked!</span>
              </div>
              <h3 className="text-xl font-bold text-white">{clue.title}</h3>
              {clue.subtitle && (
                <p className="text-slate-400 text-sm mt-1">{clue.subtitle}</p>
              )}
            </div>
            <div className={`px-3 py-1.5 text-xs rounded border ${strengthColor}`}>
              {strengthLabel}
            </div>
          </div>

          {/* Preview Content */}
          <div className="mb-4 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
            <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed line-clamp-3">
              {previewText}
            </pre>
          </div>

          {/* Points To / Rules Out */}
          {(clue.pointsTo.length > 0 || (clue.rulesOut && clue.rulesOut.length > 0)) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {clue.pointsTo.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Points to:</span>
                  {clue.pointsTo.map((suspect) => (
                    <span
                      key={suspect}
                      className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded border border-red-500/30"
                    >
                      {suspect.replace('suspect_', 'Suspect ').toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
              {clue.rulesOut && clue.rulesOut.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">Rules out:</span>
                  {clue.rulesOut.map((suspect) => (
                    <span
                      key={suspect}
                      className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded border border-green-500/30"
                    >
                      {suspect.replace('suspect_', 'Suspect ').toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onViewDetails}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium"
            >
              View Details
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

          {/* Auto-dismiss indicator */}
          <div className="mt-3 text-xs text-slate-500 text-center">
            Auto-closes in 5 seconds
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CLUE CARD COMPONENT (Compact)
// ============================================

interface ClueCardProps {
  clue: Clue;
  isUnlocked: boolean;
  isViewed: boolean;
  isRecentlyUnlocked?: boolean;
  onSelect: (clue: Clue) => void;
  onUnlock: (clueId: string, cost: number) => void;
  canAfford: (cost: number) => boolean;
}

function ClueCard({
  clue,
  isUnlocked,
  isViewed,
  isRecentlyUnlocked = false,
  onSelect,
  onUnlock,
  canAfford,
}: ClueCardProps) {
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const isLocked = clue.type === 'locked' && !isUnlocked;
  const strengthColor = getClueStrengthColor(clue.strength);
  const strengthLabel = getClueStrengthLabel(clue.strength);

  const handleCardClick = () => {
    if (isLocked) return;
    onSelect(clue);
  };

  const handleUnlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAfford(clue.costToView)) return;

    setShowUnlockAnimation(true);
    setTimeout(() => {
      onUnlock(clue.id, clue.costToView);
      setShowUnlockAnimation(false);
    }, 500);
  };

  return (
    <div
      className={`
        relative rounded-lg border transition-all duration-300
        ${isLocked
          ? 'bg-slate-800/30 border-slate-700 cursor-not-allowed'
          : 'bg-slate-800/50 border-slate-600 cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800'
        }
        ${showUnlockAnimation ? 'animate-pulse ring-2 ring-cyan-500' : ''}
        ${isRecentlyUnlocked && !isLocked ? 'ring-2 ring-cyan-500 bg-cyan-500/10 animate-pulse' : ''}
      `}
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={`
              text-3xl flex-shrink-0
              ${isLocked ? 'opacity-30 blur-sm' : ''}
            `}
          >
            {isLocked ? '🔒' : clue.icon || '📄'}
          </div>

          {/* Title & Subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3
                className={`
                  font-medium truncate
                  ${isLocked ? 'text-slate-500' : 'text-white'}
                `}
              >
                {clue.title}
              </h3>
              {!isViewed && isUnlocked && clue.type === 'locked' && (
                <span className="px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-full animate-pulse">
                  NEW
                </span>
              )}
            </div>
            {clue.subtitle && (
              <p className={`text-sm ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                {clue.subtitle}
              </p>
            )}
          </div>

          {/* Strength Badge (only for unlocked) */}
          {!isLocked && (
            <div
              className={`
                px-2 py-1 text-xs rounded border flex-shrink-0
                ${strengthColor}
              `}
            >
              {strengthLabel}
            </div>
          )}
        </div>

        {/* Locked State */}
        {isLocked && (
          <div className="mt-4">
            <p className="text-sm text-slate-500 italic mb-3 line-clamp-2">
              {clue.contentLocked || 'This clue is locked...'}
            </p>
            <button
              onClick={handleUnlock}
              disabled={!canAfford(clue.costToView)}
              className={`
                w-full px-4 py-2 rounded-lg text-sm font-medium
                transition-colors flex items-center justify-center gap-2
                ${canAfford(clue.costToView)
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }
              `}
            >
              <span>🔓</span>
              <span>Unlock ({clue.costToView} credits)</span>
            </button>
          </div>
        )}

        {/* Click to view indicator */}
        {!isLocked && (
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-500">Click to view details</p>
            {clue.investigationActions && clue.investigationActions.length > 0 && (
              <span className="text-xs text-amber-500">
                {clue.investigationActions.length} investigation{clue.investigationActions.length > 1 ? 's' : ''} available
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// EVIDENCE LOCKER COMPONENT
// ============================================

export function EvidenceLocker() {
  const { state, dispatch } = useGame();
  const [filter, setFilter] = useState<'all' | 'starter' | 'unlocked'>('all');
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [recentlyUnlockedClue, setRecentlyUnlockedClue] = useState<Clue | null>(null);
  const [highlightedClueId, setHighlightedClueId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const canAfford = useCallback(
    (cost: number) => state.credits >= cost,
    [state.credits]
  );

  const handleSelectClue = useCallback(
    (clue: Clue) => {
      // Mark as viewed when opened
      if (!state.viewedClues.includes(clue.id)) {
        dispatch({ type: 'VIEW_CLUE', clueId: clue.id });
      }
      setSelectedClue(clue);
    },
    [dispatch, state.viewedClues]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedClue(null);
  }, []);

  const handleCloseNotification = useCallback(() => {
    // Clear notification immediately, but keep highlight visible for a bit longer
    setRecentlyUnlockedClue(null);
    setTimeout(() => {
      setHighlightedClueId(null);
    }, 3000);
  }, []);

  const handleViewUnlockedClue = useCallback(() => {
    if (recentlyUnlockedClue) {
      setRecentlyUnlockedClue(null);
      setSelectedClue(recentlyUnlockedClue);
    }
  }, [recentlyUnlockedClue]);

  const handleUnlockClue = useCallback(
    (clueId: string, cost: number) => {
      if (state.credits >= cost) {
        dispatch({ type: 'UNLOCK_CLUE', clueId, cost });
        // Show notification for unlocked clue
        const unlockedClue = getClueById(clueId);
        if (unlockedClue) {
          setRecentlyUnlockedClue(unlockedClue);
          setHighlightedClueId(clueId);
        }
      }
    },
    [dispatch, state.credits]
  );

  const handleInvestigate = useCallback(
    (action: InvestigationAction) => {
      if (state.credits >= action.cost) {
        dispatch({ type: 'UNLOCK_CLUE', clueId: action.unlocksClueId, cost: action.cost });
        // Show notification for unlocked clue
        const unlockedClue = getClueById(action.unlocksClueId);
        if (unlockedClue) {
          setRecentlyUnlockedClue(unlockedClue);
          setHighlightedClueId(action.unlocksClueId);
        }
      }
    },
    [dispatch, state.credits]
  );

  // Navigate to Tech Wiki when "Learn More" is clicked on a glossary term
  const handleLearnMore = useCallback(
    (termId: string) => {
      setSelectedClue(null); // Close the clue modal
      dispatch({ type: 'CHANGE_TAB', tab: 'wiki' });
      // The wiki will handle showing the term detail
      // We can store the selected term in localStorage for the wiki to pick up
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedGlossaryTerm', termId);
      }
    },
    [dispatch]
  );

  // Time tracking for progressive hint
  useEffect(() => {
    // Reset hint state when switching tabs
    setShowHint(false);

    // Only track time when on evidence tab
    if (state.currentTab !== 'evidence') {
      return;
    }

    // Check if hint has already been shown
    const hintShown = typeof window !== 'undefined' && localStorage.getItem('evidence-chat-hint-shown') === 'true';
    if (hintShown) {
      return;
    }

    // Start timer after 30 seconds
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [state.currentTab]);

  // Get filtered clues
  const starterClues = getStarterClues();
  const lockedClues = getLockedClues();
  const unlockedClueIds = state.unlockedClues;

  const filteredClues = (() => {
    switch (filter) {
      case 'starter':
        return starterClues;
      case 'unlocked':
        return lockedClues.filter((c) => unlockedClueIds.includes(c.id));
      case 'all':
      default:
        return [
          ...starterClues,
          ...lockedClues.filter((c) => unlockedClueIds.includes(c.id)),
        ];
    }
  })();

  const lockedCount = lockedClues.filter((c) => !unlockedClueIds.includes(c.id)).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Evidence Locker</h2>
        <p className="text-slate-400">
          Examine clues to solve the case. Investigate deeper to unlock more evidence.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
          <span className="text-slate-400 text-sm">Starter Clues: </span>
          <span className="text-white font-medium">{starterClues.length}</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
          <span className="text-slate-400 text-sm">Unlocked: </span>
          <span className="text-cyan-400 font-medium">{unlockedClueIds.length}</span>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
          <span className="text-slate-400 text-sm">Still Locked: </span>
          <span className="text-amber-400 font-medium">{lockedCount}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: 'All Evidence' },
          { id: 'starter', label: 'Starter Clues' },
          { id: 'unlocked', label: 'Unlocked' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as typeof filter)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === tab.id
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clue Grid */}
      {filteredClues.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredClues.map((clue) => (
            <ClueCard
              key={clue.id}
              clue={clue}
              isUnlocked={clue.type === 'starter' || unlockedClueIds.includes(clue.id)}
              isViewed={state.viewedClues.includes(clue.id)}
              isRecentlyUnlocked={highlightedClueId === clue.id}
              onSelect={handleSelectClue}
              onUnlock={handleUnlockClue}
              canAfford={canAfford}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-slate-400">No clues match the current filter</p>
        </div>
      )}

      {/* Locked Clues Section */}
      {filter === 'all' && lockedCount > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-slate-300 mb-4 flex items-center gap-2">
            <span>🔒</span>
            <span>Locked Evidence ({lockedCount})</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {lockedClues
              .filter((c) => !unlockedClueIds.includes(c.id))
              .map((clue) => (
                <ClueCard
                  key={clue.id}
                  clue={clue}
                  isUnlocked={false}
                  isViewed={false}
                  isRecentlyUnlocked={false}
                  onSelect={handleSelectClue}
                  onUnlock={handleUnlockClue}
                  canAfford={canAfford}
                />
              ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Evidence Strength Legend</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded border ${getClueStrengthColor('strong')}`}>
              🔴 Strong
            </span>
            <span className="text-slate-500">Direct proof</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded border ${getClueStrengthColor('supporting')}`}>
              🟡 Supporting
            </span>
            <span className="text-slate-500">Helps build case</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded border ${getClueStrengthColor('inconclusive')}`}>
              ⚪ Inconclusive
            </span>
            <span className="text-slate-500">Rules out suspects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded border ${getClueStrengthColor('misleading')}`}>
              🟣 Misleading
            </span>
            <span className="text-slate-500">Red herring</span>
          </div>
        </div>
      </div>

      {/* Clue Detail Modal */}
      <Modal isOpen={selectedClue !== null} onClose={handleCloseModal}>
        {selectedClue && (
          <ClueDetail
            clue={selectedClue}
            onInvestigate={handleInvestigate}
            canAfford={canAfford}
            onClose={handleCloseModal}
            onLearnMore={handleLearnMore}
          />
        )}
      </Modal>

      {/* Unlock Notification */}
      {recentlyUnlockedClue && (
        <UnlockNotification
          clue={recentlyUnlockedClue}
          onViewDetails={handleViewUnlockedClue}
          onClose={handleCloseNotification}
        />
      )}

      {/* Progressive hint popup */}
      {showHint && (
        <HintPopup 
          show={showHint} 
          onDismiss={() => setShowHint(false)}
          onNavigateToChat={() => {
            dispatch({ type: 'CHANGE_TAB', tab: 'chat' });
            setShowHint(false);
          }}
        />
      )}
    </div>
  );
}
