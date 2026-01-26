// ============================================
// GAME TYPES
// ============================================

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
  cost: number;
}

export interface Accusation {
  suspectId: string;
  timestamp: number;
  isCorrect: boolean;
}

export type GamePhase = 'investigation' | 'recovery' | 'ended';
export type EndingType = 'A' | 'B' | 'C' | 'D' | null;
export type TabId = 'evidence' | 'chat' | 'timeline' | 'suspects' | 'wiki' | 'support' | 'recovery';

// ============================================
// GAME STATE
// ============================================

export interface GameState {
  credits: number;
  unlockedClues: string[];
  viewedClues: string[];
  chatHistory: ChatMessage[];
  accusationsMade: Accusation[];
  recoveryActions: string[];
  glossaryLookups: string[];
  gamePhase: GamePhase;
  currentTab: TabId;
  endingType: EndingType;
}

// ============================================
// GAME ACTIONS
// ============================================

export type GameAction =
  | { type: 'SPEND_CREDITS'; amount: number }
  | { type: 'UNLOCK_CLUE'; clueId: string; cost: number }
  | { type: 'VIEW_CLUE'; clueId: string }
  | { type: 'ADD_CHAT'; question: string; answer: string; cost: number }
  | { type: 'MAKE_ACCUSATION'; suspectId: string; isCorrect: boolean; cost: number }
  | { type: 'COMPLETE_RECOVERY_ACTION'; actionId: string }
  | { type: 'LOOKUP_GLOSSARY'; termId: string; cost: number }
  | { type: 'CHANGE_TAB'; tab: TabId }
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'SET_ENDING'; ending: EndingType }
  | { type: 'RESET_GAME' };

// ============================================
// INITIAL STATE
// ============================================

export const INITIAL_GAME_STATE: GameState = {
  credits: 100,
  unlockedClues: [],
  viewedClues: [],
  chatHistory: [],
  accusationsMade: [],
  recoveryActions: [],
  glossaryLookups: [],
  gamePhase: 'investigation',
  currentTab: 'evidence',
  endingType: null,
};
