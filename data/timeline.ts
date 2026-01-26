import { Clue } from '@/types/clue';

// ============================================
// TIMELINE EVENT TYPES
// ============================================

export type EventCategory = 
  | 'dm_received'
  | 'link_clicked'
  | 'credentials_entered'
  | 'login_detected'
  | 'password_changed'
  | 'email_changed'
  | 'scam_posted'
  | 'followers_contacted'
  | 'account_locked';

export type EventSeverity = 'normal' | 'warning' | 'critical';

export interface TimelineEvent {
  id: string;
  time: string;
  timeValue: number; // Minutes after 7:00 PM for sorting
  title: string;
  description: string;
  details?: string[];
  category: EventCategory;
  severity: EventSeverity;
  icon: string;
  isLocked: boolean;
  unlockedBy: string[]; // Clue IDs that unlock this event
  starterVisible: boolean; // Visible from start but may be partial
  partialContent?: string; // What to show when locked
}

// ============================================
// TIMELINE EVENTS DATA
// ============================================

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'evt_1',
    time: '7:18 PM',
    timeValue: 18,
    title: 'Suspicious DM Received',
    description: 'Rashid receives a DM from @meta_support.verify_center',
    details: [
      'Message claims account is flagged for violations',
      'Threatens permanent disable within 30 minutes',
      'Contains suspicious verification link',
    ],
    category: 'dm_received',
    severity: 'warning',
    icon: '📩',
    isLocked: false,
    unlockedBy: [],
    starterVisible: true,
    partialContent: 'Rashid receives a DM (sender: [BLURRED])',
  },
  {
    id: 'evt_2',
    time: '7:19 PM',
    timeValue: 19,
    title: 'Phishing Link Clicked',
    description: 'Rashid clicks the link in the suspicious DM',
    details: [
      'Link leads to fake Instagram login page',
      'Domain: insta-support-verify.com (FAKE)',
      'Page looks identical to real Instagram',
    ],
    category: 'link_clicked',
    severity: 'critical',
    icon: '🔗',
    isLocked: true,
    unlockedBy: ['LC2', 'LC3'],
    starterVisible: false,
  },
  {
    id: 'evt_3',
    time: '7:20 PM',
    timeValue: 20,
    title: 'Credentials Entered',
    description: 'Rashid enters his username and password on the fake page',
    details: [
      'Credentials captured by attacker',
      'Page shows "Verification in progress..."',
      'Rashid believes account is being verified',
    ],
    category: 'credentials_entered',
    severity: 'critical',
    icon: '🔑',
    isLocked: true,
    unlockedBy: ['LC3'],
    starterVisible: false,
  },
  {
    id: 'evt_4',
    time: '7:21 PM',
    timeValue: 21,
    title: 'New Device Login Detected',
    description: 'Instagram detects login from new device in Indore',
    details: [
      'Device: Chrome on Windows',
      'Location: Indore, Madhya Pradesh, India',
      'IP: 103.xxx.xxx.xxx',
      'Security email sent to Rashid',
    ],
    category: 'login_detected',
    severity: 'warning',
    icon: '🔔',
    isLocked: false,
    unlockedBy: [],
    starterVisible: true,
    partialContent: 'Login alert: "New device logged in"',
  },
  {
    id: 'evt_5',
    time: '7:22 PM',
    timeValue: 22,
    title: 'Password Changed',
    description: 'Attacker changes account password',
    details: [
      'Password reset requested from attacker device',
      'Reset email sent to original email',
      'Attacker intercepts and completes reset',
      'Rashid\'s original password no longer works',
    ],
    category: 'password_changed',
    severity: 'critical',
    icon: '🔐',
    isLocked: true,
    unlockedBy: ['LC6'],
    starterVisible: true,
    partialContent: '[MISSING EVENT 1] 🔒',
  },
  {
    id: 'evt_6',
    time: '7:22 PM',
    timeValue: 22.5,
    title: 'Recovery Email Changed',
    description: 'Attacker changes account recovery email',
    details: [
      'Original: rashid.student@gmail.com',
      'Changed to: recovery_verify2026@protonmail.com',
      'Attempt to permanently lock Rashid out',
      'Security alert sent to original email',
    ],
    category: 'email_changed',
    severity: 'critical',
    icon: '📧',
    isLocked: true,
    unlockedBy: ['LC6', 'LC7'],
    starterVisible: true,
    partialContent: '[MISSING EVENT 2] 🔒',
  },
  {
    id: 'evt_7',
    time: '7:23 PM',
    timeValue: 23,
    title: 'Scam Story Posted',
    description: 'Attacker posts scam story from Rashid\'s account',
    details: [
      'Story: "🎁 Free giveaway! Click here for gift card"',
      'Contains malicious link',
      'Designed to spread attack to followers',
    ],
    category: 'scam_posted',
    severity: 'critical',
    icon: '📱',
    isLocked: false,
    unlockedBy: [],
    starterVisible: true,
  },
  {
    id: 'evt_8',
    time: '7:24-25 PM',
    timeValue: 24,
    title: 'Followers Start Noticing',
    description: 'Multiple followers DM asking about suspicious activity',
    details: [
      '@priya_designs: "That\'s not you right?"',
      'Other followers report sketchy DMs',
      'Followers being targeted by scam messages',
    ],
    category: 'followers_contacted',
    severity: 'warning',
    icon: '👥',
    isLocked: false,
    unlockedBy: [],
    starterVisible: true,
  },
  {
    id: 'evt_9',
    time: '7:25 PM',
    timeValue: 25,
    title: 'Mass DMs Sent',
    description: 'Account sends scam DMs to all followers',
    details: [
      'Automated messages sent to 8,234 followers',
      'Messages contain same phishing pattern',
      'Attack spreading to new victims',
    ],
    category: 'followers_contacted',
    severity: 'critical',
    icon: '📤',
    isLocked: true,
    unlockedBy: ['LC9'],
    starterVisible: false,
  },
  {
    id: 'evt_10',
    time: '7:30 PM',
    timeValue: 30,
    title: 'Account Locked Out',
    description: 'Rashid realizes he can no longer access his account',
    details: [
      'Password no longer works',
      'Recovery email has been changed',
      'Account fully compromised',
      'Rashid contacts support for help',
    ],
    category: 'account_locked',
    severity: 'critical',
    icon: '🚫',
    isLocked: false,
    unlockedBy: [],
    starterVisible: true,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a timeline event should be visible
 */
export function isEventVisible(event: TimelineEvent, unlockedClues: string[]): boolean {
  if (event.starterVisible) return true;
  return event.unlockedBy.some((clueId) => unlockedClues.includes(clueId));
}

/**
 * Check if a timeline event is fully unlocked (not partial)
 */
export function isEventUnlocked(event: TimelineEvent, unlockedClues: string[]): boolean {
  if (!event.isLocked) return true;
  return event.unlockedBy.some((clueId) => unlockedClues.includes(clueId));
}

/**
 * Get visible events based on unlocked clues
 */
export function getVisibleEvents(unlockedClues: string[]): TimelineEvent[] {
  return timelineEvents.filter((event) => isEventVisible(event, unlockedClues));
}

/**
 * Get sorted timeline events
 */
export function getSortedEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => a.timeValue - b.timeValue);
}

/**
 * Get event by ID
 */
export function getEventById(id: string): TimelineEvent | undefined {
  return timelineEvents.find((event) => event.id === id);
}

/**
 * Get color classes for severity
 */
export function getSeverityColor(severity: EventSeverity): {
  dot: string;
  bg: string;
  border: string;
  text: string;
} {
  switch (severity) {
    case 'critical':
      return {
        dot: 'bg-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
      };
    case 'warning':
      return {
        dot: 'bg-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-400',
      };
    default:
      return {
        dot: 'bg-slate-500',
        bg: 'bg-slate-800/50',
        border: 'border-slate-700',
        text: 'text-slate-400',
      };
  }
}

/**
 * Calculate timeline progress (how much has been revealed)
 */
export function calculateTimelineProgress(unlockedClues: string[]): {
  revealed: number;
  total: number;
  percentage: number;
} {
  const total = timelineEvents.length;
  const revealed = timelineEvents.filter(
    (event) => isEventUnlocked(event, unlockedClues)
  ).length;
  const percentage = Math.round((revealed / total) * 100);
  
  return { revealed, total, percentage };
}
