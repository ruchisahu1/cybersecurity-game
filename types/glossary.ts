// ============================================
// GLOSSARY TYPES
// ============================================

export type GlossaryCategory = 'critical' | 'helpful' | 'advanced';

export interface GlossaryDefinition {
  whatItIs: string;
  realWorldExample: string;
  inThisGame: string;
  howToSpot: string[];
  proTip: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  icon: string;
  category: GlossaryCategory;
  definition: GlossaryDefinition;
  relatedTerms: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
  wrongExplanation: string;
  rewardCredits: number;
  relatedTerms: string[];
}

// Constants
export const FIRST_LOOKUP_COST = 0;
export const REPEAT_LOOKUP_COST = 1;
export const QUIZ_REWARD = 5;
export const QUIZ_TRIGGER_COUNT = 3;
