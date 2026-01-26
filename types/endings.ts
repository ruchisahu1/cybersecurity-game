// ============================================
// ENDING TYPES
// ============================================

export type EndingRank = 'A' | 'B' | 'C' | 'D';

export interface EndingCriteria {
  rank: EndingRank;
  minCredits: number;
  maxCredits?: number;
  requiresCorrectAccusation: boolean;
  minRecoveryActions: number;
  maxSequenceErrors: number;
}

export interface GameStats {
  creditsRemaining: number;
  creditsUsed: number;
  correctAccusation: boolean;
  wrongAccusations: number;
  recoveryActionsCompleted: number;
  totalRecoveryActions: number;
  sequenceErrors: number;
  cluesUnlocked: number;
  questionsAsked: number;
  glossaryTermsLearned: number;
  externalServicesUsed: number;
}

export interface Ending {
  rank: EndingRank;
  stars: number;
  title: string;
  subtitle: string;
  description: string;
  statsBreakdown: {
    label: string;
    value: string;
    isGood: boolean;
  }[];
  whatYouLearned: string[];
  improvements?: string[];
  achievements: Achievement[];
  victimMessage: string;
  actions: EndingAction[];
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface EndingAction {
  id: string;
  label: string;
  icon: string;
  primary?: boolean;
}

// ============================================
// CONSTANTS
// ============================================

export const ENDING_CRITERIA: EndingCriteria[] = [
  {
    rank: 'A',
    minCredits: 50,
    requiresCorrectAccusation: true,
    minRecoveryActions: 7,
    maxSequenceErrors: 0,
  },
  {
    rank: 'B',
    minCredits: 20,
    maxCredits: 49,
    requiresCorrectAccusation: true,
    minRecoveryActions: 7,
    maxSequenceErrors: 2,
  },
  {
    rank: 'C',
    minCredits: 0,
    maxCredits: 19,
    requiresCorrectAccusation: true,
    minRecoveryActions: 5,
    maxSequenceErrors: 5,
  },
  {
    rank: 'D',
    minCredits: -999,
    requiresCorrectAccusation: false,
    minRecoveryActions: 0,
    maxSequenceErrors: 999,
  },
];
