// ============================================
// RECOVERY PHASE TYPES
// ============================================

export interface WrongOrderPenalty {
  requiredBefore: string[];  // Actions that must be done before this one
  message: string;
  penaltyCost: number;
  lesson: string;
}

export interface RecoveryAction {
  id: string;
  order: number;  // Optimal order (1-7)
  title: string;
  description: string;
  cost: number;
  icon: string;
  successMessage: string;
  successDetails: string[];
  resultMessage: string;
  wrongOrderPenalties: WrongOrderPenalty[];
}

export interface RecoveryResult {
  actionId: string;
  success: boolean;
  penaltyApplied: boolean;
  penaltyAmount: number;
  penaltyMessage?: string;
  timestamp: number;
}

export interface RecoveryPhaseState {
  completedActions: string[];
  results: RecoveryResult[];
  totalPenalties: number;
  isComplete: boolean;
}

// Optimal order for recovery actions
export const OPTIMAL_ORDER = [
  'secure_email',
  'reset_password',
  'revoke_sessions',
  'enable_2fa',
  'remove_apps',
  'warn_followers',
  'report_account',
] as const;

// Calculate ending based on performance
export type EndingGrade = 'A' | 'B' | 'C' | 'D';

export interface RecoveryEndingCriteria {
  grade: EndingGrade;
  title: string;
  description: string;
  minCreditsRemaining: number;
  maxPenalties: number;
  requiresCorrectAccusation: boolean;
  requiresAllRecoveryActions: boolean;
}
