'use client';

import { useState, useCallback, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import {
  recoveryActions,
  getActionById,
  checkActionPenalty,
  getNextOptimalAction,
  isRecoveryComplete,
  calculateEnding,
  getRemainingActionsCost,
} from '@/data/recoveryActions';
import { RecoveryAction, RecoveryResult, OPTIMAL_ORDER } from '@/types/recovery';

// ============================================
// ACTION CARD COMPONENT
// ============================================

interface ActionCardProps {
  action: RecoveryAction;
  isCompleted: boolean;
  isNext: boolean;
  canAfford: boolean;
  onExecute: (action: RecoveryAction) => void;
}

function ActionCard({ action, isCompleted, isNext, canAfford, onExecute }: ActionCardProps) {
  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all
        ${isCompleted
          ? 'bg-green-500/10 border-green-500/30'
          : isNext
            ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/30'
            : 'bg-slate-800/50 border-slate-700'
        }
      `}
    >
      {/* Order Badge */}
      <div
        className={`
          absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center
          text-xs font-bold
          ${isCompleted
            ? 'bg-green-500 text-white'
            : isNext
              ? 'bg-cyan-500 text-white'
              : 'bg-slate-700 text-slate-400'
          }
        `}
      >
        {isCompleted ? '✓' : action.order}
      </div>

      <div className="flex items-start gap-3 ml-4">
        {/* Icon */}
        <span className="text-2xl">{action.icon}</span>

        {/* Content */}
        <div className="flex-1">
          <h4 className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
            {action.title}
          </h4>
          <p className="text-xs text-slate-400 mt-1">{action.description}</p>
        </div>

        {/* Cost / Status */}
        <div className="text-right">
          {isCompleted ? (
            <span className="text-xs text-green-400 font-medium">Completed</span>
          ) : (
            <>
              <span className={`text-lg font-bold ${canAfford ? 'text-cyan-400' : 'text-red-400'}`}>
                {action.cost}
              </span>
              <span className="text-xs text-slate-500 block">credits</span>
            </>
          )}
        </div>
      </div>

      {/* Execute Button */}
      {!isCompleted && (
        <button
          onClick={() => onExecute(action)}
          disabled={!canAfford}
          className={`
            mt-3 ml-4 w-[calc(100%-1rem)] px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${canAfford
              ? isNext
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {canAfford ? (isNext ? 'Execute (Recommended)' : 'Execute') : 'Not Enough Credits'}
        </button>
      )}
    </div>
  );
}

// ============================================
// CONFIRMATION DIALOG
// ============================================

