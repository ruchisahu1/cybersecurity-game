import { Clue } from '@/types/clue';

// ============================================
// STARTER CLUES (Free to View)
// ============================================

const starterClues: Clue[] = [
  {
    id: 'starter_1',
    type: 'starter',
    title: 'Victim Summary',
    subtitle: 'Background Information',
    icon: '👤',
    content: `👤 Victim Profile
Name: Rashid (Student Entrepreneur)
Account: @rashid.snaps
Followers: 8,234
Account Type: Creator (fashion/lifestyle)

Problem Report:
"I got logged out suddenly. Now when I try to log in, it says my password is wrong. My followers are saying my account is sending them weird links!"

Reported: 7:30 PM, January 20, 2026`,
    costToView: 0,
    unlockCondition: null,
    strength: 'supporting',
    pointsTo: [],
    keywords: [],
  },
  {
    id: 'starter_2',
    type: 'starter',
    title: 'Last 30 Minutes Timeline',
    subtitle: 'Partial - Some events hidden',
    icon: '📅',
    content: `📅 TIMELINE (Some events hidden)

7:18 PM — Rashid receives a DM (sender: [BLURRED])
[MISSING EVENT 1] 🔒
7:21 PM — Login alert: "New device logged in"
[MISSING EVENT 2] 🔒
7:23 PM — @rashid.snaps posts story: "🎁 Free giveaway! Click here for gift card"
7:24 PM — Multiple followers DM: "Bro is this you?"
7:25 PM — Account starts sending DMs to followers
7:30 PM — Rashid realizes he's locked out

What's Missing:
• Missing Event 1: Password reset activity
• Missing Event 2: Email change attempt`,
    costToView: 0,
    unlockCondition: null,
    strength: 'supporting',
    pointsTo: [],
    keywords: [],
    investigationActions: [
      {
        id: 'action_timeline_fill',
        label: 'Fill missing events',
        cost: 5,
        unlocksClueId: 'locked_6',
      },
    ],
  },
  {
    id: 'starter_3',
    type: 'starter',
    title: 'Suspicious DM Screenshot',
    subtitle: 'Partial - Details blurred',
    icon: '📱',
    content: `📱 DM Screenshot (PARTIAL)

From: [SENDER NAME BLURRED] ✓
Sent: 7:18 PM

"⚠️ ACTION REQUIRED

Your account has been flagged for violating community guidelines. You have 30 minutes to verify your identity or your account will be permanently disabled.

Click here to confirm: [LINK BLURRED] 🔒"

[Rashid's response: "Oh no! 😰"]`,
    costToView: 0,
    unlockCondition: null,
    strength: 'supporting',
    pointsTo: ['suspect_a'],
    keywords: ['phishing'],
    investigationActions: [
      {
        id: 'action_view_sender',
        label: 'View sender profile',
        cost: 5,
        unlocksClueId: 'locked_1',
      },
      {
        id: 'action_reveal_link',
        label: 'Reveal full link preview',
        cost: 8,
        unlocksClueId: 'locked_2',
      },
    ],
  },
  {
    id: 'starter_4',
    type: 'starter',
    title: 'Security Email Screenshot',
    subtitle: 'Partial - Location blurred',
    icon: '📧',
    content: `📧 Email from Instagram Security

Subject: "New login to your account"
From: security@mail.instagram.com
Received: 7:21 PM

───────────────────────────────
We noticed a new login to your account:

Device: Chrome on Windows
Location: [CITY BLURRED] 🔒, India
Time: 7:21 PM IST

Wasn't you? [Secure Your Account]
───────────────────────────────`,
    costToView: 0,
    unlockCondition: null,
    strength: 'supporting',
    pointsTo: [],
    keywords: ['session'],
    investigationActions: [
      {
        id: 'action_view_login',
        label: 'View full login details',
        cost: 5,
        unlocksClueId: 'locked_5',
      },
    ],
  },
  {
    id: 'starter_5',
    type: 'starter',
    title: 'Follower Complaint',
    subtitle: 'Message from @priya_designs',
    icon: '💬',
    content: `💬 Message from @priya_designs (Follower)

"Hey Rashid! Your account just sent me a DM saying I won a free gift card and to click a link. That's not you right? The message looks super sketchy 😬"

Sent: 7:26 PM

Clue Type: 🟡 Supporting Evidence
Points to: Account was compromised and used for scam spreading`,
    costToView: 0,
    unlockCondition: null,
    strength: 'supporting',
    pointsTo: [],
    keywords: [],
  },
];

// ============================================
// LOCKED CLUES (Must be unlocked)
// ============================================

