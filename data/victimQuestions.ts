import { VictimQuestion } from '@/types/chat';

// ============================================
// VICTIM PROFILE
// ============================================

export const VICTIM_PROFILE = {
  name: 'Rashid',
  username: '@rashid.snaps',
  avatar: '👤',
  role: 'Student Entrepreneur',
  description: 'Fashion/lifestyle content creator with 8,234 followers',
};

// ============================================
// QUESTION COST
// ============================================

export const QUESTION_COST = 4;

// ============================================
// VICTIM QUESTIONS
// ============================================

export const victimQuestions: VictimQuestion[] = [
  {
    id: 'q_click_link',
    question: 'Did you click any link you got in DM?',
    shortQuestion: 'Did you click any link?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_3'],
    answer: `Yeah... I clicked it because I got scared. The message said my account would be disabled! 😰

The page looked exactly like Instagram's real login page. It had the logo and everything. 

I entered my username and password to 'verify' my identity. Right after that, I got logged out.

I feel so stupid now... I should have checked the URL more carefully.`,
    category: 'critical',
    significance: '🔴 Critical - This is key evidence!',
  },
  {
    id: 'q_otp_code',
    question: 'Did anyone ask you for a code or OTP?',
    shortQuestion: 'Did anyone ask for a code?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_4'],
    answer: `No, nobody asked me for any code. 

I did get a text message with a 6-digit code from Instagram right after I entered my password on that page.

SMS said: "Your Instagram verification code is: 482916"

But I didn't send it to anyone. The page didn't even ask for it - it just asked for my username and password. That's weird now that I think about it...`,
    category: 'supporting',
    significance: '🟡 Supporting - Rules out Suspect B (OTP scam)',
  },
  {
    id: 'q_sms_code',
    question: 'Did you get any SMS or email code from Instagram?',
    shortQuestion: 'Did you get an SMS code?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_4'],
    answer: `Yes! I got a text message with a verification code right after I entered my password on that "verification" page.

The SMS was: "Your Instagram verification code is: 482916"

I remember thinking it was strange because I didn't request a code. But I was so panicked about my account being "disabled" that I didn't really think about it.

I didn't share this code with anyone though.`,
    category: 'supporting',
    significance: '🟡 Supporting - Shows 2FA was triggered',
  },
  {
    id: 'q_password_reuse',
    question: 'Do you use the same password on different sites?',
    shortQuestion: 'Do you reuse passwords?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_12'],
    answer: `Um... yeah, I use the same password for Instagram, Gmail, and a few gaming sites. I know I shouldn't, but it's easier to remember 😅

My password is pretty simple too - it's my name and birth year. I've been using it for like 3 years now.

But I don't think any of those sites got hacked recently... at least I didn't get any emails about it. Why do you ask?`,
    category: 'supporting',
    significance: '🟣 Red Herring - Password reuse is risky but not the cause here',
  },
  {
    id: 'q_brand_collab',
    question: 'Did you recently accept any brand collaboration offers?',
    shortQuestion: 'Any brand collaborations?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_11'],
    answer: `I did get some collaboration offers last week, but those were from real brands on Instagram. They wanted me to promote their clothes.

One was from Nike India and another from Myntra - both verified accounts with millions of followers.

I didn't click any email links or download contracts. Everything was through Instagram DMs and their official websites.

I'm pretty careful about brand deals because I've heard about scams targeting influencers.`,
    category: 'supporting',
    significance: '🟡 Supporting - Rules out Suspect C (Brand scam)',
  },
  {
    id: 'q_friend_codes',
    question: 'Did any friend message you asking for help or codes?',
    shortQuestion: 'Did a friend ask for codes?',
    cost: QUESTION_COST,
    unlocksClueIds: ['locked_10'],
    answer: `No, nobody I know messaged me asking for codes or help before this happened.

The only weird message I got was from that Meta Support account - that's what started all this!

My friends DID message me AFTER my account got hacked though. They were asking if the giveaway story was real. That's how I found out something was wrong.

One friend said "Bro is this you? This looks sketchy" and that's when I realized I was locked out.`,
    category: 'supporting',
    significance: '🟡 Supporting - Rules out Suspect B (Friend impersonation)',
  },
  {
    id: 'q_first_notice',
    question: 'When did you first notice something was wrong?',
    shortQuestion: 'When did you notice?',
    cost: QUESTION_COST,
    unlocksClueIds: [],
    answer: `It all happened so fast! Let me think...

Around 7:18 PM I got that scary DM about my account being disabled. I panicked and clicked the link immediately.

By 7:21 PM, I got an email saying someone logged in from a new device. I thought it was weird but I was still on that fake page.

Then around 7:25-7:26 PM, my friends started messaging me about a "giveaway" on my account. That's when I tried to open Instagram and realized I was logged out.

By 7:30 PM, I knew I was hacked. My password didn't work anymore. It all happened in like 12 minutes! 😭`,
    category: 'background',
    significance: '⚪ Context - Helps understand the timeline',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getQuestionById(id: string): VictimQuestion | undefined {
  return victimQuestions.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: VictimQuestion['category']): VictimQuestion[] {
  return victimQuestions.filter((q) => q.category === category);
}

export function getCategoryColor(category: VictimQuestion['category']): string {
  switch (category) {
    case 'critical':
      return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'supporting':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'background':
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    default:
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  }
}

export function getCategoryLabel(category: VictimQuestion['category']): string {
  switch (category) {
    case 'critical':
      return '🔴 Critical';
    case 'supporting':
      return '🟡 Supporting';
    case 'background':
      return '⚪ Background';
    default:
      return '⚪ Unknown';
  }
}
