// ============================================
// SUSPECT TYPES
// ============================================

export interface EvidenceRequirement {
  clueId: string;
  strength: 'strong' | 'supporting';
  description: string;
}

export interface Suspect {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  attackMethod: string;
  howItWorks: string[];
  evidenceNeeded: EvidenceRequirement[];
  keywords: string[];
  isCorrect: boolean;
  correctFeedback: string;
  wrongFeedback: string;
}

export interface AccusationResult {
  isCorrect: boolean;
  suspectId: string;
  feedback: string;
  creditsSpent: number;
  penalty: number;
}

// Accusation requirements
export const ACCUSATION_COST = 10;
export const WRONG_ACCUSATION_PENALTY = 15;

// Minimum evidence requirements to make an accusation
export const ACCUSATION_REQUIREMENTS = {
  // Option 1: 2 strong proof clues
  minStrongProofs: 2,
  // Option 2: 1 strong + 2 supporting
  altStrongProofs: 1,
  altSupportingProofs: 2,
} as const;
