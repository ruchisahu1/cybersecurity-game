import { ExternalSupportService } from '@/types/support';

// ============================================
// EXTERNAL SUPPORT SERVICES
// ============================================

export const externalSupportServices: ExternalSupportService[] = [
  {
    id: 'meta_support',
    name: 'Meta/Instagram Support Ticket',
    provider: 'Instagram Official Support',
    icon: '🎫',
    cost: 20,
    description: 'Official Instagram recovery guidance and recommended steps',
    whatYouGet: [
      'Recovery roadmap (doesn\'t reveal suspect)',
      'Unlocks Recovery Phase actions',
      'Professional guidance',
    ],
    whatYouDontGet: [
      'Identity of attacker',
      'Specific evidence',
    ],
    response: `🎫 Instagram Official Support Response

Thank you for reporting this issue. Based on your description, your account was compromised through credential theft (phishing).

RECOMMENDED RECOVERY STEPS:
──────────────────────────────────────
1. Secure your email account FIRST
2. Reset your Instagram password
3. Enable Two-Factor Authentication (2FA)
4. Revoke all unknown sessions
5. Review and remove suspicious connected apps
6. Post a warning to your followers

⚠️ IMPORTANT: Follow steps in ORDER!

Need help? Visit: help.instagram.com/hacked
──────────────────────────────────────

This guidance will help you recover your account even if you haven't identified the attacker yet. The Recovery Phase has been unlocked.`,
    unlocks: ['recovery_menu'],
    unlocksRecoveryPhase: true,
    clueStrength: 'none',
  },
  {
    id: 'cyber_cell',
    name: 'Cyber Cell Quick Report',
    provider: 'Kerala Cyber Crime Cell',
    icon: '🚨',
    cost: 25,
    description: 'Domain analysis, attack classification, and pattern matching',
    whatYouGet: [
      'Domain verification (strong evidence)',
      'Attack type confirmation',
      'Pattern matching with known campaigns',
    ],
    response: `🚨 Cyber Crime Cell - Quick Analysis Report

CASE #: CC-2026-001847
DATE: January 20, 2026, 8:00 PM

FINDINGS:
──────────────────────────────────────
Domain Analysis:
Domain: instagram-appeal-center.com
Status: 🚩 FLAGGED in scam database

Registration:
Created: December 28, 2025 (24 days ago)
Registrar: NameCheap (Privacy Protected)
Server Location: Netherlands

Attack Classification:
Type: Credential Phishing (Social Engineering)
Method: Fake Instagram support impersonation
Target Profile: Young users, content creators

Known Pattern:
Part of "Meta Verify" phishing campaign
Active since December 2025
50+ reported cases in India

RECOMMENDED ACTION:
✅ Revoke all active sessions immediately
✅ Change password + enable 2FA
✅ Warn followers about fake giveaway posts
──────────────────────────────────────

Officer: Inspector Meera Desai, Kerala Cyber Cell
Contact: cybercell.kerala@gov.in`,
    unlocks: ['cyber_cell_report'],
    unlocksRecoveryPhase: false,
    clueStrength: 'strong',
    pointsTo: 'suspect_a',
  },
  {
    id: 'cid_check',
    name: 'CID Identity Check',
    provider: 'Crime Investigation Department',
    icon: '🔍',
    cost: 30,
    description: 'Deep profile investigation and network analysis',
    whatYouGet: [
      'Definitive proof account is fake',
      'Network connections to other scam accounts',
      'Professional scam operation details',
    ],
    response: `🔍 CID (Crime Investigation Dept) - Profile Investigation

SUBJECT: @meta_support.verify_center

DEEP PROFILE ANALYSIS:
──────────────────────────────────────
Account Creation Timeline:
Created: January 6, 2026
Original Username: @insta_help_2026
Changed to: @meta_help_verify (Jan 8)
Changed to: @meta_support.verify_center (Jan 10)

Profile Picture History:
• Generic Meta logo (downloaded from Google Images)
• Image matches 6 other known scam accounts
• No original content

Activity Pattern:
• Sends ~200 DMs per day
• Messages contain identical phishing links
• Targets accounts with 5K-15K followers
• 87% of targeted accounts are students/young creators

Geographic Trace:
• Messages sent via VPN (hides real location)
• IP addresses rotate (India, Bangladesh, Nigeria)
• Uses multiple devices to avoid detection

Connected Accounts:
Part of network of 12 similar fake support accounts:
• @instagram_verify_help
• @meta_security_team
• @insta_official_verify
• ... and 9 more

CONCLUSION:
Professional scam operation using fake Meta support accounts to phish credentials.
──────────────────────────────────────

Lead Investigator: DCP Rajesh Kumar
Contact: cid.cybercrime@police.kerala.gov.in`,
    unlocks: ['cid_report'],
    unlocksRecoveryPhase: false,
    clueStrength: 'strong',
    pointsTo: 'suspect_a',
  },
  {
    id: 'interpol_osint',
    name: 'Interpol OSINT Snapshot',
    provider: 'Interpol Cybercrime Directorate',
    icon: '🌍',
    cost: 40,
    description: 'Global threat intelligence and international scam network analysis',
    whatYouGet: [
      'Global context and patterns',
      'Network scale understanding',
      'Professional threat intelligence',
      'Educational value (real-world connection)',
    ],
    response: `🌍 INTERPOL - Open Source Intelligence Report

OPERATION: "GiftTrap India"
REPORT ID: INTERPOL-APAC-2026-0423

GLOBAL THREAT ANALYSIS:
──────────────────────────────────────
Threat Classification:
Campaign Name: "Instagram Appeal Center" Scam
Threat Level: MEDIUM (financially motivated)
Active Regions: India, Southeast Asia, East Africa

Scam Network Structure:
├─ Tier 1: Phishing page developers (2-3 operators)
├─ Tier 2: Fake account creators (10-15 operators)
├─ Tier 3: Money mules (50+ individuals)
└─ Victims: 800+ confirmed, 3,000+ suspected

Attack Methodology:
1. Create fake Meta support accounts
2. Send urgent "violation" messages
3. Direct victims to phishing pages
4. Steal credentials within minutes
5. Use compromised accounts to spread scam
6. Monetize through fake giveaways/crypto scams

Financial Impact:
Estimated losses: ₹45 lakhs (INR)
Average per victim: ₹5,000-15,000
Recovery rate: 12% (very low)

Behavioral Profile:
Targets: Students, small business owners, micro-influencers
Urgency tactics: "30-minute deadline" warnings
Social proof: Fake verification badges
Success rate: 35% of targeted users click links

PREVENTION RECOMMENDATIONS:
──────────────────────────────────────
🛡️ Enable 2FA on all social media accounts
🛡️ Verify sender authenticity before clicking links
🛡️ Real Meta NEVER contacts users via DM
🛡️ Check URLs carefully (look for HTTPS + exact domain)
🛡️ Report suspicious accounts immediately

Compiled by: Interpol Cybercrime Directorate
Contact: cybercrime@interpol.int
──────────────────────────────────────

This report demonstrates that cybercrime operates on an international scale. The same techniques used against Rashid have affected thousands of victims worldwide.`,
    unlocks: ['interpol_report'],
    unlocksRecoveryPhase: false,
    clueStrength: 'ultimate',
    pointsTo: 'suspect_a',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getServiceById(id: string): ExternalSupportService | undefined {
  return externalSupportServices.find((s) => s.id === id);
}

export function getServiceCost(id: string): number {
  const service = getServiceById(id);
  return service?.cost ?? 0;
}

export function getStrengthColor(strength: ExternalSupportService['clueStrength']): string {
  switch (strength) {
    case 'ultimate':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    case 'strong':
      return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'supporting':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'none':
    default:
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  }
}

export function getStrengthLabel(strength: ExternalSupportService['clueStrength']): string {
  switch (strength) {
    case 'ultimate':
      return '🟣 Ultimate Proof';
    case 'strong':
      return '🔴 Strong Proof';
    case 'supporting':
      return '🟡 Supporting';
    case 'none':
    default:
      return '⚪ No Evidence';
  }
}
