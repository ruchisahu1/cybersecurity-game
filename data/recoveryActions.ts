import { RecoveryAction, RecoveryEndingCriteria, EndingGrade, OPTIMAL_ORDER } from '@/types/recovery';

// ============================================
// RECOVERY ACTIONS
// ============================================

export const recoveryActions: RecoveryAction[] = [
  {
    id: 'secure_email',
    order: 1,
    title: 'Secure Email Account',
    description: 'Change email password and enable 2FA on Gmail',
    cost: 8,
    icon: '📧',
    successMessage: 'Email Account Secured!',
    successDetails: [
      'Changed email password',
      'Enabled 2FA on Gmail',
      'Reviewed recent email activity',
      "Removed attacker's recovery email",
    ],
    resultMessage: "Attacker can no longer intercept password reset emails or change account settings!",
    wrongOrderPenalties: [], // First action - no penalties
  },
  {
    id: 'reset_password',
    order: 2,
    title: 'Reset Instagram Password',
    description: 'Create a new strong, unique password',
    cost: 8,
    icon: '🔑',
    successMessage: 'Password Reset Successful!',
    successDetails: [
      'Used "Forgot Password" via secured email',
      'Created strong password: R@sh1d#Secure2026!',
      'Password follows best practices:',
      '✓ 16+ characters',
      '✓ Mix of letters, numbers, symbols',
      '✓ Not reused from other sites',
    ],
    resultMessage: "Attacker's access method (old password) is now invalid!",
    wrongOrderPenalties: [
      {
        requiredBefore: ['secure_email'],
        message: `You reset the Instagram password, but the attacker still had access to Rashid's email!

What happened:
• You requested password reset
• Email sent to: rashid.student@gmail.com
• Attacker (who controls email) saw the reset link
• Attacker clicked "This wasn't me" and blocked reset
• Attacker changed password again using email access!`,
        penaltyCost: 10,
        lesson: 'Always secure EMAIL before resetting passwords. Email is the master key!',
      },
    ],
  },
  {
    id: 'revoke_sessions',
    order: 3,
    title: 'Revoke Unknown Sessions',
    description: 'Log out all suspicious devices immediately',
    cost: 8,
    icon: '🚫',
    successMessage: 'Suspicious Sessions Removed!',
    successDetails: [
      'Sessions revoked:',
      '❌ Chrome on Windows (Indore) - LOGGED OUT',
      '❌ iPhone (Mumbai) - LOGGED OUT',
      'Active sessions remaining:',
      "✅ Android (Rashid's phone) - ACTIVE",
    ],
    resultMessage: "Attacker is kicked out completely! Even if they had the old password, they're logged out now.",
    wrongOrderPenalties: [
      {
        requiredBefore: ['reset_password'],
        message: `You revoked sessions but the password is still compromised!

The attacker can simply log back in with the stolen password.`,
        penaltyCost: 5,
        lesson: 'Reset password BEFORE revoking sessions so attacker cannot log back in.',
      },
    ],
  },
  {
    id: 'enable_2fa',
    order: 4,
    title: 'Enable 2FA (Authenticator)',
    description: 'Add second factor authentication for future protection',
    cost: 8,
    icon: '🔐',
    successMessage: 'Two-Factor Authentication Enabled!',
    successDetails: [
      'Setup completed:',
      '• Authenticator app: Google Authenticator',
      '• Backup codes saved securely (printed)',
      '• SMS backup: +91-XXXX-XX1234',
      '',
      'How it works now:',
      '1. Enter password (something you know)',
      '2. Enter 6-digit code from app (something you have)',
    ],
    resultMessage: "Even if password is stolen again, attacker can't login without Rashid's phone!",
    wrongOrderPenalties: [
      {
        requiredBefore: ['revoke_sessions'],
        message: `You enabled 2FA, which is great! However, the attacker's sessions were still active.

Impact:
• Attacker stayed logged in (sessions remain valid)
• They could still post/DM for 10 more minutes
• 2FA only affects NEW logins, not existing sessions

Result: Minor damage - attacker sent 5 more scam DMs before automatic timeout`,
        penaltyCost: 5,
        lesson: 'Revoke sessions BEFORE enabling 2FA for immediate protection',
      },
    ],
  },
  {
    id: 'remove_apps',
    order: 5,
    title: 'Remove Suspicious Connected Apps',
    description: 'Review and remove any unauthorized third-party apps',
    cost: 8,
    icon: '🔌',
    successMessage: 'Connected Apps Reviewed!',
    successDetails: [
      'Apps checked:',
      '✅ Canva - SAFE (kept connected)',
      '✅ Later - SAFE (kept connected)',
      '❌ No suspicious apps found',
    ],
    resultMessage: 'No malicious third-party apps had access to the account.',
    wrongOrderPenalties: [], // Order doesn't matter much for this
  },
  {
    id: 'warn_followers',
    order: 6,
    title: 'Post Warning Story',
    description: 'Alert followers about the hack and scam links',
    cost: 5,
    icon: '📢',
    successMessage: 'Warning Story Posted!',
    successDetails: [
      'Story content posted:',
      '┌───────────────────────────┐',
      '│ ⚠️ ACCOUNT WAS HACKED    │',
      '│                          │',
      '│ If you got a DM or saw   │',
      '│ a giveaway post from me, │',
      '│ DO NOT CLICK ANY LINKS!  │',
      '│                          │',
      '│ It was a scam. I\'ve      │',
      '│ secured my account now.  │',
      '└───────────────────────────┘',
    ],
    resultMessage: 'Followers are warned! Prevents them from falling for the scam.',
    wrongOrderPenalties: [
      {
        requiredBefore: ['revoke_sessions'],
        message: `You posted a warning, but the attacker still has access!

They can delete your warning story and continue the scam.`,
        penaltyCost: 3,
        lesson: 'Secure account BEFORE posting warnings so attacker cannot undo your work.',
      },
    ],
  },
  {
    id: 'report_account',
    order: 7,
    title: 'Report Fake Meta Support Account',
    description: 'Report the phishing account to Instagram',
    cost: 5,
    icon: '🚩',
    successMessage: 'Fake Account Reported!',
    successDetails: [
      'Report submitted:',
      '• Account: @meta_support.verify_center',
      '• Reason: Impersonation + Phishing',
      '• Evidence: Screenshots of fake DM + phishing link',
      '',
      'Instagram response:',
      '"Thank you for reporting. We\'ve reviewed the',
      'account and removed it for violating our',
      'Community Guidelines on impersonation."',
    ],
    resultMessage: 'Fake account is BANNED! Protects other potential victims.',
    wrongOrderPenalties: [], // Can be done anytime
  },
];

