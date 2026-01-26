export const GAME_CONFIG = {
  initialCredits: 100,
  costs: {
    unlockClue: 5,
    askQuestion: 3,
    glossaryLookup: 1,
    externalSupport: 10,
    accusation: 15,
  },
  confirmThreshold: 10, // Ask confirmation for costs >= this amount
} as const;

export const TABS = [
  { id: 'evidence', label: 'Evidence', icon: '🔍' },
  { id: 'chat', label: 'Victim Chat', icon: '💬' },
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'suspects', label: 'Suspect Board', icon: '🕵️' },
  { id: 'wiki', label: 'Tech Wiki', icon: '📚' },
  { id: 'support', label: 'Support', icon: '🛠️' },
  { id: 'recovery', label: 'Recovery', icon: '🔧', requiresPhase: 'recovery' },
] as const;
