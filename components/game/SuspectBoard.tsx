'use client';

import { useState, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import {
  suspects,
  getSuspectById,
  calculateConfidence,
  getTotalEvidenceCount,
} from '@/data/suspects';
import {
  Suspect,
  ACCUSATION_COST,
  WRONG_ACCUSATION_PENALTY,
} from '@/types/suspect';

// Helper to get suspect letter (A, B, C, D) from suspect id
function getSuspectLetter(suspectId: string): string {
  const letterMap: Record<string, string> = {
    'suspect_a': 'A',
    'suspect_b': 'B',
    'suspect_c': 'C',
    'suspect_d': 'D',
  };
  return letterMap[suspectId] || '?';
}

// ============================================
// CONFIDENCE METER COMPONENT
// ============================================

interface ConfidenceMeterProps {
  percentage: number;
  strongCount: number;
  supportingCount: number;
}

function ConfidenceMeter({ percentage, strongCount, supportingCount }: ConfidenceMeterProps) {
  const getColor = () => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-slate-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">Evidence collected</span>
        <span className="text-white font-medium">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex gap-3 text-xs">
        <span className="text-red-400">🔴 {strongCount} strong</span>
        <span className="text-yellow-400">🟡 {supportingCount} supporting</span>
      </div>
    </div>
  );
}

// ============================================
// SUSPECT CARD COMPONENT
// ============================================

interface SuspectCardProps {
  suspect: Suspect;
  confidence: ReturnType<typeof calculateConfidence>;
  hasBeenAccused: boolean;
  suspectLetter: string;
  canAccuseAnyone: boolean;
  onSelect: (suspect: Suspect) => void;
}

