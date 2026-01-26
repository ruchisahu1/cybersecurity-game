import { GlossaryTerm, QuizQuestion } from '@/types/glossary';

// ============================================
// GLOSSARY TERMS
// ============================================

export const glossaryTerms: GlossaryTerm[] = [
  // ========== CRITICAL TERMS ==========
  {
    id: 'phishing',
    term: 'Phishing',
    shortDefinition: 'Fake websites/messages that trick you into giving up passwords',
    icon: '🎣',
    category: 'critical',
    definition: {
      whatItIs: `A scam where attackers create fake websites or messages that look real to trick you into giving them your password, credit card info, or other personal details.`,
      realWorldExample: `You get an email saying "Your Netflix account will be suspended! Click here to update payment." The link looks like netflix.com but is actually netfl1x-secure.com (fake!). If you enter your password, hackers steal it.`,
      inThisGame: `Rashid got a DM saying his Instagram would be disabled. He clicked a link to "verify" his identity, but the page was fake and stole his password.`,
      howToSpot: [
        'Check the EXACT domain name (instagram.com vs instagram-appeal.com)',
        'Look for HTTPS (🔒) in the address bar',
        'Real companies never send urgent "act now or lose account" threats',
        'Hover over links before clicking (shows real URL)',
      ],
      proTip: `When in doubt, go to the official website manually (type instagram.com yourself) instead of clicking links in messages.`,
    },
    relatedTerms: ['domain', 'social_engineering', 'credential_harvesting'],
  },
  {
    id: 'two_factor_auth',
    term: '2FA (Two-Factor Authentication)',
    shortDefinition: 'A second security step after your password, usually a code from your phone',
    icon: '🔐',
    category: 'critical',
    definition: {
      whatItIs: `A second security step after your password. Usually a 6-digit code from your phone or an app.

How it works:
1. You enter your password (something you KNOW)
2. You enter a code from your phone (something you HAVE)
3. Only then you can log in`,
      realWorldExample: `Your bank account uses 2FA. Even if someone steals your password, they can't log in without the code sent to YOUR phone.`,
      inThisGame: `If Rashid had 2FA enabled BEFORE the attack, the hacker couldn't have logged in even after stealing his password!`,
      howToSpot: [
        '📱 Authenticator App (BEST) - Google Authenticator, Authy',
        '💬 SMS Code (OKAY) - Text message with code',
        '📧 Email Code (WEAK) - If email is compromised, useless',
      ],
      proTip: `Use authenticator apps instead of SMS. Hackers can steal SMS codes through "SIM swapping" attacks.

How to enable on Instagram: Settings → Security → Two-Factor Authentication → Get Started`,
    },
    relatedTerms: ['otp', 'session'],
  },
  {
    id: 'session',
    term: 'Session',
    shortDefinition: 'An active login from a specific device - stays open until logged out',
    icon: '🚪',
    category: 'critical',
    definition: {
      whatItIs: `A "session" is an active login to your account from a specific device. Think of it like a door that stays open after you log in.`,
      realWorldExample: `You log into Instagram on your phone Monday morning. You stay logged in all week without entering your password again. That's one session.`,
      inThisGame: `When the hacker stole Rashid's password and logged in from a Windows computer, they created a NEW session. Even after Rashid changed his password, that session stayed active!`,
      howToSpot: [
        'Changing your password doesn\'t automatically log out hackers',
        'They stay logged in through their existing session until you manually revoke it',
        'Check: Settings → Security → Login Activity',
      ],
      proTip: `After changing your password, ALWAYS check and revoke unknown sessions. Otherwise, hackers stay logged in!`,
    },
    relatedTerms: ['revoke_sessions', 'ip_address'],
  },
  {
    id: 'domain',
    term: 'Domain',
    shortDefinition: 'A website\'s address - the main part of the URL that identifies who owns it',
    icon: '🌐',
    category: 'critical',
    definition: {
      whatItIs: `A website's address. The "domain" is the main part of the URL that identifies who owns the site.

Real examples:
✅ instagram.com (Real Instagram)
✅ facebook.com (Real Facebook)
✅ google.com (Real Google)

Fake examples:
❌ instagram-verify.com (Fake - extra word!)
❌ instgram.com (Fake - missing 'a'!)
❌ instagram.co (Fake - wrong ending!)`,
      realWorldExample: `When you see a URL, the domain is the part before the first slash. In "https://instagram.com/rashid", the domain is "instagram.com".`,
      inThisGame: `The phishing link was: ❌ instagram-appeal-center.com

Real Instagram domains:
✅ instagram.com
✅ help.instagram.com
✅ about.instagram.com`,
      howToSpot: [
        'Look for EXACT spelling',
        'Check what comes AFTER the name (.com, .org are common; .xyz, .tk are suspicious)',
        'Be suspicious of hyphens (instagram-help)',
        'Check for HTTPS (🔒 padlock icon)',
      ],
      proTip: `Hover your mouse over links before clicking. The real URL appears at the bottom of your browser. If it doesn't match what the text says, it's a scam!`,
    },
    relatedTerms: ['phishing', 'https'],
  },
  {
    id: 'revoke_sessions',
    term: 'Revoke Sessions',
    shortDefinition: 'Force a device to log out immediately by cancelling its active session',
    icon: '🚫',
    category: 'critical',
    definition: {
      whatItIs: `"Revoking" means cancelling or removing. When you revoke a session, you force a device to log out immediately.`,
      realWorldExample: `You logged into Instagram at a friend's house. Later, you realize you forgot to log out. You can go to "Login Activity" on your phone and click "Log Out" next to your friend's computer. This revokes that session.`,
      inThisGame: `After stealing Rashid's password, the hacker stayed logged in even when the password was changed. Revoking their session KICKED THEM OUT immediately.`,
      howToSpot: [
        '✋ Changing password = locks the door',
        '✋ Revoking sessions = kicks out people already inside',
        'You need BOTH to fully secure your account!',
      ],
      proTip: `Do this AFTER changing your password, not before. Otherwise they can just log back in with the old password.

How to revoke on Instagram:
1. Settings → Security → Login Activity
2. See all active devices
3. Click "Log Out" on unknown devices`,
    },
    relatedTerms: ['session', 'two_factor_auth'],
  },

  // ========== HELPFUL TERMS ==========
  {
    id: 'otp',
    term: 'OTP (One-Time Password)',
    shortDefinition: 'A temporary 6-digit code that expires after a few minutes',
    icon: '🔢',
    category: 'helpful',
    definition: {
      whatItIs: `A temporary code (usually 6 digits) that you can only use once. It expires after a few minutes.

Examples:
• 482916 (Instagram verification code)
• 739281 (bank transaction code)
• 104729 (email verification code)`,
      realWorldExample: `Apps send you OTP via SMS or email to verify it's really you. You enter the code within 1-3 minutes.`,
      inThisGame: `In OTP scams, a hacker pretends to be your friend: "Hey! I'm locked out of my account. Can you send me the code Instagram just sent you?" If you share it, they use YOUR code to log into YOUR account!`,
      howToSpot: [
        '❌ NEVER share OTP codes with anyone',
        '❌ Real companies never ask for your OTP',
        '❌ Friends shouldn\'t ask for codes - they get their own',
      ],
      proTip: `If someone asks for your OTP, it's ALWAYS a scam. No exceptions.`,
    },
    relatedTerms: ['two_factor_auth', 'social_engineering'],
  },
  {
    id: 'social_engineering',
    term: 'Social Engineering',
    shortDefinition: 'Psychological tricks that manipulate people into giving up information',
    icon: '🎭',
    category: 'helpful',
    definition: {
      whatItIs: `Psychological tricks that manipulate people into giving up confidential information or doing things that help attackers.

Basically: Hacking humans instead of computers.

Common tactics:
😱 Urgency - "Act in 30 minutes or lose account!"
😨 Fear - "You violated policy, account will be banned!"
🎁 Greed - "You won a free gift card!"
❤️ Trust - Pretending to be friend/official company
📜 Authority - Fake "Meta Support" or "Instagram Team"`,
      realWorldExample: `• Phone call: "This is your bank. Verify your card number to stop fraud."
• Email: "Your package couldn't be delivered. Click to reschedule." (Fake link)
• DM: "You won our giveaway! Claim prize here."`,
      inThisGame: `The hacker used urgency ("30 minutes") + fear ("account will be disabled") + fake authority ("Meta Support") to pressure Rashid into clicking without thinking.`,
      howToSpot: [
        'Slow down - scammers rely on panic',
        'Verify independently - call official number, don\'t use links in message',
        'Question authority - real companies don\'t pressure you',
        'Trust your gut - if it feels off, it probably is',
      ],
      proTip: `Legitimate companies give you TIME to respond. "Act now or lose everything!" is always a red flag.`,
    },
    relatedTerms: ['phishing', 'otp'],
  },
  {
    id: 'https',
    term: 'HTTPS vs HTTP',
    shortDefinition: 'HTTPS is secure (encrypted), HTTP is not - never enter passwords on HTTP',
    icon: '🔒',
    category: 'helpful',
    definition: {
      whatItIs: `Protocols (rules) for how websites send data. The 'S' in HTTPS means "Secure."

🔒 HTTPS (Secure):
• Data is encrypted (scrambled)
• Shows padlock (🔒) icon in browser
• Safe for entering passwords/credit cards
• Example: https://instagram.com

🔓 HTTP (Not Secure):
• Data sent in plain text (anyone can read it)
• No padlock icon
• NEVER enter passwords on HTTP sites
• Example: http://instagram-fake.com`,
      realWorldExample: `On HTTP sites, anyone on the same WiFi (coffee shop, airport) can see what you type, including passwords!`,
      inThisGame: `The phishing link was: ❌ http://instagram-appeal-center.com (No 'S' = not secure!)

Real Instagram always uses: ✅ https://instagram.com (With 'S' = secure)`,
      howToSpot: [
        '🔒 https://instagram.com → SAFE',
        'http://instagram-verify.com → UNSAFE',
        'Many browsers show "Not Secure" warning for HTTP sites',
      ],
      proTip: `Never ignore "Not Secure" warnings! If a site asks for your password without HTTPS, close it immediately.`,
    },
    relatedTerms: ['domain', 'phishing'],
  },
  {
    id: 'credential_harvesting',
    term: 'Credential Harvesting',
    shortDefinition: 'Collecting login credentials from many people through phishing',
    icon: '🌾',
    category: 'helpful',
    definition: {
      whatItIs: `The process of collecting (harvesting) login credentials (username + password) from many people, usually through phishing.

How it works:
1. Attacker creates 100 fake login pages
2. Sends phishing links to 10,000 people
3. 500 people fall for it and enter passwords
4. Attacker now has 500 username/password pairs`,
      realWorldExample: `What happens next:
• Try credentials on other sites (people reuse passwords)
• Sell credentials on dark web (₹50-500 per account)
• Use accounts to spread more scams
• Steal money, personal info, or identities`,
      inThisGame: `The fake Instagram login page was designed to harvest credentials. Every person who entered their password gave it directly to the hacker.`,
      howToSpot: [
        '✓ Check URL before entering password',
        '✓ Use password manager (enters only on real sites)',
        '✓ Enable 2FA (harvested password alone won\'t work)',
        '✓ Use unique passwords per site',
      ],
      proTip: `Think of credentials like crops in a field. Scammers "plant" fake login pages and "harvest" passwords. Don't be a crop!`,
    },
    relatedTerms: ['phishing', 'two_factor_auth'],
  },

  // ========== ADVANCED TERMS ==========
  {
    id: 'osint',
    term: 'OSINT (Open Source Intelligence)',
    shortDefinition: 'Information gathered from publicly available sources',
    icon: '🔍',
    category: 'advanced',
    definition: {
      whatItIs: `Information gathered from publicly available sources like websites, social media, news articles, and public records.

Examples of OSINT:
• Googling someone's name
• Checking Instagram followers/posts
• Reading company websites
• Analyzing domain registration data
• Searching Twitter for mentions`,
      realWorldExample: `Who uses OSINT:
👮 Police - investigating crimes
🕵️ Cybersecurity - tracking hackers
📰 Journalists - researching stories
🏢 Companies - checking competitors`,
      inThisGame: `Interpol's OSINT report gathered:
• Public scam reports
• Domain registration info
• Pattern analysis across countries
• Social media mentions of phishing links`,
      howToSpot: [
        'Not OSINT (requires special access): Private messages, Bank records, Hacked data',
        'Be careful what you share publicly - scammers use OSINT too',
      ],
      proTip: `Scammers check your posts to make scams more believable. You post "Excited for my iPhone 15!" → Scammer sends fake Apple email "Your iPhone order needs verification..."`,
    },
    relatedTerms: ['ip_address', 'social_engineering'],
  },
  {
    id: 'ip_address',
    term: 'IP Address',
    shortDefinition: 'A unique number assigned to every device on the internet',
    icon: '📍',
    category: 'advanced',
    definition: {
      whatItIs: `Internet Protocol address - a unique number assigned to every device connected to the internet. Like a home address, but for computers.

Format: Usually looks like 192.168.1.1 or 49.36.214.101

What it reveals:
• Approximate location (city/region, not exact address)
• Internet service provider (Jio, Airtel, etc.)
• Sometimes: company or organization`,
      realWorldExample: `Limitations:
✗ IP doesn't show exact address
✗ Changes when you move locations
✗ Can be hidden with VPN

Only police/ISP can connect IP to physical address.`,
      inThisGame: `Login activity showed:
• Rashid's phone: IP from Thiruvananthapuram ✅
• Hacker's device: IP from Indore ❌

This proved someone from another city logged in!`,
      howToSpot: [
        'If you see login from a location you\'ve never visited, it\'s a hacker!',
        'Check Settings → Security → Login Activity',
      ],
      proTip: `IP addresses alone can't identify someone's exact location, but they can reveal which city or region a login came from.`,
    },
    relatedTerms: ['session', 'vpn'],
  },
  {
    id: 'vpn',
    term: 'VPN (Virtual Private Network)',
    shortDefinition: 'A tool that hides your real location by routing internet through another server',
    icon: '🛡️',
    category: 'advanced',
    definition: {
      whatItIs: `A tool that hides your real location and IP address by routing your internet through a different server.

How it works:
1. Your computer → VPN server in another country
2. VPN server → Website you want to visit
3. Website thinks you're in the VPN server's location`,
      realWorldExample: `Uses:
🌍 Privacy - hide your location
🔒 Security - encrypt data on public WiFi
🌐 Access - watch content from other countries
🕵️ Anonymity - harder to track you online`,
      inThisGame: `The hacker may have used VPN to hide their real location. Login showed "Indore" but they might actually be anywhere in the world! This is why IP address alone can't catch hackers.`,
      howToSpot: [
        'Are VPNs legal? ✅ Yes, in India and most countries',
        'Used by companies, travelers, privacy advocates',
        '⚠️ Using VPN to do illegal things is still illegal!',
      ],
      proTip: `Use VPN on public WiFi (airports, cafés) to protect your data from hackers on the same network.`,
    },
    relatedTerms: ['ip_address', 'https'],
  },
];

