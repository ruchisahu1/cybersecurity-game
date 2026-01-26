// ============================================
// CLUE TYPES
// ============================================

export type ClueStrength = 'strong' | 'supporting' | 'inconclusive' | 'misleading';
export type ClueType = 'starter' | 'locked';
export type UnlockMethod = 'investigate' | 'chat' | 'check' | 'auto';

export interface UnlockCondition {
  method: UnlockMethod;
  sourceClueId?: string;        // For 'investigate' method
  chatQuestionId?: string;      // For 'chat' method
  checkType?: string;           // For 'check' method
  autoTrigger?: string;         // For 'auto' method
  cost: number;
}

export interface InvestigationAction {
  id: string;
  label: string;
  cost: number;
  unlocksClueId: string;
}

export interface Clue {
  id: string;
  type: ClueType;
  title: string;
  subtitle?: string;
  content: string;
  contentLocked?: string;       // Preview text shown when locked
  costToView: number;           // 0 for starter clues
  unlockCondition: UnlockCondition | null;
  strength: ClueStrength;
  pointsTo: string[];           // Suspect IDs this clue points to
  rulesOut?: string[];          // Suspect IDs this clue rules out
  keywords: string[];           // Tech Wiki terms to highlight
  investigationActions?: InvestigationAction[];  // Actions available on this clue
  icon?: string;
}