// ============================================
// ENDING CRITERIA
// ============================================

export const endingCriteria: RecoveryEndingCriteria[] = [
  {
    grade: 'A',
    title: '🏆 Perfect Investigation',
    description: 'Outstanding work! You solved the case efficiently, recovered the account in the correct order, and helped protect others.',
    minCreditsRemaining: 30,
    maxPenalties: 0,
    requiresCorrectAccusation: true,
    requiresAllRecoveryActions: true,
  },
  {
    grade: 'B',
    title: '🥈 Great Detective Work',
    description: 'Well done! You identified the attacker and recovered the account, though there were some minor missteps.',
    minCreditsRemaining: 15,
    maxPenalties: 15,
    requiresCorrectAccusation: true,
    requiresAllRecoveryActions: true,
  },
  {
    grade: 'C',
    title: '🥉 Case Closed',
    description: 'You managed to solve the case and recover the account, but spent too many resources along the way.',
    minCreditsRemaining: 0,
    maxPenalties: 30,
    requiresCorrectAccusation: true,
    requiresAllRecoveryActions: false,
  },
  {
    grade: 'D',
    title: '📋 Investigation Incomplete',
    description: 'The case remains partially unsolved. Review the evidence and try again!',
    minCreditsRemaining: 0,
    maxPenalties: 999,
    requiresCorrectAccusation: false,
    requiresAllRecoveryActions: false,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getActionById(id: string): RecoveryAction | undefined {
  return recoveryActions.find((a) => a.id === id);
}

export function getActionByOrder(order: number): RecoveryAction | undefined {
  return recoveryActions.find((a) => a.order === order);
}

/**
 * Check if performing an action would trigger a penalty
 */
export function checkActionPenalty(
  actionId: string,
  completedActions: string[]
): { hasPenalty: boolean; penalty: RecoveryAction['wrongOrderPenalties'][0] | null } {
  const action = getActionById(actionId);
  if (!action) return { hasPenalty: false, penalty: null };

  for (const penalty of action.wrongOrderPenalties) {
    // Check if all required actions have been completed
    const missingRequired = penalty.requiredBefore.filter(
      (reqId) => !completedActions.includes(reqId)
    );

    if (missingRequired.length > 0) {
      return { hasPenalty: true, penalty };
    }
  }

  return { hasPenalty: false, penalty: null };
}

/**
 * Get the next optimal action to perform
 */
export function getNextOptimalAction(completedActions: string[]): RecoveryAction | null {
  for (const actionId of OPTIMAL_ORDER) {
    if (!completedActions.includes(actionId)) {
      return getActionById(actionId) || null;
    }
  }
  return null;
}

/**
 * Check if all recovery actions are complete
 */
export function isRecoveryComplete(completedActions: string[]): boolean {
  return recoveryActions.every((action) => completedActions.includes(action.id));
}

/**
 * Calculate the ending grade based on game state
 */
export function calculateEnding(
  creditsRemaining: number,
  totalPenalties: number,
  hasCorrectAccusation: boolean,
  completedRecoveryActions: string[]
): RecoveryEndingCriteria {
  const allActionsComplete = isRecoveryComplete(completedRecoveryActions);

  // Check each ending criteria in order (A, B, C, D)
  for (const criteria of endingCriteria) {
    const meetsCredits = creditsRemaining >= criteria.minCreditsRemaining;
    const meetsPenalties = totalPenalties <= criteria.maxPenalties;
    const meetsAccusation = !criteria.requiresCorrectAccusation || hasCorrectAccusation;
    const meetsRecovery = !criteria.requiresAllRecoveryActions || allActionsComplete;

    if (meetsCredits && meetsPenalties && meetsAccusation && meetsRecovery) {
      return criteria;
    }
  }

  // Default to D if nothing else matches
  return endingCriteria[endingCriteria.length - 1];
}

/**
 * Get total cost of remaining actions
 */
export function getRemainingActionsCost(completedActions: string[]): number {
  return recoveryActions
    .filter((action) => !completedActions.includes(action.id))
    .reduce((sum, action) => sum + action.cost, 0);
}