// ============================================
// QUIZ QUESTIONS
// ============================================

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz_session_revoke',
    question: 'A hacker stole your password and logged in. What should you do FIRST to kick them out?',
    options: [
      { id: 'a', text: 'Change your password only' },
      { id: 'b', text: 'Enable 2FA only' },
      { id: 'c', text: 'Revoke their session + change password' },
      { id: 'd', text: 'Report the hacker' },
    ],
    correctAnswerId: 'c',
    explanation: `✅ Correct! You understand that sessions must be revoked manually! This is one of the most commonly missed steps when recovering hacked accounts.

Here's why:
1. Revoke session = kicks them out NOW
2. Change password = prevents them logging back in
3. Then enable 2FA = prevents future attacks`,
    wrongExplanation: `❌ Not quite! Changing password alone doesn't log them out from their existing session. They'd stay logged in until the session expires (could be days!).

Correct answer: Revoke their session + change password

Here's why:
1. Revoke session = kicks them out NOW
2. Change password = prevents them logging back in
3. Then enable 2FA = prevents future attacks

Remember: Sessions stay active even after password changes!`,
    rewardCredits: 5,
    relatedTerms: ['session', 'revoke_sessions', 'two_factor_auth'],
  },
  {
    id: 'quiz_phishing_spot',
    question: 'Which URL is most likely a phishing attempt?',
    options: [
      { id: 'a', text: 'https://instagram.com/login' },
      { id: 'b', text: 'https://help.instagram.com/support' },
      { id: 'c', text: 'http://instagram-verify-account.com' },
      { id: 'd', text: 'https://about.instagram.com' },
    ],
    correctAnswerId: 'c',
    explanation: `✅ Correct! You spotted the fake domain! 

Red flags in "instagram-verify-account.com":
• Uses HTTP (not HTTPS)
• Domain has extra words with hyphens
• Not a real Instagram subdomain

Real Instagram domains always end with just "instagram.com"`,
    wrongExplanation: `❌ The phishing URL is: http://instagram-verify-account.com

Red flags:
• Uses HTTP (not HTTPS) - no padlock!
• Domain has extra words with hyphens
• Not a real Instagram subdomain

Real Instagram domains:
✅ instagram.com
✅ help.instagram.com
✅ about.instagram.com`,
    rewardCredits: 5,
    relatedTerms: ['phishing', 'domain', 'https'],
  },
  {
    id: 'quiz_otp_scam',
    question: 'Your friend messages: "Hey! Can you send me the code Instagram just sent you?" What should you do?',
    options: [
      { id: 'a', text: 'Send the code - they\'re my friend!' },
      { id: 'b', text: 'Ask why they need it first' },
      { id: 'c', text: 'Never share the code - this is likely a scam' },
      { id: 'd', text: 'Send only half the code to be safe' },
    ],
    correctAnswerId: 'c',
    explanation: `✅ Correct! You should NEVER share OTP codes!

Even if it seems like your friend is asking:
• Their account may be hacked
• Scammer is pretending to be them
• Real friends get their OWN codes

If you share your code, the scammer logs into YOUR account!`,
    wrongExplanation: `❌ Never share OTP codes with anyone - not even friends!

This is a classic OTP scam:
1. Hacker controls your friend's account
2. They message you asking for "your" code
3. If you share it, they log into YOUR account

The code is for YOUR account, not theirs. Real friends get their own codes.`,
    rewardCredits: 5,
    relatedTerms: ['otp', 'social_engineering', 'two_factor_auth'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.id === id);
}

export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossaryTerms.filter((t) => t.category === category);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(lowerQuery) ||
      t.shortDefinition.toLowerCase().includes(lowerQuery)
  );
}

export function getCategoryColor(category: GlossaryTerm['category']): string {
  switch (category) {
    case 'critical':
      return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'helpful':
      return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'advanced':
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    default:
      return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
  }
}

export function getCategoryLabel(category: GlossaryTerm['category']): string {
  switch (category) {
    case 'critical':
      return '🔴 Critical';
    case 'helpful':
      return '🟡 Helpful';
    case 'advanced':
      return '⚪ Advanced';
    default:
      return '⚪ Unknown';
  }
}

export function getRandomQuiz(excludeIds: string[] = []): QuizQuestion | null {
  const available = quizQuestions.filter((q) => !excludeIds.includes(q.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}
