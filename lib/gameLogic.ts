import {
  EndingRank,
  GameStats,
  Ending,
  Achievement,
  ENDING_CRITERIA,
} from '@/types/endings';
import { GameState } from '@/types/game';
import { recoveryActions } from '@/data/recoveryActions';
import { externalSupportServices } from '@/data/externalSupport';

// ============================================
// GAME STATS CALCULATION
// ============================================

export function calculateGameStats(state: GameState): GameStats {
  const initialCredits = 100;
  const creditsUsed = initialCredits - state.credits;

  // Check for correct accusation
  const correctAccusation = state.accusationsMade.some((a) => a.isCorrect);
  const wrongAccusations = state.accusationsMade.filter((a) => !a.isCorrect).length;

  // Count recovery actions completed (filter out external support purchases)
  const recoveryActionIds = recoveryActions.map((a) => a.id);
  const completedRecoveryActions = state.recoveryActions.filter((id) =>
    recoveryActionIds.includes(id)
  );

  // Count external services used
  const serviceIds = externalSupportServices.map((s) => s.id);
  const servicesUsed = state.recoveryActions.filter((id) =>
    serviceIds.includes(id)
  ).length;

  // Calculate sequence errors (simplified - based on penalties tracked)
  // In a real implementation, this would be tracked separately
  const sequenceErrors = calculateSequenceErrors(completedRecoveryActions);

  return {
    creditsRemaining: state.credits,
    creditsUsed,
    correctAccusation,
    wrongAccusations,
    recoveryActionsCompleted: completedRecoveryActions.length,
    totalRecoveryActions: recoveryActions.length,
    sequenceErrors,
    cluesUnlocked: state.unlockedClues.length,
    questionsAsked: state.chatHistory.length,
    glossaryTermsLearned: state.glossaryLookups.length,
    externalServicesUsed: servicesUsed,
  };
}

/**
 * Calculate sequence errors based on recovery action order
 */
function calculateSequenceErrors(completedActions: string[]): number {
  const optimalOrder = [
    'secure_email',
    'reset_password',
    'revoke_sessions',
    'enable_2fa',
    'remove_apps',
    'warn_followers',
    'report_account',
  ];

  let errors = 0;

  // Check for known bad sequences
  const emailIndex = completedActions.indexOf('secure_email');
  const passwordIndex = completedActions.indexOf('reset_password');
  const sessionsIndex = completedActions.indexOf('revoke_sessions');
  const tfaIndex = completedActions.indexOf('enable_2fa');
  const warnIndex = completedActions.indexOf('warn_followers');

  // Password before email = major error
  if (passwordIndex !== -1 && emailIndex !== -1 && passwordIndex < emailIndex) {
    errors += 2;
  }

  // Sessions before password = error
  if (sessionsIndex !== -1 && passwordIndex !== -1 && sessionsIndex < passwordIndex) {
    errors += 1;
  }

  // 2FA before sessions = error
  if (tfaIndex !== -1 && sessionsIndex !== -1 && tfaIndex < sessionsIndex) {
    errors += 1;
  }

  // Warning before sessions = minor error
  if (warnIndex !== -1 && sessionsIndex !== -1 && warnIndex < sessionsIndex) {
    errors += 1;
  }

  return errors;
}

// ============================================
// ENDING CALCULATION
// ============================================

export function calculateEndingRank(stats: GameStats): EndingRank {
  // Check criteria in order (A, B, C, D)
  for (const criteria of ENDING_CRITERIA) {
    const meetsCredits =
      stats.creditsRemaining >= criteria.minCredits &&
      (criteria.maxCredits === undefined || stats.creditsRemaining <= criteria.maxCredits);
    const meetsAccusation =
      !criteria.requiresCorrectAccusation || stats.correctAccusation;
    const meetsRecovery =
      stats.recoveryActionsCompleted >= criteria.minRecoveryActions;
    const meetsSequence = stats.sequenceErrors <= criteria.maxSequenceErrors;

    if (meetsCredits && meetsAccusation && meetsRecovery && meetsSequence) {
      return criteria.rank;
    }
  }

  return 'D';
}

export function generateEnding(stats: GameStats): Ending {
  const rank = calculateEndingRank(stats);

  switch (rank) {
    case 'A':
      return generateEndingA(stats);
    case 'B':
      return generateEndingB(stats);
    case 'C':
      return generateEndingC(stats);
    case 'D':
    default:
      return generateEndingD(stats);
  }
}

// ============================================
// ENDING A: ELITE INVESTIGATOR
// ============================================