function SuspectCard({ suspect, confidence, hasBeenAccused, suspectLetter, canAccuseAnyone, onSelect }: SuspectCardProps) {
  return (
    <div
      className={`
        relative bg-slate-800/50 border rounded-lg p-5 cursor-pointer
        transition-all duration-300 hover:scale-[1.02]
        ${hasBeenAccused
          ? 'border-red-500/50 opacity-60'
          : canAccuseAnyone
            ? 'border-green-500/50 hover:border-green-400'
            : 'border-slate-700 hover:border-slate-500'
        }
      `}
      onClick={() => onSelect(suspect)}
    >
      {/* Suspect Letter Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-slate-900">
        {suspectLetter}
      </div>

      {/* Accused badge */}
      {hasBeenAccused && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
          ACCUSED
        </div>
      )}

      {/* Can accuse indicator */}
      {canAccuseAnyone && !hasBeenAccused && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded animate-pulse">
          READY
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{suspect.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{suspect.name}</h3>
          <p className="text-sm text-cyan-400">{suspect.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
        {suspect.description}
      </p>

      {/* Confidence Meter */}
      <ConfidenceMeter
        percentage={confidence.percentage}
        strongCount={confidence.strongCount}
        supportingCount={confidence.supportingCount}
      />

      {/* Click indicator */}
      <p className="text-xs text-slate-500 mt-4 text-center">
        Click to view details & accuse
      </p>
    </div>
  );
}

// ============================================
// SUSPECT DETAIL MODAL
// ============================================

interface SuspectDetailProps {
  suspect: Suspect;
  confidence: ReturnType<typeof calculateConfidence>;
  hasBeenAccused: boolean;
  canAfford: boolean;
  suspectLetter: string;
  canAccuseAnyone: boolean;
  totalEvidence: { totalStrong: number; totalSupporting: number };
  onAccuse: () => void;
  onClose: () => void;
}

function SuspectDetail({
  suspect,
  confidence,
  hasBeenAccused,
  canAfford,
  suspectLetter,
  canAccuseAnyone,
  totalEvidence,
  onAccuse,
  onClose,
}: SuspectDetailProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAccuseClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmAccuse = () => {
    onAccuse();
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="text-5xl">{suspect.icon}</div>
            <div className="absolute -top-2 -left-2 w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-slate-800">
              {suspectLetter}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-cyan-400">Suspect {suspectLetter}:</span> {suspect.name}
            </h2>
            <p className="text-cyan-400 font-medium">{suspect.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Attack Method */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Attack Method
          </h3>
          <p className="text-white">{suspect.attackMethod}</p>
        </div>

        {/* How It Works */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            How It Works
          </h3>
          <ol className="space-y-2">
            {suspect.howItWorks.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs text-cyan-400 font-bold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Evidence Needed */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Evidence Needed to Prove
          </h3>
          <ul className="space-y-2">
            {suspect.evidenceNeeded.map((evidence) => {
              const isCollected = confidence.strongCount > 0 || confidence.supportingCount > 0
                ? suspect.evidenceNeeded.some(
                    (e) =>
                      e.clueId === evidence.clueId &&
                      ((e.strength === 'strong' && confidence.strongCount > 0) ||
                        (e.strength === 'supporting' && confidence.supportingCount > 0))
                  )
                : false;

              return (
                <li
                  key={evidence.clueId}
                  className={`flex items-center gap-2 text-sm ${
                    isCollected ? 'text-green-400' : 'text-slate-500'
                  }`}
                >
                  <span>
                    {evidence.strength === 'strong' ? '🔴' : '🟡'}
                  </span>
                  <span>{evidence.description}</span>
                  {isCollected && <span className="text-green-400">✓</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Confidence */}
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Your Evidence
          </h3>
          <ConfidenceMeter
            percentage={confidence.percentage}
            strongCount={confidence.strongCount}
            supportingCount={confidence.supportingCount}
          />
        </div>

        {/* Keywords */}
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Related Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {suspect.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded border border-purple-500/30"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accusation Section */}
      <div className="p-6 bg-slate-800/50 border-t border-slate-700">
        {hasBeenAccused ? (
          <div className="text-center py-4">
            <span className="text-red-400 font-medium">
              ❌ You already accused this suspect
            </span>
          </div>
        ) : !canAccuseAnyone ? (
          /* Not enough evidence - BLOCKED */
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-3">
                <span className="text-2xl">🔒</span>
                <span className="font-medium">Insufficient Evidence</span>
              </div>
              <p className="text-sm text-slate-500 text-center">
                Collect more evidence to unlock accusations.
              </p>
              <div className="mt-3 p-3 bg-slate-800/50 rounded border border-slate-600">
                <p className="text-xs text-slate-400 text-center mb-2">Requirements (total collected):</p>
                <div className="flex flex-col gap-1 text-xs text-center">
                  <span className={totalEvidence.totalStrong >= 2 ? 'text-green-400' : 'text-slate-500'}>
                    {totalEvidence.totalStrong >= 2 ? '✓' : '○'} 2 Strong Proof clues (🔴)
                    <span className="text-slate-600"> — You have {totalEvidence.totalStrong}</span>
                  </span>
                  <span className="text-slate-600">— OR —</span>
                  <span className={totalEvidence.totalStrong >= 1 && totalEvidence.totalSupporting >= 2 ? 'text-green-400' : 'text-slate-500'}>
                    {totalEvidence.totalStrong >= 1 && totalEvidence.totalSupporting >= 2 ? '✓' : '○'} 1 Strong + 2 Supporting (🟡)
                    <span className="text-slate-600"> — You have {totalEvidence.totalStrong} strong, {totalEvidence.totalSupporting} supporting</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              disabled
              className="w-full px-4 py-3 rounded-lg font-medium bg-slate-700 text-slate-500 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>🔒</span>
              <span>Gather More Evidence</span>
            </button>
          </div>
        ) : showConfirm ? (
          /* Confirmation dialog */
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 font-medium text-center">
                ✓ You have enough evidence to accuse {suspect.name}
              </p>
              <p className="text-sm text-green-200/70 text-center mt-2">
                Cost: {ACCUSATION_COST} credits
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccuse}
                disabled={!canAfford}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium transition-colors
                  ${canAfford
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                Confirm Accusation
              </button>
            </div>
          </div>
        ) : (
          /* Ready to accuse */
          <div className="space-y-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400 text-center flex items-center justify-center gap-2">
                <span>✓</span>
                <span>You have sufficient evidence to make an accusation</span>
              </p>
            </div>
            <button
              onClick={handleAccuseClick}
              disabled={!canAfford}
              className={`
                w-full px-4 py-3 rounded-lg font-medium transition-all
                flex items-center justify-center gap-2
                ${canAfford
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }
              `}
            >
              <span>🎯</span>
              <span>Accuse {suspect.name}</span>
              <span className="text-sm opacity-75">({ACCUSATION_COST} credits)</span>
            </button>
          </div>
        )}
      </div>

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
// ACCUSATION RESULT MODAL
// ============================================

interface AccusationResultProps {
  suspect: Suspect;
  isCorrect: boolean;
  onClose: () => void;
}

function AccusationResult({ suspect, isCorrect, onClose }: AccusationResultProps) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className={`px-6 py-8 text-center ${
          isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}
      >
        <div className="text-6xl mb-4">{isCorrect ? '🎉' : '❌'}</div>
        <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {isCorrect ? 'Case Solved!' : 'Wrong Accusation!'}
        </h2>
        <p className="text-slate-400 mt-2">
          You accused: {suspect.name}
        </p>
      </div>

      {/* Feedback */}
      <div className="p-6">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
          {isCorrect ? suspect.correctFeedback : suspect.wrongFeedback}
        </pre>

        {!isCorrect && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium">
              Penalty: -{WRONG_ACCUSATION_PENALTY} credits
            </p>
          </div>
        )}
      </div>

      {/* Close Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onClose}
          className={`
            w-full px-4 py-3 rounded-lg font-medium transition-colors
            ${isCorrect
              ? 'bg-green-600 hover:bg-green-500 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-white'
            }
          `}
        >
          {isCorrect ? 'Continue to Recovery Phase' : 'Continue Investigation'}
        </button>
      </div>
    </div>
  );
}

// ============================================
// SUSPECT BOARD COMPONENT
// ============================================

export function SuspectBoard() {
  const { state, dispatch } = useGame();
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [accusationResult, setAccusationResult] = useState<{
    suspect: Suspect;
    isCorrect: boolean;
  } | null>(null);

  const canAfford = state.credits >= ACCUSATION_COST;
  const accusedSuspectIds = state.accusationsMade.map((a) => a.suspectId);
  
  // Calculate global evidence count for accusation unlock
  const totalEvidence = getTotalEvidenceCount(state.unlockedClues);
  const { canAccuseAnyone } = totalEvidence;

  const handleSelectSuspect = useCallback((suspect: Suspect) => {
    setSelectedSuspect(suspect);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedSuspect(null);
  }, []);

  const handleAccuse = useCallback(() => {
    if (!selectedSuspect || !canAfford) return;

    const isCorrect = selectedSuspect.isCorrect;
    const totalCost = ACCUSATION_COST + (isCorrect ? 0 : WRONG_ACCUSATION_PENALTY);

    // Dispatch accusation
    dispatch({
      type: 'MAKE_ACCUSATION',
      suspectId: selectedSuspect.id,
      isCorrect,
      cost: totalCost,
    });

    // If correct, move to recovery phase
    if (isCorrect) {
      dispatch({ type: 'SET_PHASE', phase: 'recovery' });
    }

    // Show result
    setAccusationResult({
      suspect: selectedSuspect,
      isCorrect,
    });
    setSelectedSuspect(null);
  }, [selectedSuspect, canAfford, dispatch]);

  const handleCloseResult = useCallback(() => {
    setAccusationResult(null);
  }, []);

  // Check if case is already solved
  const isCaseSolved = state.accusationsMade.some((a) => a.isCorrect);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Suspect Board</h2>
        <p className="text-slate-400">
          Review potential suspects and make your accusation when ready.
          Accusations cost{' '}
          <span className="text-cyan-400 font-mono">{ACCUSATION_COST} credits</span>.
          Wrong guesses cost an additional{' '}
          <span className="text-red-400 font-mono">{WRONG_ACCUSATION_PENALTY} credits</span>.
        </p>
      </div>

      {/* Case Solved Banner */}
      {isCaseSolved && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <h3 className="text-green-400 font-bold">Case Solved!</h3>
              <p className="text-green-200/70 text-sm">
                You correctly identified the attacker. Proceed to the Recovery Phase.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suspect Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suspects.map((suspect) => {
          const confidence = calculateConfidence(suspect, state.unlockedClues);
          const hasBeenAccused = accusedSuspectIds.includes(suspect.id);

          return (
            <SuspectCard
              key={suspect.id}
              suspect={suspect}
              confidence={confidence}
              hasBeenAccused={hasBeenAccused}
              suspectLetter={getSuspectLetter(suspect.id)}
              canAccuseAnyone={canAccuseAnyone}
              onSelect={handleSelectSuspect}
            />
          );
        })}
      </div>

      {/* Accusation Requirements */}
      <div className={`mt-8 p-4 rounded-lg border ${canAccuseAnyone ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/30 border-slate-700'}`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-300">
            Accusation Requirements
          </h4>
          {canAccuseAnyone && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
              UNLOCKED
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400">
          {canAccuseAnyone 
            ? 'You have enough evidence! You can now accuse any suspect.'
            : 'To unlock accusations, collect EITHER:'
          }
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className={totalEvidence.totalStrong >= 2 ? 'text-green-400' : 'text-slate-500'}>
              {totalEvidence.totalStrong >= 2 ? '✓' : '○'}
            </span>
            <span className={totalEvidence.totalStrong >= 2 ? 'text-green-400' : 'text-slate-400'}>
              2 Strong Proof clues (🔴) — <span className="font-mono">{totalEvidence.totalStrong}/2</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className={totalEvidence.totalStrong >= 1 && totalEvidence.totalSupporting >= 2 ? 'text-green-400' : 'text-slate-500'}>
              {totalEvidence.totalStrong >= 1 && totalEvidence.totalSupporting >= 2 ? '✓' : '○'}
            </span>
            <span className={totalEvidence.totalStrong >= 1 && totalEvidence.totalSupporting >= 2 ? 'text-green-400' : 'text-slate-400'}>
              1 Strong + 2 Supporting (🟡) — <span className="font-mono">{totalEvidence.totalStrong} strong, {totalEvidence.totalSupporting} supporting</span>
            </span>
          </li>
        </ul>
        {!canAccuseAnyone && (
          <p className="mt-3 text-xs text-amber-400">
            ⚠️ Keep investigating to unlock the ability to accuse suspects.
          </p>
        )}
      </div>

      {/* Suspect Detail Modal */}
      <Modal isOpen={selectedSuspect !== null} onClose={handleCloseDetail}>
        {selectedSuspect && (
          <SuspectDetail
            suspect={selectedSuspect}
            confidence={calculateConfidence(selectedSuspect, state.unlockedClues)}
            hasBeenAccused={accusedSuspectIds.includes(selectedSuspect.id)}
            canAfford={canAfford}
            suspectLetter={getSuspectLetter(selectedSuspect.id)}
            canAccuseAnyone={canAccuseAnyone}
            totalEvidence={totalEvidence}
            onAccuse={handleAccuse}
            onClose={handleCloseDetail}
          />
        )}
      </Modal>

      {/* Accusation Result Modal */}
      <Modal isOpen={accusationResult !== null} onClose={handleCloseResult}>
        {accusationResult && (
          <AccusationResult
            suspect={accusationResult.suspect}
            isCorrect={accusationResult.isCorrect}
            onClose={handleCloseResult}
          />
        )}
      </Modal>
    </div>
  );
}