interface ConfirmDialogProps {
  action: RecoveryAction;
  hasPenalty: boolean;
  penaltyInfo: RecoveryAction['wrongOrderPenalties'][0] | null;
  canAfford: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  action,
  hasPenalty,
  penaltyInfo,
  canAfford,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className={`px-6 py-4 border-b border-slate-700 ${hasPenalty ? 'bg-amber-500/20' : 'bg-slate-800/50'}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{hasPenalty ? '⚠️' : action.icon}</span>
          <div>
            <h2 className="text-lg font-bold text-white">
              {hasPenalty ? 'Warning: Wrong Order!' : `Execute: ${action.title}`}
            </h2>
            <p className="text-sm text-slate-400">
              {hasPenalty ? 'This action is being performed out of sequence' : `Cost: ${action.cost} credits`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {hasPenalty && penaltyInfo ? (
          <>
            {/* Penalty Warning */}
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h3 className="text-red-400 font-medium mb-2">⚠️ Sequence Error!</h3>
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                {penaltyInfo.message}
              </pre>
            </div>

            {/* Penalty Cost */}
            <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Action Cost:</span>
                <span className="font-mono text-cyan-400">-{action.cost}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-400">Penalty:</span>
                <span className="font-mono text-red-400">-{penaltyInfo.penaltyCost}</span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700">
                <span className="font-medium text-white">Total:</span>
                <span className="font-mono font-bold text-red-400">
                  -{action.cost + penaltyInfo.penaltyCost}
                </span>
              </div>
            </div>

            {/* Lesson */}
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-400">
                <strong>💡 Lesson:</strong> {penaltyInfo.lesson}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Normal confirmation */}
            <p className="text-slate-300 mb-4">
              Are you sure you want to execute this action?
            </p>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <h4 className="font-medium text-white mb-2">{action.title}</h4>
              <p className="text-sm text-slate-400">{action.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-700">
                <span className="text-slate-400">Cost: </span>
                <span className="text-cyan-400 font-bold">{action.cost} credits</span>
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className={`
              flex-1 px-4 py-3 rounded-lg font-medium transition-colors
              ${canAfford
                ? hasPenalty
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            {hasPenalty ? 'Execute Anyway' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// RESULT MODAL
// ============================================

interface ResultModalProps {
  action: RecoveryAction;
  result: RecoveryResult;
  onClose: () => void;
}

function ResultModal({ action, result, onClose }: ResultModalProps) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className={`px-6 py-4 border-b border-slate-700 ${result.penaltyApplied ? 'bg-amber-500/20' : 'bg-green-500/20'}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{result.penaltyApplied ? '⚠️' : '✅'}</span>
          <div>
            <h2 className="text-lg font-bold text-white">{action.successMessage}</h2>
            {result.penaltyApplied && (
              <p className="text-sm text-amber-400">
                Penalty applied: -{result.penaltyAmount} credits
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Success Details */}
        <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Actions taken:</h3>
          <ul className="space-y-1">
            {action.successDetails.map((detail, index) => (
              <li key={index} className="text-sm text-slate-300">
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Result Message */}
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-400">
            <strong>Result:</strong> {action.resultMessage}
          </p>
        </div>

        {/* Penalty Info if applied */}
        {result.penaltyApplied && result.penaltyMessage && (
          <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-sm text-amber-400">
              <strong>💡 Remember:</strong> {result.penaltyMessage}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ============================================
// RECOVERY PHASE COMPONENT
// ============================================

export function RecoveryPhase() {
  const { state, dispatch } = useGame();
  const [selectedAction, setSelectedAction] = useState<RecoveryAction | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<RecoveryResult | null>(null);
  const [totalPenalties, setTotalPenalties] = useState(0);

  // Get completed recovery actions
  const completedActions = state.recoveryActions.filter((id) =>
    recoveryActions.some((a) => a.id === id)
  );

  const canAfford = useCallback(
    (cost: number) => state.credits >= cost,
    [state.credits]
  );

  // Get next optimal action
  const nextOptimalAction = useMemo(
    () => getNextOptimalAction(completedActions),
    [completedActions]
  );

  // Check if recovery is complete
  const recoveryComplete = useMemo(
    () => isRecoveryComplete(completedActions),
    [completedActions]
  );

  // Calculate ending if complete
  const ending = useMemo(() => {
    if (!recoveryComplete) return null;
    const hasCorrectAccusation = state.accusationsMade.some((a) => a.isCorrect);
    return calculateEnding(state.credits, totalPenalties, hasCorrectAccusation, completedActions);
  }, [recoveryComplete, state.credits, totalPenalties, state.accusationsMade, completedActions]);

  const handleSelectAction = useCallback((action: RecoveryAction) => {
    setSelectedAction(action);
    setShowConfirm(true);
  }, []);

  const handleConfirmAction = useCallback(() => {
    if (!selectedAction) return;

    const totalCost = selectedAction.cost;
    const { hasPenalty, penalty } = checkActionPenalty(selectedAction.id, completedActions);
    const penaltyCost = hasPenalty && penalty ? penalty.penaltyCost : 0;
    const finalCost = totalCost + penaltyCost;

    if (!canAfford(finalCost)) return;

    // Deduct credits
    dispatch({ type: 'SPEND_CREDITS', amount: finalCost });

    // Mark action as complete
    dispatch({ type: 'COMPLETE_RECOVERY_ACTION', actionId: selectedAction.id });

    // Track penalty
    if (penaltyCost > 0) {
      setTotalPenalties((prev) => prev + penaltyCost);
    }

    // Create result
    const result: RecoveryResult = {
      actionId: selectedAction.id,
      success: true,
      penaltyApplied: hasPenalty,
      penaltyAmount: penaltyCost,
      penaltyMessage: penalty?.lesson,
      timestamp: Date.now(),
    };

    setLastResult(result);
    setShowConfirm(false);
    setShowResult(true);
  }, [selectedAction, completedActions, canAfford, dispatch]);

  const handleCancelConfirm = useCallback(() => {
    setShowConfirm(false);
    setSelectedAction(null);
  }, []);

  const handleCloseResult = useCallback(() => {
    setShowResult(false);
    setSelectedAction(null);
    setLastResult(null);

    // Check if recovery is now complete
    const nowComplete = isRecoveryComplete([...completedActions, selectedAction?.id || '']);
    if (nowComplete) {
      // Trigger ending
      dispatch({ type: 'SET_PHASE', phase: 'ended' });
    }
  }, [completedActions, selectedAction, dispatch]);

  // If not in recovery phase, show locked message
  if (state.gamePhase !== 'recovery' && state.gamePhase !== 'ended') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Recovery Phase</h2>
          <p className="text-slate-400">
            Secure the compromised account by completing recovery actions.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Phase Locked</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            The Recovery Phase unlocks after you correctly identify the attacker
            OR purchase the Meta/Instagram Support Ticket from External Support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Recovery Phase</h2>
        <p className="text-slate-400">
          Secure Rashid's account by completing recovery actions.{' '}
          <span className="text-amber-400">Order matters!</span> Wrong sequence = penalties.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Recovery Progress</span>
          <span className="text-sm text-white font-medium">
            {completedActions.length}/{recoveryActions.length} actions
          </span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-500"
            style={{ width: `${(completedActions.length / recoveryActions.length) * 100}%` }}
          />
        </div>
        {totalPenalties > 0 && (
          <p className="text-xs text-red-400 mt-2">
            Total penalties: -{totalPenalties} credits
          </p>
        )}
      </div>

      {/* Optimal Order Hint */}
      <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-sm text-cyan-400">
          <strong>💡 Best Practice Order:</strong>{' '}
          {OPTIMAL_ORDER.map((id, index) => {
            const action = getActionById(id);
            const isCompleted = completedActions.includes(id);
            return (
              <span key={id}>
                <span className={isCompleted ? 'text-green-400' : 'text-cyan-300'}>
                  {action?.title.split(' ')[0]}
                </span>
                {index < OPTIMAL_ORDER.length - 1 && ' → '}
              </span>
            );
          })}
        </p>
      </div>

      {/* Recovery Complete */}
      {recoveryComplete && ending && (
        <div className="mb-6 p-6 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              Account Fully Recovered & Secured!
            </h3>
            <p className="text-green-200/70 mb-4">
              All recovery actions completed.
            </p>
            <div className="inline-block px-6 py-3 bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-400">Your Grade:</p>
              <p className="text-3xl font-bold text-white">{ending.title}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions List */}
      <div className="space-y-4">
        {recoveryActions.map((action) => (
          <ActionCard
            key={action.id}
            action={action}
            isCompleted={completedActions.includes(action.id)}
            isNext={nextOptimalAction?.id === action.id}
            canAfford={canAfford(action.cost)}
            onExecute={handleSelectAction}
          />
        ))}
      </div>

      {/* Remaining Cost Info */}
      {!recoveryComplete && (
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <p className="text-sm text-slate-400">
            <strong>Remaining actions cost:</strong>{' '}
            <span className="text-cyan-400 font-mono">
              {getRemainingActionsCost(completedActions)} credits
            </span>
          </p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirm && selectedAction !== null} onClose={handleCancelConfirm}>
        {selectedAction && (
          <ConfirmDialog
            action={selectedAction}
            hasPenalty={checkActionPenalty(selectedAction.id, completedActions).hasPenalty}
            penaltyInfo={checkActionPenalty(selectedAction.id, completedActions).penalty}
            canAfford={canAfford(
              selectedAction.cost +
                (checkActionPenalty(selectedAction.id, completedActions).penalty?.penaltyCost || 0)
            )}
            onConfirm={handleConfirmAction}
            onCancel={handleCancelConfirm}
          />
        )}
      </Modal>

      {/* Result Modal */}
      <Modal isOpen={showResult && selectedAction !== null && lastResult !== null} onClose={handleCloseResult}>
        {selectedAction && lastResult && (
          <ResultModal
            action={selectedAction}
            result={lastResult}
            onClose={handleCloseResult}
          />
        )}
      </Modal>
    </div>
  );
}