function generateEndingA(stats: GameStats): Ending {
  return {
    rank: 'A',
    stars: 3,
    title: '🏆 ELITE INVESTIGATOR',
    subtitle: 'PERFECT CASE SOLVE!',
    description:
      'Case solved with minimal resource use and maximum efficiency. You identified the phishing attack, recovered the account, and prevented further spread of the scam.',
    statsBreakdown: [
      {
        label: 'Credits Used',
        value: `${stats.creditsUsed}/100`,
        isGood: true,
      },
      {
        label: 'Investigation Accuracy',
        value: '100%',
        isGood: true,
      },
      {
        label: 'Recovery Time',
        value: 'Optimal',
        isGood: true,
      },
      {
        label: 'Followers Protected',
        value: '8,234',
        isGood: true,
      },
    ],
    whatYouLearned: [
      'Phishing link detection',
      'Domain verification',
      'Timeline analysis',
      'Proper recovery sequence',
      'Session management',
      '2FA implementation',
    ],
    achievements: [
      {
        id: 'master_detective',
        name: 'Master Detective',
        icon: '🕵️',
        description: 'Solved the case with perfect accuracy',
      },
      {
        id: 'efficiency_expert',
        name: 'Efficiency Expert',
        icon: '⚡',
        description: 'Completed with 50+ credits remaining',
      },
      {
        id: 'recovery_pro',
        name: 'Recovery Pro',
        icon: '🔧',
        description: 'Perfect recovery sequence',
      },
    ],
    victimMessage:
      "You're amazing! Not only did you figure out what happened, but you secured my account so well that I feel totally safe now. Thank you! 🙏",
    actions: [
      { id: 'next_case', label: 'Play Next Case', icon: '▶️', primary: true },
      { id: 'share', label: 'Share Score', icon: '📤' },
      { id: 'review', label: 'Review Case', icon: '📋' },
      { id: 'home', label: 'Home', icon: '🚪' },
    ],
  };
}

// ============================================
// ENDING B: GOOD INVESTIGATOR
// ============================================

function generateEndingB(stats: GameStats): Ending {
  return {
    rank: 'B',
    stars: 2,
    title: '🎖️ GOOD INVESTIGATOR',
    subtitle: 'CASE SOLVED!',
    description:
      'You identified the phishing attack and successfully recovered Rashid\'s account. Some resources were wasted during the investigation, but damage was controlled.',
    statsBreakdown: [
      {
        label: 'Credits Used',
        value: `${stats.creditsUsed}/100`,
        isGood: stats.creditsRemaining >= 30,
      },
      {
        label: 'Investigation Accuracy',
        value: stats.wrongAccusations === 0 ? '100%' : '85%',
        isGood: stats.wrongAccusations === 0,
      },
      {
        label: 'Recovery Time',
        value: 'Good',
        isGood: true,
      },
      {
        label: 'Sequence Errors',
        value: `${stats.sequenceErrors} minor issues`,
        isGood: stats.sequenceErrors <= 1,
      },
    ],
    whatYouLearned: [
      'Phishing detection',
      'Evidence gathering',
      'Account recovery basics',
    ],
    improvements: [
      'Secure email BEFORE changing password',
      'Revoke sessions immediately after reset',
      'Use fewer external support services',
    ],
    achievements: [
      {
        id: 'problem_solver',
        name: 'Problem Solver',
        icon: '🧩',
        description: 'Successfully recovered the account',
      },
      {
        id: 'phishing_spotter',
        name: 'Phishing Spotter',
        icon: '🎣',
        description: 'Identified the phishing attack',
      },
    ],
    victimMessage:
      "Thanks for helping me get my account back! It took a bit longer than expected, but we got there. I'll be more careful next time.",
    actions: [
      { id: 'retry', label: 'Try Again', icon: '🔄' },
      { id: 'next_case', label: 'Play Next Case', icon: '▶️', primary: true },
      { id: 'review', label: 'Review Case', icon: '📋' },
      { id: 'home', label: 'Home', icon: '🚪' },
    ],
  };
}

// ============================================
// ENDING C: COSTLY SAVE
// ============================================