const lockedClues: Clue[] = [
  {
    id: 'locked_1',
    type: 'locked',
    title: 'Full DM Sender Profile',
    subtitle: 'Complete profile analysis',
    icon: '🔍',
    contentLocked: 'Investigate the suspicious DM to reveal sender details...',
    content: `📱 Sender Profile Analysis

Username: @meta_support.verify_center
Display Name: "Meta Verified Team ✓"
Bio: "Official Instagram Help Center | Account Verification & Support"

Account Created: 2 weeks ago (January 6, 2026)
Followers: 32
Following: 0
Posts: 0
Profile Picture: Meta logo (low quality)

🚩 Red Flags:
• Very new account
• No posts
• Few followers for "official" account
• Fake verification badge in display name`,
    costToView: 5,
    unlockCondition: {
      method: 'investigate',
      sourceClueId: 'starter_3',
      cost: 5,
    },
    strength: 'supporting',
    pointsTo: ['suspect_a'],
    keywords: ['verification_badge'],
  },
  {
    id: 'locked_2',
    type: 'locked',
    title: 'Full Phishing Link',
    subtitle: 'Complete URL analysis',
    icon: '🔗',
    contentLocked: 'Reveal the link to analyze where it leads...',
    content: `🔗 Link Analysis

Full URL: 
http://instagram-appeal-center.com/verify/account

🚩 WARNING SIGNS:
❌ Uses HTTP (not secure HTTPS)
❌ Domain is NOT instagram.com
❌ Extra words: "appeal-center" (real Instagram never uses hyphens in main domain)
❌ Suspicious path: /verify/account

Real Instagram domains:
✅ instagram.com
✅ help.instagram.com
✅ about.instagram.com

Page Preview:
[Shows fake Instagram login page]
"Enter your username and password to verify..."`,
    costToView: 8,
    unlockCondition: {
      method: 'investigate',
      sourceClueId: 'starter_3',
      cost: 8,
    },
    strength: 'strong',
    pointsTo: ['suspect_a'],
    keywords: ['phishing', 'domain', 'https'],
  },
  {
    id: 'locked_3',
    type: 'locked',
    title: 'Victim Confession',
    subtitle: 'Did they click the link?',
    icon: '😰',
    contentLocked: 'Ask the victim about clicking links...',
    content: `💬 Rashid's Response:

"Yeah... I clicked it because I got scared. The message said my account would be disabled! 😰

The page looked exactly like Instagram's real login page. It had the logo and everything. 

I entered my username and password to 'verify' my identity. Right after that, I got logged out."

💡 Learning Moment: This is the smoking gun! Victim gave password directly to attacker.`,
    costToView: 4,
    unlockCondition: {
      method: 'chat',
      chatQuestionId: 'q_click_link',
      cost: 4,
    },
    strength: 'strong',
    pointsTo: ['suspect_a'],
    keywords: ['phishing', 'credentials'],
  },
  {
    id: 'locked_4',
    type: 'locked',
    title: 'OTP/Code Evidence',
    subtitle: 'Was a verification code involved?',
    icon: '🔢',
    contentLocked: 'Ask the victim about verification codes...',
    content: `💬 Rashid's Response:

"I got a text message with a 6-digit code from Instagram right after I entered my password.

SMS: 'Your Instagram verification code is: 482916'

But I didn't send it to anyone. The page didn't even ask for it - it just asked for my username and password."

Analysis: Code was generated but NOT shared with attacker. This means it wasn't an OTP scam.`,
    costToView: 4,
    unlockCondition: {
      method: 'chat',
      chatQuestionId: 'q_otp_code',
      cost: 4,
    },
    strength: 'supporting',
    pointsTo: [],
    rulesOut: ['suspect_b'],
    keywords: ['otp', 'two_factor'],
  },
  {
    id: 'locked_5',
    type: 'locked',
    title: 'Full Login Activity',
    subtitle: 'Complete session log',
    icon: '📊',
    contentLocked: 'Investigate the security email for full details...',
    content: `📊 Complete Login Activity Log

ACTIVE SESSIONS:
──────────────────────────────────────
1️⃣ Android (Samsung Galaxy A52)
   Location: Thiruvananthapuram, Kerala
   IP: 103.×××.×××.42
   Last Active: 7:15 PM (BEFORE attack)
   Status: ✅ LEGITIMATE (Rashid's phone)

2️⃣ Chrome on Windows 10
   Location: Indore, Madhya Pradesh  
   IP: 117.×××.×××.188
   First Login: 7:21 PM (RIGHT AFTER DM)
   Status: ⚠️ SUSPICIOUS

3️⃣ iPhone (iOS 17.2)
   Location: Mumbai, Maharashtra
   IP: 49.×××.×××.201
   First Login: 7:22 PM
   Status: ⚠️ SUSPICIOUS
──────────────────────────────────────

🚩 Analysis:
Two unknown devices logged in within 1 minute of each other, right after the phishing DM!`,
    costToView: 5,
    unlockCondition: {
      method: 'investigate',
      sourceClueId: 'starter_4',
      cost: 5,
    },
    strength: 'strong',
    pointsTo: ['suspect_a'],
    keywords: ['session', 'ip_address'],
  },
  {
    id: 'locked_6',
    type: 'locked',
    title: 'Password Reset Log',
    subtitle: 'Complete timeline with missing events',
    icon: '🔓',
    contentLocked: 'Fill in the missing timeline events...',
    content: `📧 COMPLETE TIMELINE (Missing Events Revealed)

7:18 PM — DM received from @meta_support.verify_center
7:19 PM — Rashid clicks phishing link
7:20 PM — Rashid enters credentials on fake page

🔓 MISSING EVENT 1:
7:22 PM — Password reset requested
          (From: Chrome on Windows, Indore)

🔓 MISSING EVENT 2:
7:22 PM — Password reset email sent
7:22 PM — Password successfully changed
          (Rashid's original password no longer works)

7:23 PM — Scam story posted
7:25 PM — Mass DMs sent to followers

Shows: Attacker moved FAST - changed password within 2 minutes`,
    costToView: 5,
    unlockCondition: {
      method: 'investigate',
      sourceClueId: 'starter_2',
      cost: 5,
    },
    strength: 'supporting',
    pointsTo: ['suspect_a'],
    keywords: ['password_reset'],
  },
  {
    id: 'locked_7',
    type: 'locked',
    title: 'Email Change Notification',
    subtitle: 'Account recovery email was changed',
    icon: '📧',
    contentLocked: 'Run an account changes check to reveal...',
    content: `📧 Account Security Alert

Subject: "Your email address was changed"
From: security@mail.instagram.com
Received: 7:22 PM

───────────────────────────────
Your Instagram email was changed from:
rashid.student@gmail.com

To:
recovery_verify2026@protonmail.com

If you didn't make this change, secure your account immediately.
───────────────────────────────

🚩 CRITICAL: Attacker tried to lock Rashid out permanently by changing recovery email!

Learning Point: This is why you must secure email FIRST during recovery`,
    costToView: 8,
    unlockCondition: {
      method: 'check',
      checkType: 'account_changes',
      cost: 8,
    },
    strength: 'strong',
    pointsTo: ['suspect_a'],
    keywords: ['account_recovery', 'email_security'],
  },
  {
    id: 'locked_8',
    type: 'locked',
    title: 'Connected Apps List',
    subtitle: 'Third-party app permissions',
    icon: '🔌',
    contentLocked: 'Run a connected apps check to reveal...',
    content: `🔌 Third-Party Apps Connected

✅ Canva (Photo editing)
   Connected: 3 months ago
   Permissions: Post to feed
   Status: SAFE

✅ Later (Scheduling tool)
   Connected: 1 month ago
   Permissions: Post stories, view insights
   Status: SAFE

❌ NO SUSPICIOUS APPS FOUND

Analysis: Account wasn't compromised through a malicious third-party app.`,
    costToView: 8,
    unlockCondition: {
      method: 'check',
      checkType: 'connected_apps',
      cost: 8,
    },
    strength: 'inconclusive',
    pointsTo: [],
    rulesOut: ['suspect_c'],
    keywords: ['third_party_apps', 'permissions'],
  },
  {
    id: 'locked_9',
    type: 'locked',
    title: 'Scam Story Screenshot',
    subtitle: 'Story posted by attacker',
    icon: '📸',
    contentLocked: 'Automatically unlocked after timeline investigation...',
    content: `📱 Story Posted by Attacker (7:23 PM)

╔═══════════════════════════╗
║   @rashid.snaps           ║
║                           ║
║   🎁 GIVEAWAY ALERT! 🎁   ║
║                           ║
║   First 100 people get    ║
║   ₹5000 gift card!        ║
║                           ║
║   Click here: [LINK]      ║
║   instagram-gifts.xyz     ║
║                           ║
║   Hurry! Ends in 30 min!  ║
╚═══════════════════════════╝

Link leads to: instagram-gifts.xyz/claim
(Another phishing site!)

Shows: Classic phishing tactic - use compromised account to spread scam`,
    costToView: 0,
    unlockCondition: {
      method: 'auto',
      autoTrigger: 'locked_6',
      cost: 0,
    },
    strength: 'supporting',
    pointsTo: ['suspect_a'],
    keywords: ['phishing', 'social_engineering'],
  },
  {
    id: 'locked_10',
    type: 'locked',
    title: 'Friend Impersonation Evidence',
    subtitle: 'Did a friend ask for codes?',
    icon: '👥',
    contentLocked: 'Ask the victim about friends messaging them...',
    content: `💬 Rashid's Response:

"No, nobody I know messaged me. The only weird message I got was from that Meta Support account.

My friends DID message me AFTER my account got hacked, asking if the giveaway story was real."

Analysis: No friend impersonation occurred`,
    costToView: 4,
    unlockCondition: {
      method: 'chat',
      chatQuestionId: 'q_friend_codes',
      cost: 4,
    },
    strength: 'inconclusive',
    pointsTo: [],
    rulesOut: ['suspect_b'],
    keywords: ['impersonation'],
  },
  {
    id: 'locked_11',
    type: 'locked',
    title: 'Brand Collaboration Email',
    subtitle: 'Recent brand offers',
    icon: '🏷️',
    contentLocked: 'Ask the victim about brand collaborations...',
    content: `💬 Rashid's Response:

"I did get some collaboration offers last week, but those were from real brands on Instagram. They wanted me to promote their clothes.

I didn't click any email links or download contracts. Everything was through Instagram DMs and their official websites."

📧 Email Inbox Check (Last 7 Days):
✅ Nike India (verified sender)
✅ Myntra (verified sender)  
❌ No suspicious collaboration emails

Analysis: No malicious brand scam involved`,
    costToView: 4,
    unlockCondition: {
      method: 'chat',
      chatQuestionId: 'q_brand_collab',
      cost: 4,
    },
    strength: 'inconclusive',
    pointsTo: [],
    rulesOut: ['suspect_c'],
    keywords: ['brand_scam'],
  },
  {
    id: 'locked_12',
    type: 'locked',
    title: 'Password Reuse Confession',
    subtitle: 'Does victim reuse passwords?',
    icon: '🔑',
    contentLocked: 'Ask the victim about password habits...',
    content: `💬 Rashid's Response:

"Um... yeah, I use the same password for Instagram, Gmail, and a few gaming sites. I know I shouldn't, but it's easier to remember 😅

But I don't think any of those sites got hacked recently... at least I didn't get any emails about it."

Optional Investigation: Data Breach Check (-10)
└─> "Your email found in 2023 gaming site breach. However, attack timing doesn't match - you clicked a phishing link JUST BEFORE the takeover happened."

Analysis: While password reuse is risky, the phishing link click timing proves Suspect A is the real cause.`,
    costToView: 4,
    unlockCondition: {
      method: 'chat',
      chatQuestionId: 'q_password_reuse',
      cost: 4,
    },
    strength: 'misleading',
    pointsTo: ['suspect_d'],
    rulesOut: [],
    keywords: ['password_reuse', 'data_breach'],
  },
];

