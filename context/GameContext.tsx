'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import {
  GameState,
  GameAction,
  INITIAL_GAME_STATE,
} from '@/types';

// ============================================
// CONTEXT TYPE
// ============================================

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | null>(null);

// ============================================
// STORAGE KEY
// ============================================

const STORAGE_KEY = 'cybersecurity-game-state';

// ============================================
// REDUCER
// ============================================

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    // Credit management
    case 'SPEND_CREDITS':
      return {
        ...state,
        credits: Math.max(0, state.credits - action.amount),
      };

    // Clue management
    case 'UNLOCK_CLUE': {
      if (state.unlockedClues.includes(action.clueId)) return state;
      if (state.credits < action.cost) return state;
      return {
        ...state,
        credits: state.credits - action.cost,
        unlockedClues: [...state.unlockedClues, action.clueId],
      };
    }

    case 'VIEW_CLUE': {
      if (state.viewedClues.includes(action.clueId)) return state;
      return {
        ...state,
        viewedClues: [...state.viewedClues, action.clueId],
      };
    }

    // Chat management
    case 'ADD_CHAT': {
      if (state.credits < action.cost) return state;
      const message = {
        id: `chat-${Date.now()}`,
        question: action.question,
        answer: action.answer,
        timestamp: Date.now(),
        cost: action.cost,
      };
      return {
        ...state,
        credits: state.credits - action.cost,
        chatHistory: [...state.chatHistory, message],
      };
    }

    // Accusation management
    case 'MAKE_ACCUSATION': {
      if (state.credits < action.cost) return state;
      const accusation = {
        suspectId: action.suspectId,
        timestamp: Date.now(),
        isCorrect: action.isCorrect,
      };
      return {
        ...state,
        credits: state.credits - action.cost,
        accusationsMade: [...state.accusationsMade, accusation],
      };
    }

    // Recovery phase management
    case 'COMPLETE_RECOVERY_ACTION': {
      if (state.recoveryActions.includes(action.actionId)) return state;
      return {
        ...state,
        recoveryActions: [...state.recoveryActions, action.actionId],
      };
    }

    // Glossary management
    case 'LOOKUP_GLOSSARY': {
      // First lookup is free for already looked-up terms
      if (state.glossaryLookups.includes(action.termId)) return state;
      if (state.credits < action.cost) return state;
      return {
        ...state,
        credits: state.credits - action.cost,
        glossaryLookups: [...state.glossaryLookups, action.termId],
      };
    }

    // Navigation
    case 'CHANGE_TAB':
      return {
        ...state,
        currentTab: action.tab,
      };

    // Phase management
    case 'SET_PHASE':
      return {
        ...state,
        gamePhase: action.phase,
      };

    // Ending management
    case 'SET_ENDING':
      return {
        ...state,
        endingType: action.ending,
        gamePhase: 'ended',
      };

    // Reset game
    case 'RESET_GAME':
      return { ...INITIAL_GAME_STATE };

    default:
      return state;
  }
}

// ============================================
// LOCAL STORAGE PERSISTENCE
// ============================================

function loadGameState(): GameState {
  if (typeof window === 'undefined') return INITIAL_GAME_STATE;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameState>;
      // Merge with initial state to handle any missing fields from older saves
      return {
        ...INITIAL_GAME_STATE,
        ...parsed,
      };
    }
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
  }
  return INITIAL_GAME_STATE;
}

function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
}

// ============================================
// PROVIDER COMPONENT
// ============================================

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  // Track if we've loaded from localStorage (for hydration)
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize with default state, then hydrate from localStorage
  const [state, dispatch] = useReducer(
    gameReducer,
    INITIAL_GAME_STATE,
    () => {
      // Only load from localStorage on client side
      if (typeof window !== 'undefined') {
        return loadGameState();
      }
      return INITIAL_GAME_STATE;
    }
  );

  // Mark as hydrated after first render
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    if (isHydrated) {
      saveGameState(state);
    }
  }, [state, isHydrated]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// ============================================
// HELPER HOOKS
// ============================================

/**
 * Check if player can afford an action
 */
export function useCanAfford(cost: number): boolean {
  const { state } = useGame();
  return state.credits >= cost;
}

/**
 * Check if a clue has been unlocked
 */
export function useIsClueUnlocked(clueId: string): boolean {
  const { state } = useGame();
  return state.unlockedClues.includes(clueId);
}

/**
 * Check if a glossary term has been looked up
 */
export function useIsTermLookedUp(termId: string): boolean {
  const { state } = useGame();
  return state.glossaryLookups.includes(termId);
}