function generateEndingC(stats: GameStats): Ending {
  return {
    rank: 'C',
    stars: 1,
    title: '💰 COSTLY SAVE',
    subtitle: 'CASE SOLVED',
    description:
      'You recovered Rashid\'s account, but it took heavy reliance on external support and multiple wrong turns cost valuable credits.',
    statsBreakdown: [
      {
        label: 'Credits Used',
        value: `${stats.creditsUsed}/100`,
        isGood: false,
      },
      {
        label: 'Investigation Accuracy',
        value: stats.wrongAccusations >= 2 ? '50%' : '60%',
        isGood: false,
      },
      {
        label: 'Recovery Time',
        value: 'Slow',
        isGood: false,
      },
      {
        label: 'Wrong Accusations',
        value: `${stats.wrongAccusations}`,
        isGood: stats.wrongAccusations === 0,
      },
      {
        label: 'External Services',
        value: `${stats.externalServicesUsed} used`,
        isGood: stats.externalServicesUsed <= 1,
      },
    ],
    whatYouLearned: [
      'Eventually identified phishing attack',
    ],
    improvements: [
      'Read starter clues more carefully',
      'Focus on evidence before guessing',
      'Learn recovery sequence (email → password → sessions → 2FA)',
      'Use glossary to understand terms',
    ],
    achievements: [
      {
        id: 'persistent',
        name: 'Persistent',
        icon: '💪',
        description: 'Never gave up on the case',
      },
    ],
    victimMessage:
      "I got my account back, which is great! But it was stressful waiting while you figured things out. Maybe next time it'll be faster?",
    actions: [
      { id: 'retry', label: 'Retry Case', icon: '🔄', primary: true },
      { id: 'solution', label: 'View Solution', icon: '💡' },
      { id: 'next_case', label: 'Next Case', icon: '▶️' },
      { id: 'home', label: 'Home', icon: '🚪' },
    ],
  };
}

// ============================================
// ENDING D: CASE FAILED
// ============================================

function generateEndingD(stats: GameStats): Ending {
  // Determine failure reason
  let failureReason = 'Investigation Incomplete';
  let failureDetails: string[] = [];

  if (stats.creditsRemaining < 0) {
    failureDetails = [
      `Credits remaining: ${stats.creditsRemaining}`,
      'Too many wrong guesses drained budget',
      'Investigation abandoned',
    ];
  } else if (!stats.correctAccusation) {
    failureDetails = [
      `Wrong accusations made: ${stats.wrongAccusations}`,
      'Real attacker (Suspect A) not identified',
      "Rashid's account remains compromised",
    ];
  } else if (stats.recoveryActionsCompleted < 3) {
    failureDetails = [
      "Attacker's session still active",
      'They regained control after 2 hours',
      'Posted more scam content',
    ];
  }

  return {
    rank: 'D',
    stars: 0,
    title: '❌ CASE FAILED',
    subtitle: failureReason,
    description:
      'The account was not fully secured. Either you ran out of investigation credits, made too many wrong accusations, or failed to properly revoke the attacker\'s access.',
    statsBreakdown: [
      {
        label: 'Credits Remaining',
        value: `${stats.creditsRemaining}`,
        isGood: stats.creditsRemaining > 0,
      },
      {
        label: 'Correct Accusation',
        value: stats.correctAccusation ? 'Yes' : 'No',
        isGood: stats.correctAccusation,
      },
      {
        label: 'Recovery Actions',
        value: `${stats.recoveryActionsCompleted}/${stats.totalRecoveryActions}`,
        isGood: stats.recoveryActionsCompleted >= 5,
      },
      {
        label: 'Wrong Accusations',
        value: `${stats.wrongAccusations}`,
        isGood: stats.wrongAccusations === 0,
      },
    ],
    whatYouLearned: [
      'The correct suspect was: Suspect A (Fake Meta Support)',
    ],
    improvements: [
      'Key evidence: Phishing link domain (LC2)',
      'Victim clicked and entered password (LC3)',
      'Fake Meta support profile (LC1)',
      '',
      'Tips for next time:',
      '• Start with FREE starter clues',
      '• Use glossary to understand terms',
      '• Ask victim strategic questions early',
      "• Don't guess suspects without evidence",
      '• Always check the domain of links!',
    ],
    achievements: [],
    victimMessage:
      "I'm still locked out of my account, and my followers are still getting scam messages. This is really bad... 😔",
    actions: [
      { id: 'solution', label: 'View Full Solution', icon: '💡' },
      { id: 'retry', label: 'Retry Case', icon: '🔄', primary: true },
      { id: 'tutorial', label: 'Tutorial', icon: '📚' },
    ],
  };
}

// ============================================
// SHARE SCORE
// ============================================

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export function generateShareData(ending: Ending, stats: GameStats): ShareData {
  const stars = '⭐'.repeat(ending.stars) || '❌';
  const text = `I completed CyberSleuth Case #1 with ${stars}!
  
🏆 Rank: ${ending.title}
💰 Credits: ${stats.creditsRemaining}/100 remaining
🔍 Clues: ${stats.cluesUnlocked} unlocked
🛡️ Recovery: ${stats.recoveryActionsCompleted}/${stats.totalRecoveryActions} actions

Can you do better? Play now:`;

  return {
    title: 'CyberSleuth - My Score',
    text,
    url: typeof window !== 'undefined' ? window.location.origin : '',
  };
}

export async function shareScore(shareData: ShareData): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled or share failed
      return false;
    }
  }

  // Fallback: copy to clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      const fullText = `${shareData.text}\n${shareData.url || ''}`;
      await navigator.clipboard.writeText(fullText);
      return true;
    } catch (error) {
      return false;
    }
  }

  return false;
}
