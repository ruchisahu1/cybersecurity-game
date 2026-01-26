// ============================================
// CHAT TYPES
// ============================================

export type QuestionCategory = 'critical' | 'supporting' | 'background';

export interface VictimQuestion {
  id: string;
  question: string;
  shortQuestion: string;  // For button display
  cost: number;
  unlocksClueIds: string[];
  answer: string;
  category: QuestionCategory;
  significance: string;
}

export interface ChatBubble {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: number;
}