// ============================================
// EXPORT ALL CLUES
// ============================================

export const clues: Clue[] = [...starterClues, ...lockedClues];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getClueById(id: string): Clue | undefined {
  return clues.find((clue) => clue.id === id);
}

export function getStarterClues(): Clue[] {
  return clues.filter((clue) => clue.type === 'starter');
}

export function getLockedClues(): Clue[] {
  return clues.filter((clue) => clue.type === 'locked');
}

export function getCluesByMethod(method: string): Clue[] {
  return clues.filter((clue) => clue.unlockCondition?.method === method);
}

export function getCluesPointingTo(suspectId: string): Clue[] {
  return clues.filter((clue) => clue.pointsTo.includes(suspectId));
}

export function getCluesRulingOut(suspectId: string): Clue[] {
  return clues.filter((clue) => clue.rulesOut?.includes(suspectId));
}

export function getClueStrengthColor(strength: Clue['strength']): string {
  switch (strength) {
    case 'strong':
      return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'supporting':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'inconclusive':
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    case 'misleading':
      return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    default:
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  }
}

export function getClueStrengthLabel(strength: Clue['strength']): string {
  switch (strength) {
    case 'strong':
      return '🔴 Strong Proof';
    case 'supporting':
      return '🟡 Supporting';
    case 'inconclusive':
      return '⚪ Inconclusive';
    case 'misleading':
      return '🟣 Misleading';
    default:
      return '⚪ Unknown';
  }
}
