import { Suspect } from '@/types/suspect';

// ============================================
// SUSPECT PROFILES
// ============================================

export const suspects: Suspect[] = [
  {
    id: 'suspect_a',
    name: 'Fake Meta Support',
    icon: '🎭',
    tagline: 'Phishing Attack',
    description:
      'Creates fake Instagram support accounts that impersonate official Meta security team. Sends urgent "violation" warnings with phishing links.',
    attackMethod: 'Phishing via fake support DM',
    howItWorks: [
      'Victim receives scary DM about account violation',
      'Phishing link leads to fake Instagram login page',
      'Victim enters username + password',
      'Attacker logs in immediately and changes password',
      'Uses compromised account to spread scams',
    ],
    evidenceNeeded: [
      {
        clueId: 'locked_1',
        strength: 'strong',
        description: 'Fake support account profile (LC1)',
      },
      {
        clueId: 'locked_2',
        strength: 'strong',
        description: 'Phishing domain link (LC2)',
      },
      {
        clueId: 'locked_3',
        strength: 'strong',
        description: 'Victim entered credentials on fake page (LC3)',
      },
      {
        clueId: 'locked_5',
        strength: 'supporting',
        description: 'Login timing matches DM timeline (LC5)',
      },
    ],
    keywords: ['Phishing', 'Fake domain', 'Meta support', 'Urgent warning'],
    isCorrect: true,
    correctFeedback: `🎉 CORRECT! You've identified the attacker!

The fake Meta Support account (@meta_support.verify_center) sent Rashid a phishing DM with a fake login page. When Rashid entered his credentials, the attacker immediately logged in and took over the account.

Key evidence that proved this:
• The sender was a brand new account with 0 posts
• The link used a fake domain (instagram-appeal-center.com)
• Rashid confirmed he entered his password on the fake page
• The suspicious login happened immediately after clicking the link

Great detective work! 🕵️`,
    wrongFeedback: `This isn't the right suspect. Look more carefully at the evidence:

• Did Rashid receive a fake support message? ✅ Yes
• Did he click a phishing link? Check LC2
• Did he enter his credentials? Check LC3

The timeline clearly shows this attack method was used.`,
  },
  {
    id: 'suspect_b',
    name: 'Friend Impersonator',
    icon: '👥',
    tagline: 'OTP Scam',
    description:
      "Hacker compromises a friend's account, then messages the victim pretending to be in trouble. Tricks victim into sharing OTP/verification codes.",
    attackMethod: 'OTP theft via friend impersonation',
    howItWorks: [
      "Attacker controls friend's account",
      'Messages victim: "Hey! Can you help? Send me the code Instagram just sent you"',
      'Victim receives real Instagram 2FA code',
      "Victim shares code thinking they're helping friend",
      'Attacker uses code to bypass 2FA and login',
    ],
    evidenceNeeded: [
      {
        clueId: 'locked_10',
        strength: 'strong',
        description: 'Friend messaged asking for code (LC10)',
      },
      {
        clueId: 'locked_4',
        strength: 'strong',
        description: 'Victim shared OTP via chat (LC4)',
      },
    ],
    keywords: ['OTP', 'Friend', 'Verification code', 'Help me'],
    isCorrect: false,
    correctFeedback: '',
    wrongFeedback: `❌ Wrong accusation! This wasn't a friend impersonation attack.

The evidence shows:
• Rashid said NO friend asked him for codes (LC10)
• He received an OTP but DIDN'T share it with anyone (LC4)
• The attack came from a fake Meta Support account, not a friend

Look at who actually messaged Rashid and what he did with that message.`,
  },
  {
    id: 'suspect_c',
    name: 'Brand Collaboration Scam',
    icon: '🏷️',
    tagline: 'Malicious Contract',
    description:
      'Fake brand account offers paid collaboration. Sends "contract" file or link that contains malware or leads to credential theft.',
    attackMethod: 'Credential theft via fake brand deal',
    howItWorks: [
      'Victim receives collaboration offer from "brand"',
      'Asked to "sign contract" via link or download',
      'Link leads to phishing page OR file contains malware',
      'Credentials stolen or device compromised',
      'Attacker gains account access',
    ],
    evidenceNeeded: [
      {
        clueId: 'locked_11',
        strength: 'strong',
        description: 'Brand collaboration email/DM (LC11)',
      },
      {
        clueId: 'locked_8',
        strength: 'supporting',
        description: 'Malicious third-party app connected (LC8)',
      },
    ],
    keywords: ['Collaboration', 'Contract', 'Brand partnership', 'Sponsorship'],
    isCorrect: false,
    correctFeedback: '',
    wrongFeedback: `❌ Wrong accusation! This wasn't a brand collaboration scam.

The evidence shows:
• Rashid's recent brand offers were from legitimate companies (LC11)
• He didn't click any collaboration links or download contracts
• No suspicious third-party apps were connected (LC8)

The attack vector was different - check what DM Rashid actually clicked on.`,
  },
  {
    id: 'suspect_d',
    name: 'Password Leak Attack',
    icon: '🔑',
    tagline: 'Credential Stuffing',
    description:
      'Victim uses same password on Instagram and other sites. When another site gets hacked, attackers try those leaked passwords on popular platforms.',
    attackMethod: 'Silent login via leaked credentials',
    howItWorks: [
      'Gaming site / forum gets hacked in 2023',
      'Leaked database contains emails + passwords',
      'Hacker tries those passwords on Instagram',
      'If victim reused password, attacker logs in',
      'No phishing needed - direct login',
    ],
    evidenceNeeded: [
      {
        clueId: 'locked_12',
        strength: 'strong',
        description: 'Victim admits password reuse (LC12)',
      },
      {
        clueId: 'locked_2',
        strength: 'supporting',
        description: 'No phishing link clicked (absence of LC2/LC3)',
      },
    ],
    keywords: ['Password reuse', 'Data breach', 'Same password', 'Multiple sites'],
    isCorrect: false,
    correctFeedback: '',
    wrongFeedback: `❌ Wrong accusation! While password reuse IS a risk, it's not what happened here.

The evidence shows:
• Yes, Rashid reuses passwords (LC12) - but that's not how he got hacked THIS time
• The timing proves it: Rashid clicked a phishing link JUST BEFORE the takeover
• The login happened immediately after he entered credentials on a fake page

The password reuse is a red herring. Focus on what Rashid did right before losing access.`,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSuspectById(id: string): Suspect | undefined {
  return suspects.find((s) => s.id === id);
}

export function getCorrectSuspect(): Suspect {
  const correct = suspects.find((s) => s.isCorrect);
  if (!correct) throw new Error('No correct suspect defined');
  return correct;
}

/**
 * Calculate confidence level for a suspect based on collected evidence
 */
export function calculateConfidence(
  suspect: Suspect,
  unlockedClues: string[]
): {
  percentage: number;
  strongCount: number;
  supportingCount: number;
  totalNeeded: number;
  canAccuse: boolean;
} {
  let strongCount = 0;
  let supportingCount = 0;

  for (const evidence of suspect.evidenceNeeded) {
    if (unlockedClues.includes(evidence.clueId)) {
      if (evidence.strength === 'strong') {
        strongCount++;
      } else {
        supportingCount++;
      }
    }
  }

  const totalNeeded = suspect.evidenceNeeded.length;
  const found = strongCount + supportingCount;
  const percentage = totalNeeded > 0 ? Math.round((found / totalNeeded) * 100) : 0;

  // Can accuse if: 2 strong proofs OR 1 strong + 2 supporting
  const canAccuse = strongCount >= 2 || (strongCount >= 1 && supportingCount >= 2);

  return {
    percentage,
    strongCount,
    supportingCount,
    totalNeeded,
    canAccuse,
  };
}

/**
 * Count total strong and supporting evidence collected across all clues
 * This is used to determine if accusations should be unlocked globally
 */
export function getTotalEvidenceCount(unlockedClues: string[]): {
  totalStrong: number;
  totalSupporting: number;
  canAccuseAnyone: boolean;
} {
  let totalStrong = 0;
  let totalSupporting = 0;

  // Count unique strong/supporting evidence across all suspects
  const countedClues = new Set<string>();

  for (const suspect of suspects) {
    for (const evidence of suspect.evidenceNeeded) {
      if (unlockedClues.includes(evidence.clueId) && !countedClues.has(evidence.clueId)) {
        countedClues.add(evidence.clueId);
        if (evidence.strength === 'strong') {
          totalStrong++;
        } else if (evidence.strength === 'supporting') {
          totalSupporting++;
        }
      }
    }
  }

  // Can accuse anyone if: 2 strong clues OR 1 strong + 2 supporting
  const canAccuseAnyone = totalStrong >= 2 || (totalStrong >= 1 && totalSupporting >= 2);

  return {
    totalStrong,
    totalSupporting,
    canAccuseAnyone,
  };
}

/**
 * Check if player has enough evidence to make ANY accusation
 */
export function hasEnoughEvidenceToAccuse(unlockedClues: string[]): boolean {
  return getTotalEvidenceCount(unlockedClues).canAccuseAnyone;
}
