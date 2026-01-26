🎮 CASE 01 BLUEPRINT: "The Vanishing Handle"
Complete Game Design Document with All Features

📋 GAME OVERVIEW
Target Audience: Students (High School / Early College)
Learning Goals: Social engineering awareness, phishing detection, account recovery, critical thinking
Theme: Instagram account hacked through phishing + scam posting
Platform: Web-based (desktop/mobile friendly)
Win Condition: Player must:

✅ Identify the correct suspect (Suspect A)
✅ Recover account access
✅ Prevent repeat attacks through proper security actions


🎯 STARTING SETUP
Player Resources

Credits: 100 (investigation budget)
Time: Optional (credits already create urgency)

Suspects (Shown from Start)
Players see 4 suspects immediately, but with minimal info:

Suspect A — Fake Meta Support (Phishing)
Suspect B — Friend Impersonator (OTP Scam)
Suspect C — Brand Collaboration (Malicious Contract)
Suspect D — Password Leak / Reuse (Silent Login)

Core UI Tabs
┌─────────────────────────────────────────────┐
│ Evidence Locker │ Victim Chat │ Timeline │ 
│ Suspect Board │ 📖 Tech Wiki │ Support │
└─────────────────────────────────────────────┘
Credit Counter Display
💰 Credits: 100
🟢 Safe (100-60)
🟡 Careful (59-30)
🔴 Low Budget! (29-0)

💰 CREDIT RULES (Game Economy)
Investigation Costs
ActionCostExampleOpen a locked clue-3View blurred imageInvestigate clue deeper-5Enhance DM sender profileAsk victim a question-4"Did you click the link?"Run built-in check-8Link preview, session list, app checkAttempt accusation-10Accuse Suspect AWrong accusation penalty-15Accuse wrong suspectCorrect accusation bonus+10Solved case correctly
External Support Costs
ServiceCostWhat You GetMeta/Instagram Support Ticket-20Recovery steps + unlock Recovery MenuCyber Cell Quick Report-25Domain analysis + attack typeCID Identity Check-30Deep profile investigationInterpol OSINT Snapshot-40Pattern analysis + scam network info
Tech Wiki Costs
ActionCostNotesLook up any term (first time)FREEEncouraged!Repeat lookup (same term)-1Remember what you learnedComplete vocab quiz+5 bonusAfter 3 lookups

🔓 STARTER CLUES (Free to View)
Starter Clue 1: Victim Summary
👤 Victim Profile
Name: Rashid (Student Entrepreneur)
Account: @rashid.snaps
Followers: 8,234
Account Type: Creator (fashion/lifestyle)

Problem Report:
"I got logged out suddenly. Now when I try to log in, 
it says my password is wrong. My followers are saying 
my account is sending them weird links!"

Reported: 7:30 PM, January 20, 2026
Unlocks: Nothing (background info only)

Starter Clue 2: Last 30 Minutes Timeline (Partial)
📅 TIMELINE (Some events hidden)

7:18 PM — Rashid receives a DM (sender: [BLURRED])
[MISSING EVENT 1] 🔒
7:21 PM — Login alert: "New device logged in"
[MISSING EVENT 2] 🔒
7:23 PM — @rashid.snaps posts story: "🎁 Free giveaway! 
          Click here for gift card"
7:24 PM — Multiple followers DM: "Bro is this you?"
7:25 PM — Account starts sending DMs to followers
7:30 PM — Rashid realizes he's locked out
What's Missing:

Missing Event 1: Password reset activity
Missing Event 2: Email change attempt

Cost to unlock: -5 credits (fills missing events)

Starter Clue 3: Screenshot of Suspicious DM
📱 DM Screenshot (PARTIAL)

From: [SENDER NAME BLURRED] ✓
Sent: 7:18 PM

"⚠️ ACTION REQUIRED

Your account has been flagged for violating 
community guidelines. You have 30 minutes to 
verify your identity or your account will be 
permanently disabled.

Click here to confirm: [LINK BLURRED] 🔒"

[Rashid's response: "Oh no! 😰"]
Investigations Available:

Action A1: View sender profile (-5 credits) → Unlocks LC1
Action A2: Reveal full link preview (-8 credits) → Unlocks LC2


Starter Clue 4: Security Email Screenshot (Partial)
📧 Email from Instagram Security

Subject: "New login to your account"
From: security@mail.instagram.com
Received: 7:21 PM

───────────────────────────────
We noticed a new login to your account:

Device: Chrome on Windows
Location: [CITY BLURRED] 🔒, India
Time: 7:21 PM IST

Wasn't you? [Secure Your Account]
───────────────────────────────
Investigation Available:

Action B1: View full login details (-5 credits) → Unlocks LC5


Starter Clue 5: Follower Complaint
💬 Message from @priya_designs (Follower)

"Hey Rashid! Your account just sent me a DM 
saying I won a free gift card and to click a 
link. That's not you right? The message looks 
super sketchy 😬"

Sent: 7:26 PM
Clue Type: 🟡 Supporting Evidence
Points to: Account was compromised and used for scam spreading

🔐 LOCKED CLUES (Investigation Tree)
LC1: Full DM Sender Profile
How to Unlock: Investigate Starter Clue 3 → "Check sender profile" (-5 credits)
📱 Sender Profile Analysis

Username: @meta_support.verify_center
Display Name: "Meta Verified Team ✓"
Bio: "Official Instagram Help Center | Account 
      Verification & Support"

Account Created: 2 weeks ago (January 6, 2026)
Followers: 32
Following: 0
Posts: 0
Profile Picture: Meta logo (low quality)

🚩 Red Flags:
- Very new account
- No posts
- Few followers for "official" account
- Fake verification badge in display name
Clue Strength: 🟡 Supporting Evidence
Points to: Suspect A (Fake Meta Support)
💡 Tech Wiki Triggered: "Verification Badge [?]"

LC2: Full Phishing Link
How to Unlock: Investigate Starter Clue 3 → "Reveal link preview" (-8 credits)
🔗 Link Analysis

Full URL: 
http://instagram-appeal-center.com/verify/account

🚩 WARNING SIGNS:
❌ Uses HTTP (not secure HTTPS)
❌ Domain is NOT instagram.com
❌ Extra words: "appeal-center" (real Instagram 
   never uses hyphens in main domain)
❌ Suspicious path: /verify/account

Real Instagram domains:
✅ instagram.com
✅ help.instagram.com
✅ about.instagram.com

Page Preview:
[Shows fake Instagram login page]
"Enter your username and password to verify..."
Clue Strength: 🔴 STRONG PROOF
Points to: Suspect A (Fake Meta Support - Phishing)
💡 Tech Wiki Triggered: "Phishing [?]", "Domain [?]", "HTTPS [?]"

LC3: Victim Confession (Did They Click?)
How to Unlock: Ask victim in Victim Chat: "Did you click any link you got in DM?" (-4 credits)
💬 Rashid's Response:

"Yeah... I clicked it because I got scared. The 
message said my account would be disabled! 😰

The page looked exactly like Instagram's real 
login page. It had the logo and everything. 

I entered my username and password to 'verify' 
my identity. Right after that, I got logged out."
Clue Strength: 🔴 STRONG PROOF
Points to: Suspect A (Victim entered credentials on phishing site)
💡 Learning Moment: This is the smoking gun! Victim gave password directly to attacker.

LC4: OTP/Code Evidence
How to Unlock: Ask victim: "Did anyone ask you for a code?" OR "Did you get any SMS/email code?" (-4 credits)
💬 Rashid's Response:

"I got a text message with a 6-digit code from 
Instagram right after I entered my password.

SMS: 'Your Instagram verification code is: 482916'

But I didn't send it to anyone. The page didn't 
even ask for it - it just asked for my username 
and password."
Clue Strength: 🟡 Supporting Evidence (Rules out Suspect B)
Analysis: Code was generated but NOT shared with attacker. This means it wasn't an OTP scam.

LC5: Full Login Activity
How to Unlock: Investigate Starter Clue 4 → "View full details" (-5 credits)
📊 Complete Login Activity Log

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
Two unknown devices logged in within 1 minute 
of each other, right after the phishing DM!
Clue Strength: 🔴 STRONG PROOF (Shows timing of attack)
Points to: Suspect A (Timeline matches phishing link click)
💡 Tech Wiki Triggered: "Session [?]", "IP Address [?]"

LC6: Password Reset Log
How to Unlock: Investigate Starter Clue 2 → "Fill missing events" (-5 credits)
📧 COMPLETE TIMELINE (Missing Events Revealed)

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
Clue Strength: 🟡 Supporting Evidence
Shows: Attacker moved FAST - changed password within 2 minutes

LC7: Email Change Notification
How to Unlock: Run "Check account changes" (-8 credits)
📧 Account Security Alert

Subject: "Your email address was changed"
From: security@mail.instagram.com
Received: 7:22 PM

───────────────────────────────
Your Instagram email was changed from:
rashid.student@gmail.com

To:
recovery_verify2026@protonmail.com

If you didn't make this change, secure your 
account immediately.
───────────────────────────────

🚩 CRITICAL: Attacker tried to lock Rashid out 
permanently by changing recovery email!
Clue Strength: 🔴 STRONG PROOF (Attack sophistication)
Learning Point: This is why you must secure email FIRST during recovery

LC8: Connected Apps List
How to Unlock: Run "Check connected third-party apps" (-8 credits)
🔌 Third-Party Apps Connected

✅ Canva (Photo editing)
   Connected: 3 months ago
   Permissions: Post to feed
   Status: SAFE

✅ Later (Scheduling tool)
   Connected: 1 month ago
   Permissions: Post stories, view insights
   Status: SAFE

❌ NO SUSPICIOUS APPS FOUND

Analysis: Account wasn't compromised through 
a malicious third-party app.
Clue Strength: ⚪ Inconclusive (Rules out app-based attack)
Helps eliminate: Suspect C (if they involved malicious apps)

LC9: Scam Story Screenshot
How to Unlock: Automatically unlocked after Timeline investigation
📱 Story Posted by Attacker (7:23 PM)

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
Clue Strength: 🟡 Supporting Evidence
Shows: Classic phishing tactic - use compromised account to spread scam

LC10: Friend Impersonation Chat Evidence
How to Unlock: Ask victim: "Did any friend message you asking for codes?" (-4 credits)
💬 Rashid's Response:

"No, nobody I know messaged me. The only weird 
message I got was from that Meta Support account.

My friends DID message me AFTER my account got 
hacked, asking if the giveaway story was real."
Clue Strength: ⚪ Rules Out Suspect B
Analysis: No friend impersonation occurred

LC11: Brand Collaboration Email
How to Unlock: Ask victim: "Did you get any brand collaboration offers recently?" (-4 credits)
💬 Rashid's Response:

"I did get some collaboration offers last week, 
but those were from real brands on Instagram. 
They wanted me to promote their clothes.

I didn't click any email links or download 
contracts. Everything was through Instagram DMs 
and their official websites."

📧 Email Inbox Check (Last 7 Days):
✅ Nike India (verified sender)
✅ Myntra (verified sender)  
❌ No suspicious collaboration emails
Clue Strength: ⚪ Rules Out Suspect C
Analysis: No malicious brand scam involved

LC12: Password Reuse Confession
How to Unlock: Ask victim: "Do you use the same password on different sites?" (-4 credits)
💬 Rashid's Response:

"Um... yeah, I use the same password for 
Instagram, Gmail, and a few gaming sites. 
I know I shouldn't, but it's easier to remember 😅

But I don't think any of those sites got hacked 
recently... at least I didn't get any emails 
about it."

Optional Investigation: Data Breach Check (-10)
└─> "Your email found in 2023 gaming site breach.
    However, attack timing doesn't match - you 
    clicked a phishing link JUST BEFORE the 
    takeover happened."
Clue Strength: 🟡 Misleading Evidence (Red Herring)
Analysis: While password reuse is risky, the phishing link click timing proves Suspect A is the real cause.

💬 VICTIM CHAT (Interactive Questions)
Each question costs -4 credits.
Available Questions:
#QuestionUnlocksSignificanceQ1"Did you click any link you got in DM?"LC3🔴 CriticalQ2"Did anyone ask you for a code or OTP?"LC4🟡 Rules out Suspect BQ3"Did you get any SMS/email code from Instagram?"LC4🟡 SupportingQ4"Do you reuse passwords on different sites?"LC12🟡 Red HerringQ5"Did you recently accept any brand collaboration offers?"LC11🟡 Rules out Suspect CQ6"Did any friend message you asking for help or codes?"LC10🟡 Rules out Suspect BQ7"When did you first notice something was wrong?"Timeline details⚪ Context
Chat Interface:
┌─────────────────────────────────────┐
│ 💬 Chat with Rashid                 │
├─────────────────────────────────────┤
│                                     │
│ Choose your question: (-4 credits)  │
│                                     │
│ [Q1] Did you click any link?        │
│ [Q2] Did anyone ask for a code?     │
│ [Q3] Did you get an SMS code?       │
│ [Q4] Do you reuse passwords?        │
│                                     │
│ 💡 Tip: Ask strategic questions!    │
│    Each answer costs credits.       │
└─────────────────────────────────────┘

🌐 EXTERNAL SUPPORT (Paid Services)
Service 1: Meta/Instagram Support Ticket (-20 credits)
🎫 Instagram Official Support Response

Thank you for reporting this issue. Based on 
your description, your account was compromised 
through credential theft (phishing).

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

✅ Unlocks: Recovery Action Menu
What You Get:

Recovery roadmap (doesn't reveal suspect)
Unlocks Recovery Phase actions
Professional guidance

Doesn't Give: Identity of attacker or specific evidence

Service 2: Cyber Cell Quick Report (-25 credits)
🚨 Cyber Crime Cell - Quick Analysis Report

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
Contact: cybercell.kerala@gov.in
What You Get:

Domain verification (strong evidence for Suspect A)
Attack type confirmation
Pattern matching

Clue Strength: 🔴 STRONG PROOF for Suspect A

Service 3: CID Identity Check (-30 credits)
🔍 CID (Crime Investigation Dept) - Profile Investigation

SUBJECT: @meta_support.verify_center

DEEP PROFILE ANALYSIS:
──────────────────────────────────────
Account Creation Timeline:
Created: January 6, 2026
Original Username: @insta_help_2026
Changed to: @meta_help_verify (Jan 8)
Changed to: @meta_support.verify_center (Jan 10)

Profile Picture History:
- Generic Meta logo (downloaded from Google Images)
- Image matches 6 other known scam accounts
- No original content

Activity Pattern:
- Sends ~200 DMs per day
- Messages contain identical phishing links
- Targets accounts with 5K-15K followers
- 87% of targeted accounts are students/young creators

Geographic Trace:
- Messages sent via VPN (hides real location)
- IP addresses rotate (India, Bangladesh, Nigeria)
- Uses multiple devices to avoid detection

Connected Accounts:
Part of network of 12 similar fake support accounts:
@instagram_verify_help
@meta_security_team
@insta_official_verify
... and 9 more

CONCLUSION:
Professional scam operation using fake Meta 
support accounts to phish credentials.
──────────────────────────────────────

Lead Investigator: DCP Rajesh Kumar
Contact: cid.cybercrime@police.kerala.gov.in
What You Get:

Definitive proof account is fake
Network connections
Professional scam operation details

Clue Strength: 🔴 EXTREMELY STRONG PROOF for Suspect A

Service 4: Interpol OSINT Snapshot (-40 credits)
🌍 INTERPOL - Open Source Intelligence Report

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
What You Get:

Global context and patterns
Network scale understanding
Professional threat intelligence
"Wow factor" for students (real-world connection)

Clue Strength: 🔴 ULTIMATE CONFIRMATION + Educational Value
Cost Justification: Premium intel, teaches that cybercrime is international

🕵️ SUSPECT BOARD & DEDUCTION SYSTEM
Suspect Details (Full Profiles)
SUSPECT A: Fake Meta Support (Phishing) ✅ CORRECT
🎭 SUSPECT A: Fake Meta Support

ATTACK METHOD:
Creates fake Instagram support accounts that 
impersonate official Meta security team. Sends 
urgent "violation" warnings with phishing links.

HOW IT WORKS:
1. Victim receives scary DM about account violation
2. Phishing link leads to fake Instagram login page
3. Victim enters username + password
4. Attacker logs in immediately and changes password
5. Uses compromised account to spread scams

EVIDENCE NEEDED TO PROVE:
🔴 Fake support account profile (LC1)
🔴 Phishing domain link (LC2)  
🔴 Victim entered credentials on fake page (LC3)
🟡 Login timing matches DM timeline (LC5)

CLUE KEYWORDS:
"Phishing", "Fake domain", "Meta support", "Urgent warning"

SUSPECT B: Friend Impersonator (OTP Scam)
🎭 SUSPECT B: Friend Impersonator

ATTACK METHOD:
Hacker compromises a friend's account, then 
messages the victim pretending to be in trouble. 
Tricks victim into sharing OTP/verification codes.

HOW IT WORKS:
1. Attacker controls friend's account
2. Messages victim: "Hey! Can you help? Send me 
   the code Instagram just sent you"
3. Victim receives real Instagram 2FA code
4. Victim shares code thinking they're helping friend
5. Attacker uses code to bypass 2FA and login

EVIDENCE NEEDED TO PROVE:
🔴 Friend messaged asking for code (LC10)
🔴 Victim shared OTP via chat (LC4)
🟡 Instagram sent verification code (LC4)

CLUE KEYWORDS:
"OTP", "Friend", "Verification code", "Help me"

SUSPECT C: Brand Collaboration (Malicious Contract)
🎭 SUSPECT C: Brand Collaboration Scam

ATTACK METHOD:
Fake brand account offers paid collaboration. 
Sends "contract" file or link that contains 
malware or leads to credential theft.

HOW IT WORKS:
1. Victim receives collaboration offer from "brand"
2. Asked to "sign contract" via link or download
3. Link leads to phishing page OR file contains malware
4. Credentials stolen or device compromised
5. Attacker gains account access

EVIDENCE NEEDED TO PROVE:
🔴 Brand collaboration email/DM (LC11)
🔴 Malicious file or link in contract
🟡 Victim downloaded or clicked collab material

CLUE KEYWORDS:
"Collaboration", "Contract", "Brand partnership", "Sponsorship"

SUSPECT D: Password Leak / Reuse (Silent Login)
🎭 SUSPECT D: Password Reuse Attack

ATTACK METHOD:
Victim uses same password on Instagram and other 
sites. When another site gets hacked, attackers 
try those leaked passwords on popular platforms.

HOW IT WORKS:
1. Gaming site / forum gets hacked in 2023
2. Leaked database contains emails + passwords
3. Hacker tries those passwords on Instagram
4. If victim reused password, attacker logs in
5. No phishing needed - direct login

EVIDENCE NEEDED TO PROVE:
🔴 Victim admits password reuse (LC12)
🔴 Data breach notification for other sites
🟡 No phishing link clicked (absence of LC2/LC3)
🟡 Login appears "normal" without suspicious DMs

CLUE KEYWORDS:
"Password reuse", "Data breach", "Same password", "Multiple sites"

Accusation System
Cost: -10 credits to accuse
Penalty for wrong guess: -15 credits additional
Requirements to Accuse:
Must have EITHER:

✅ 2 Strong Proof clues (🔴)
✅ 1 Strong Proof + 2 Supporting clues (🟡)

Accusation Interface:
┌─────────────────────────────────────────┐
│ 🎯 READY TO ACCUSE?                     │
├─────────────────────────────────────────┤
│ Review your evidence:                   │
│                                         │
│ 🔴 Strong Proof Found: 2                │
│ 🟡 Supporting Evidence: 4               │
│ ⚪ Inconclusive Clues: 1                │
│                                         │
│ ✅ Minimum evidence threshold met!      │
│                                         │
│ Choose your suspect:                    │
│ [ ] Suspect A - Fake Meta Support       │
│ [ ] Suspect B - Friend Impersonator     │
│ [ ] Suspect C - Brand Collaboration     │
│ [ ] Suspect D - Password Reuse          │
│                                         │
│ ⚠️ Wrong accusation: -15 credit penalty │
│ Cost to accuse: -10 credits             │
│                                         │
│ [ACCUSE] [Review Evidence] [Cancel]     │
└─────────────────────────────────────────┘

Wrong Accusation Feedback
If Accuse Suspect B (Friend OTP):
❌ INCORRECT ACCUSATION

Your analysis: "Friend impersonation OTP scam"

Why this is wrong:
───────────────────────────────────────
✗ No evidence of friend messaging Rashid
✗ Victim never shared any OTP/verification code
✗ Timeline shows phishing link was clicked instead

What actually happened:
Rashid clicked a phishing link and entered his 
password directly on a fake page. No OTP scam 
occurred.

Penalty: -15 credits
Hint Unlocked: Review the DM link more carefully

[Continue Investigation]

If Accuse Suspect C (Brand Collab):
❌ INCORRECT ACCUSATION

Your analysis: "Malicious brand collaboration"

Why this is wrong:
───────────────────────────────────────
✗ No suspicious collaboration emails found
✗ Rashid didn't download any contracts
✗ All brand communications were legitimate

What actually happened:
Attack came through a fake Meta support DM, 
not a brand collaboration.

Penalty: -15 credits
Hint Unlocked: Check victim's email inbox evidence

[Continue Investigation]

❌ INCORRECT ACCUSATION

Your analysis: "Password leaked from another site"

Why this is wrong:
───────────────────────────────────────
✗ Timing doesn't match (attack happened RIGHT 
  AFTER clicking phishing link)
✗ Victim clicked and entered credentials on 
  a fake site
✗ While password reuse IS risky, it wasn't 
  the attack vector here

What actually happened:
The phishing link Rashid clicked is the direct cause. Password reuse is a vulnerability, but not how the hack occurred.
Penalty: -15 credits
Hint Unlocked: Review the timeline + link evidence
[Continue Investigation]

---

### **Correct Accusation (Suspect A):**
✅ CORRECT! Case Solved!
Your analysis: "Fake Meta Support phishing attack"
Evidence you found:
───────────────────────────────────────
🔴 Phishing domain: instagram-appeal-center.com
🔴 Victim entered password on fake login page
🔴 Fake support account @meta_support.verify_center
🟡 Login timing matches DM timeline exactly
🟡 Account used to spread scam posts
CASE SUMMARY:
Rashid received a DM from a fake Meta support
account warning his account would be disabled.
He clicked the phishing link and entered his
credentials on a fake Instagram login page.
The attacker logged in within minutes, changed
his password, and used his account to scam his
followers.
Bonus: +10 credits
Credits remaining: [X]
🎯 Now you must RECOVER the account!
[Proceed to Recovery Phase]

---

## 🛠️ **RECOVERY & CONTAINMENT PHASE**

**Unlocked After:** Correct accusation OR purchasing Meta Support Ticket

### **Recovery Action Menu**
🔧 ACCOUNT RECOVERY ACTIONS
Choose actions to secure Rashid's account.
Order matters! Wrong sequence = penalties.
Available Actions:
──────────────────────────────────────────
[ ] 1. Secure email account (-8 credits)
[ ] 2. Reset Instagram password (-8 credits)
[ ] 3. Enable 2FA (Authenticator) (-8 credits)
[ ] 4. Revoke unknown sessions (-8 credits)
[ ] 5. Remove suspicious connected apps (-8 credits)
[ ] 6. Post warning story to followers (-5 credits)
[ ] 7. Report fake Meta support account (-5 credits)
💡 Best Practice Order: 1 → 2 → 4 → 3 → 5 → 6 → 7
[Execute Selected Actions]

---

### **Recovery Action Results**

#### **✅ CORRECT ORDER (1 → 2 → 4 → 3 → 5 → 6 → 7)**

**Step 1: Secure Email Account (-8)**
✅ Email Account Secured
Actions taken:

Changed email password
Enabled 2FA on Gmail
Reviewed recent email activity
Removed attacker's recovery email

Result: Attacker can no longer intercept
password reset emails or change account settings!
[Next: Reset Instagram Password]

**Step 2: Reset Instagram Password (-8)**
✅ Password Reset Successful
Actions taken:

Used "Forgot Password" via secured email
Created strong password: R@sh1d#Secure2026!
Password follows best practices:
✓ 16+ characters
✓ Mix of letters, numbers, symbols
✓ Not reused from other sites

Result: Attacker's access method (old password)
is now invalid!
[Next: Revoke Unknown Sessions]

**Step 3: Revoke Unknown Sessions (-8)**
✅ Suspicious Sessions Removed
Sessions revoked:
❌ Chrome on Windows (Indore) - LOGGED OUT
❌ iPhone (Mumbai) - LOGGED OUT
Active sessions remaining:
✅ Android (Rashid's phone) - ACTIVE
Result: Attacker is kicked out completely!
Even if they had the old password, they're
logged out now.
[Next: Enable 2FA]

**Step 4: Enable 2FA (-8)**
✅ Two-Factor Authentication Enabled
Setup completed:

Authenticator app: Google Authenticator
Backup codes saved securely (printed)
SMS backup: +91-XXXX-XX1234

How it works now:

Enter password (something you know)
Enter 6-digit code from app (something you have)

Result: Even if password is stolen again,
attacker can't login without Rashid's phone!
💡 This prevents future phishing attacks!
[Next: Check Connected Apps]

**Step 5: Remove Suspicious Apps (-8)**
✅ Connected Apps Reviewed
Apps checked:
✅ Canva - SAFE (kept connected)
✅ Later - SAFE (kept connected)
❌ No suspicious apps found
Result: No malicious third-party apps had
access to the account.
[Next: Warn Followers]

**Step 6: Post Warning Story (-5)**
✅ Warning Story Posted
Story content:
╔═══════════════════════════════╗
║  ⚠️ ACCOUNT WAS HACKED        ║
║                               ║
║  Hey everyone! My account was ║
║  compromised earlier today.   ║
║                               ║
║  If you got a DM or saw a     ║
║  giveaway post from me,       ║
║  DO NOT CLICK ANY LINKS!      ║
║                               ║
║  It was a scam. I've secured  ║
║  my account now. Stay safe!   ║
║                               ║
║  Never click suspicious links ║
║  even from accounts you trust.║
╚═══════════════════════════════╝
Result: Followers are warned! Prevents them
from falling for the scam.
[Next: Report Fake Account]

**Step 7: Report Fake Account (-5)**
✅ Fake Account Reported
Report submitted:
Account: @meta_support.verify_center
Reason: Impersonation + Phishing
Evidence: Screenshots of fake DM + phishing link
Instagram response:
"Thank you for reporting. We've reviewed the
account and removed it for violating our
Community Guidelines on impersonation."
Result: Fake account is BANNED! Protects
other potential victims.
🎉 ACCOUNT FULLY RECOVERED & SECURED!
[View Final Results]

---

### **❌ WRONG ORDER PENALTIES**

#### **If Reset Password BEFORE Securing Email:**
⚠️ SEQUENCE ERROR!
What went wrong:
You reset the Instagram password, but the
attacker still had access to Rashid's email!
What happened:

You requested password reset
Email sent to: rashid.student@gmail.com
Attacker (who controls email) saw the reset link
Attacker clicked "This wasn't me" and blocked reset
Attacker changed password again using email access!

Consequence: -10 credit penalty
Status: Password reset failed. Try again after
securing email first.
💡 Lesson: Always secure EMAIL before resetting
passwords. Email is the master key!
[Return to Recovery Menu]

---

#### **If Enable 2FA BEFORE Revoking Sessions:**
⚠️ SUBOPTIMAL SEQUENCE
What happened:
You enabled 2FA, which is great! However, the
attacker's sessions were still active.
Impact:

Attacker stayed logged in (sessions remain valid)
They could still post/DM for 10 more minutes
2FA only affects NEW logins, not existing sessions

Result: Minor damage - attacker sent 5 more
scam DMs before automatic timeout
Penalty: -5 credits (small mistake)
Lesson: Revoke sessions BEFORE enabling 2FA for
immediate protection
[Continue]

---

## 📖 **TECH WIKI / GLOSSARY BOT**

**Access:** Always available via tab  
**Cost:** FREE (first lookup), -1 credit (repeat lookups)

### **🔴 CRITICAL TERMS (Always Highlighted)**

---

#### **Phishing**
📖 PHISHING
What it is:
A scam where attackers create fake websites or
messages that look real to trick you into giving
them your password, credit card info, or other
personal details.
Real-world example:
You get an email saying "Your Netflix account
will be suspended! Click here to update payment."
The link looks like netflix.com but is actually
netfl1x-secure.com (fake!). If you enter your
password, hackers steal it.
In this game:
Rashid got a DM saying his Instagram would be
disabled. He clicked a link to "verify" his
identity, but the page was fake and stole his
password.
How to spot it:
✓ Check the EXACT domain name (instagram.com vs
instagram-appeal.com)
✓ Look for HTTPS (🔒) in the address bar
✓ Real companies never send urgent "act now or
lose account" threats
✓ Hover over links before clicking (shows real URL)
💡 Pro tip:
When in doubt, go to the official website
manually (type instagram.com yourself) instead
of clicking links in messages.
Related terms: Domain, Social Engineering,
Credential Harvesting

---

#### **2FA (Two-Factor Authentication)**
📖 TWO-FACTOR AUTHENTICATION (2FA)
What it is:
A second security step after your password.
Usually a 6-digit code from your phone or an app.
How it works:

You enter your password (something you KNOW)
You enter a code from your phone (something you HAVE)
Only then you can log in

Real-world example:
Your bank account uses 2FA. Even if someone steals
your password, they can't log in without the code
sent to YOUR phone.
In this game:
If Rashid had 2FA enabled BEFORE the attack, the
hacker couldn't have logged in even after stealing
his password!
Types of 2FA:
📱 Authenticator App (BEST) - Google Authenticator,
Authy
💬 SMS Code (OKAY) - Text message with code
📧 Email Code (WEAK) - If email is compromised,
useless
Why it matters:
🛡️ Blocks 99% of automated hacking attempts
🛡️ Protects even if your password is leaked
🛡️ Free and takes 2 minutes to set up
💡 Pro tip:
Use authenticator apps instead of SMS. Hackers can
steal SMS codes through "SIM swapping" attacks.
How to enable on Instagram:
Settings → Security → Two-Factor Authentication →
Get Started
Related terms: OTP, Authentication, MFA

---

#### **Session**
📖 SESSION
What it is:
A "session" is an active login to your account
from a specific device. Think of it like a
door that stays open after you log in.
Real-world example:
You log into Instagram on your phone Monday morning.
You stay logged in all week without entering your
password again. That's one session.
In this game:
When the hacker stole Rashid's password and logged
in from a Windows computer, they created a NEW
session. Even after Rashid changed his password,
that session stayed active!
Why this matters:
Changing your password doesn't automatically log
out hackers. They stay logged in through their
existing session until you manually revoke it.
How to check sessions:
Instagram: Settings → Security → Login Activity
Shows all devices currently logged into your account
What to do if you see unknown sessions:
❌ Click "Log Out" next to suspicious devices
❌ This is called "revoking sessions"
💡 Pro tip:
After changing your password, ALWAYS check and
revoke unknown sessions. Otherwise, hackers stay
logged in!
Related terms: Login Activity, Device Management,
Revoke Sessions

---

#### **Domain**
📖 DOMAIN
What it is:
A website's address. The "domain" is the main
part of the URL that identifies who owns the site.
Real examples:
✅ instagram.com (Real Instagram)
✅ facebook.com (Real Facebook)
✅ google.com (Real Google)
Fake examples:
❌ instagram-verify.com (Fake - extra word!)
❌ instgram.com (Fake - missing 'a'!)
❌ instagram.co (Fake - wrong ending!)
In this game:
The phishing link was:
❌ instagram-appeal-center.com
Real Instagram domains:
✅ instagram.com
✅ help.instagram.com
✅ about.instagram.com
How to spot fake domains:

Look for EXACT spelling
Check what comes AFTER the name

.com, .org, .gov are common
Random letters like .xyz, .tk are suspicious


Be suspicious of hyphens (instagram-help)
Check for HTTPS (🔒 padlock icon)

💡 Pro tip:
Hover your mouse over links before clicking.
The real URL appears at the bottom of your
browser. If it doesn't match what the text
says, it's a scam!
Example:
Text says: "Click here to verify Instagram"
Real URL: http://instagram-fake.xyz ← SCAM!
Related terms: URL, Phishing, HTTPS

---

#### **Revoke Sessions**
📖 REVOKE SESSIONS
What it is:
"Revoking" means cancelling or removing. When you
revoke a session, you force a device to log out
immediately.
Real-world example:
You logged into Instagram at a friend's house.
Later, you realize you forgot to log out. You can
go to "Login Activity" on your phone and click
"Log Out" next to your friend's computer. This
revokes that session.
In this game:
After stealing Rashid's password, the hacker
stayed logged in even when the password was
changed. Revoking their session KICKED THEM OUT
immediately.
Why it's critical:
✋ Changing password = locks the door
✋ Revoking sessions = kicks out people already inside
You need BOTH to fully secure your account!
How to revoke sessions:
Instagram:

Settings → Security → Login Activity
See all active devices
Click "Log Out" on unknown devices

What happens:

Device immediately loses access
They have to enter password again to log back in
If you changed password + enabled 2FA, they
can't get back in!

💡 Pro tip:
Do this AFTER changing your password, not before.
Otherwise they can just log back in with the old
password.
Related terms: Session, Login Activity, Logout

---

### **🟡 HELPFUL TERMS (Unlocked After First Case)**

---

#### **OTP (One-Time Password)**
📖 OTP (One-Time Password)
What it is:
A temporary code (usually 6 digits) that you can
only use once. It expires after a few minutes.
Examples:

482916 (Instagram verification code)
739281 (bank transaction code)
104729 (email verification code)

How it's used:
Apps send you OTP via SMS or email to verify it's
really you. You enter the code within 1-3 minutes.
In OTP scams:
Hacker pretends to be your friend in trouble:
"Hey! I'm locked out of my account. Can you send
me the code Instagram just sent you?"
If you share it, they use YOUR code to log into
YOUR account!
How to stay safe:
❌ NEVER share OTP codes with anyone
❌ Real companies never ask for your OTP
❌ Friends shouldn't ask for codes - they get their own
💡 Pro tip:
If someone asks for your OTP, it's ALWAYS a scam.
No exceptions.
Related terms: 2FA, Verification Code, SMS Code

---

#### **Social Engineering**
📖 SOCIAL ENGINEERING
What it is:
Psychological tricks that manipulate people into
giving up confidential information or doing things
that help attackers.
Basically: Hacking humans instead of computers.
Common tactics:
😱 Urgency - "Act in 30 minutes or lose account!"
😨 Fear - "You violated policy, account will be banned!"
🎁 Greed - "You won a free gift card!"
❤️ Trust - Pretending to be friend/official company
📜 Authority - Fake "Meta Support" or "Instagram Team"
Real-world examples:

Phone call: "This is your bank. Verify your
card number to stop fraud."
Email: "Your package couldn't be delivered.
Click to reschedule." (Fake link)
DM: "You won our giveaway! Claim prize here."

In this game:
The hacker used urgency ("30 minutes") + fear
("account will be disabled") + fake authority
("Meta Support") to pressure Rashid into clicking
without thinking.
How to defend:

Slow down - scammers rely on panic
Verify independently - call official number,
don't use links in message
Question authority - real companies don't
pressure you
Trust your gut - if it feels off, it probably is

💡 Pro tip:
Legitimate companies give you TIME to respond.
"Act now or lose everything!" is always a red flag.
Related terms: Phishing, Manipulation, Scam

---

#### **HTTPS vs HTTP**
📖 HTTPS vs HTTP
What they are:
Protocols (rules) for how websites send data.
The 'S' in HTTPS means "Secure."
🔒 HTTPS (Secure):

Data is encrypted (scrambled)
Shows padlock (🔒) icon in browser
Safe for entering passwords/credit cards
Example: https://instagram.com

🔓 HTTP (Not Secure):

Data sent in plain text (anyone can read it)
No padlock icon
NEVER enter passwords on HTTP sites
Example: http://instagram-fake.com

In this game:
The phishing link was:
❌ http://instagram-appeal-center.com
(No 'S' = not secure!)
Real Instagram always uses:
✅ https://instagram.com
(With 'S' = secure)
Visual check:
┌─────────────────────────────────┐
│ 🔒 https://instagram.com        │ ✅ SAFE
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ http://instagram-verify.com     │ ❌ UNSAFE
└─────────────────────────────────┘
Why it matters:
On HTTP sites, anyone on the same WiFi (coffee
shop, airport) can see what you type, including
passwords!
💡 Pro tip:
Many browsers now show "Not Secure" warning for
HTTP sites. Never ignore this warning!
Related terms: Encryption, SSL, TLS, Secure Connection

---

#### **Credential Harvesting**
📖 CREDENTIAL HARVESTING
What it is:
The process of collecting (harvesting) login
credentials (username + password) from many
people, usually through phishing.
How it works:

Attacker creates 100 fake login pages
Sends phishing links to 10,000 people
500 people fall for it and enter passwords
Attacker now has 500 username/password pairs

What happens next:

Try credentials on other sites (people reuse passwords)
Sell credentials on dark web (₹50-500 per account)
Use accounts to spread more scams
Steal money, personal info, or identities

In this game:
The fake Instagram login page was designed to
harvest credentials. Every person who entered
their password gave it directly to the hacker.
How to avoid being harvested:
✓ Check URL before entering password
✓ Use password manager (enters only on real sites)
✓ Enable 2FA (harvested password alone won't work)
✓ Use unique passwords per site
Scale of the problem:
Real harvesting campaigns can steal:

10,000+ credentials per day
From 50+ countries
Sold for ₹1-5 lakhs total

💡 Pro tip:
Think of credentials like crops in a field.
Scammers "plant" fake login pages and "harvest"
passwords. Don't be a crop!
Related terms: Phishing, Data Breach, Password Theft

---

### **⚪ ADVANCED TERMS (Optional Reading)**

---

#### **OSINT (Open Source Intelligence)**
📖 OSINT (Open Source Intelligence)
What it is:
Information gathered from publicly available
sources like websites, social media, news articles,
and public records.
Examples of OSINT:

Googling someone's name
Checking Instagram followers/posts
Reading company websites
Analyzing domain registration data
Searching Twitter for mentions

Who uses OSINT:
👮 Police - investigating crimes
🕵️ Cybersecurity - tracking hackers
📰 Journalists - researching stories
🏢 Companies - checking competitors
In this game:
Interpol's OSINT report gathered:

Public scam reports
Domain registration info
Pattern analysis across countries
Social media mentions of phishing links

Not OSINT (requires special access):
❌ Private messages
❌ Bank records
❌ Hacked data
❌ Classified information
💡 Pro tip:
Be careful what you share publicly! Scammers
use OSINT too. They check your posts to make
scams more believable.
Example:
You post: "Excited for my iPhone 15!"
Scammer sees it: Sends fake Apple email
"Your iPhone order needs verification..."
Related terms: Investigation, Intelligence, Research

---

#### **IP Address**
📖 IP ADDRESS
What it is:
Internet Protocol address - a unique number
assigned to every device connected to the internet.
Like a home address, but for computers.
Format:
Usually looks like: 192.168.1.1 or 49.36.214.101
What it reveals:

Approximate location (city/region, not exact address)
Internet service provider (Jio, Airtel, etc.)
Sometimes: company or organization

In this game:
Login activity showed:

Rashid's phone: IP from Thiruvananthapuram ✅
Hacker's device: IP from Indore ❌

This proved someone from another city logged in!
Limitations:
✗ IP doesn't show exact address
✗ Changes when you move locations
✗ Can be hidden with VPN
Can people track you with IP?
Not really. They can see city, but not your home.
Only police/ISP can connect IP to physical address.
💡 Pro tip:
If you see login from a location you've never
visited, it's a hacker!
Related terms: Network, VPN, Location, ISP

---

#### **VPN (Virtual Private Network)**
📖 VPN (Virtual Private Network)
What it is:
A tool that hides your real location and IP
address by routing your internet through a
different server.
How it works:

Your computer → VPN server in another country
VPN server → Website you want to visit
Website thinks you're in the VPN server's location

Uses:
🌍 Privacy - hide your location
🔒 Security - encrypt data on public WiFi
🌐 Access - watch content from other countries
🕵️ Anonymity - harder to track you online
How scammers use VPNs:
In this game, the hacker used VPN to hide their
real location. Login showed "Indore" but they
might actually be anywhere in the world!
Why this matters for investigation:
IP address alone can't catch hackers if they
use VPN. Need other evidence (like phishing
links, fake accounts).
Are VPNs legal?
✅ Yes, in India and most countries
✅ Used by companies, travelers, privacy advocates
⚠️ Using VPN to do illegal things is still illegal!
💡 Pro tip:
Use VPN on public WiFi (airports, cafés) to
protect your data from hackers on same network.
Related terms: IP Address, Encryption, Proxy, Anonymity

---

### **Glossary Features**

#### **1. Inline Tooltips (Just-in-Time Learning)**
Example in Evidence:
"The attacker revoked sessions [?] to stay logged in."
↑
Hover/Click
Tooltip appears:
┌──────────────────────────────────┐
│ 📖 Session                       │
│                                  │
│ An active login from a device.   │
│ Changing password doesn't log    │
│ them out - you must revoke!      │
│                                  │
│ [Learn More] (opens full entry)  │
└──────────────────────────────────┘

---

#### **2. Glossary Tab (Full Reference)**
┌─────────────────────────────────────┐
│ 📖 TECH WIKI                        │
├─────────────────────────────────────┤
│ [Search terms...]                   │
│                                     │
│ 🔴 Critical Terms (Must Know)       │
│ • Phishing                          │
│ • 2FA / Two-Factor Authentication   │
│ • Session                           │
│ • Domain                            │
│ • Revoke Sessions                   │
│                                     │
│ 🟡 Helpful Terms                    │
│ • OTP (One-Time Password)           │
│ • Social Engineering                │
│ • HTTPS vs HTTP                     │
│ • Credential Harvesting             │
│                                     │
│ ⚪ Advanced (Optional)              │
│ • OSINT                             │
│ • IP Address                        │
│ • VPN                               │
│ • Metadata                          │
│                                     │
│ 📊 Your Progress: 3/5 critical      │
│    terms looked up                  │
└─────────────────────────────────────┘

---

#### **3. Learning Checkpoint Quiz**
After looking up 3 terms, trigger:
┌─────────────────────────────────────┐
│ 💡 QUICK KNOWLEDGE CHECK!           │
├─────────────────────────────────────┤
│ You've learned about:               │
│ ✓ Phishing                          │
│ ✓ Sessions                          │
│ ✓ 2FA                               │
│                                     │
│ Let's test your understanding:      │
│                                     │
│ Q: A hacker stole your password     │
│    and logged in. What should you   │
│    do first to kick them out?       │
│                                     │
│ A) Change your password only        │
│ B) Enable 2FA only                  │
│ C) Revoke their session + change    │
│    password                         │
│ D) Report the hacker                │
│                                     │
│ [Select Answer]                     │
│                                     │
│ Get it right: +5 credits bonus!     │
│ Get it wrong: See explanation       │
│    (no penalty)                     │
└─────────────────────────────────────┘

**If Wrong Answer:**
❌ Not quite!
Changing password alone doesn't log them out
from their existing session. They'd stay logged
in until the session expires (could be days!).
Correct answer: C) Revoke their session + change password
Here's why:

Revoke session = kicks them out NOW
Change password = prevents them logging back in
Then enable 2FA = prevents future attacks

Remember: Sessions stay active even after password
changes!
[Continue] (no credit penalty, just learning)

**If Right Answer:**
✅ Correct! +5 Credits
You understand that sessions must be revoked
manually! This is one of the most commonly
missed steps when recovering hacked accounts.
Your learning is paying off! 🎓
Credits: [X+5]
[Continue Investigation]

---

#### **4. Glossary Search Feature**
┌─────────────────────────────────────┐
│ 📖 Search Tech Wiki                 │
├─────────────────────────────────────┤
│ [Type any cybersecurity term...] 🔍 │
│                                     │
│ Suggestions:                        │
│ • What is phishing?                 │
│ • How does 2FA work?                │
│ • What is a session?                │
│ • Difference between HTTP and HTTPS │
│                                     │
│ Popular this week:                  │
│ 1. Phishing (124 lookups)           │
│ 2. 2FA (98 lookups)                 │
│ 3. Session (87 lookups)             │
└─────────────────────────────────────┘

---

#### **5. Teacher Analytics Dashboard**
┌───────────────────────────────────────────────┐
│ 📊 CLASSROOM GLOSSARY USAGE REPORT            │
├───────────────────────────────────────────────┤
│ Class: Grade 11-B Cyber Awareness             │
│ Students: 32                                  │
│ Date Range: Jan 15-21, 2026                   │
│                                               │
│ MOST LOOKED-UP TERMS:                         │
│ 1. Phishing ████████████████ (28/32 students) │
│ 2. 2FA      ████████████    (24/32 students)  │
│ 3. Session  ██████████      (20/32 students)  │
│ 4. OTP      ████            (8/32 students)   │
│                                               │
│ STUDENTS WHO NEVER USED GLOSSARY:             │
│ • Arjun M. (may need help)                    │
│ • Priya S. (overconfident?)                   │
│ • Rohan K. (struggling with case)             │
│                                               │
│ QUIZ PERFORMANCE:                             │
│ • Average score: 2.4/3                        │
│ • Perfect scores: 18 students                 │
│ • Need remedial lesson: 5 students            │
│                                               │
│ KNOWLEDGE GAPS DETECTED:                      │
│ ⚠️ Only 8 students looked up "session revoke" │
│    → Suggest covering this in class           │
│                                               │
│ CORRELATION:                                  │
│ Students who used glossary 5+ times:          │
│ • 85% solved case correctly                   │
│ Students who never used glossary:             │
│ • 33% solved case correctly                   │
└───────────────────────────────────────────────┘

---

## 🏆 **SCORING & ENDINGS**

### **Ending A: Elite Investigator** ⭐⭐⭐
Requirements:
✅ Accused correct suspect (Suspect A)
✅ Recovery steps in perfect order (1→2→4→3→5→6→7)
✅ Credits remaining: 50+

┌─────────────────────────────────────────────┐
│ 🏆 ELITE INVESTIGATOR                       │
├─────────────────────────────────────────────┤
│                                             │
│     ⭐⭐⭐ PERFECT CASE SOLVE! ⭐⭐⭐          │
│                                             │
│ Case solved with minimal resource use and   │
│ maximum efficiency. You identified the      │
│ phishing attack, recovered the account,     │
│ and prevented further spread of the scam.   │
│                                             │
│ FINAL STATS:                                │
│ ├─ Credits Used: 50/100                     │
│ ├─ Investigation Accuracy: 100%             │
│ ├─ Recovery Time: Optimal                   │
│ └─ Followers Protected: 8,234               │
│                                             │
│ 🎓 What You Mastered:                       │
│ ✓ Phishing link detection                   │
│ ✓ Domain verification                       │
│ ✓ Timeline analysis                         │
│ ✓ Proper recovery sequence                  │
│ ✓ Session management                        │
│ ✓ 2FA implementation                        │
│                                             │
│ 💬 Rashid says:                             │
│ "You're amazing! Not only did you figure    │
│ out what happened, but you secured my       │
│ account so well that I feel totally safe    │
│ now. Thank you! 🙏"                         │
│                                             │
│ 🌟 Achievement Unlocked:                    │
│    "Master Detective"                       │
│                                             │
│ [Play Next Case] [Share Score] [Review]     │
└─────────────────────────────────────────────┘

---

### **Ending B: Good Investigator** ⭐⭐
Requirements:
✅ Accused correct suspect
✅ Completed recovery (some mistakes in order)
✅ Credits remaining: 20-49
┌─────────────────────────────────────────────┐
│ 🎖️ GOOD INVESTIGATOR                        │
├─────────────────────────────────────────────┤
│                                             │
│        ⭐⭐ CASE SOLVED! ⭐⭐                 │
│                                             │
│ You identified the phishing attack and      │
│ successfully recovered Rashid's account.    │
│ Some resources were wasted during the       │
│ investigation, but damage was controlled.   │
│                                             │
│ FINAL STATS:                                │
│ ├─ Credits Used: 73/100                     │
│ ├─ Investigation Accuracy: 85%              │
│ ├─ Recovery Time: Good                      │
│ └─ Minor issues during recovery             │
│                                             │
│ 🎓 What You Learned:                        │
│ ✓ Phishing detection                        │
│ ✓ Evidence gathering                        │
│ ✓ Account recovery basics                   │
│ ⚠️ Recovery sequence could improve           │
│                                             │
│ 💬 Rashid says:                             │
│ "Thanks for helping me get my account back! │
│ It took a bit longer than expected, but we  │
│ got there. I'll be more careful next time." │
│                                             │
│ 💡 Room for Improvement:                    │
│ • Secure email BEFORE changing password     │
│ • Revoke sessions immediately after reset   │
│ • Use fewer external support services       │
│                                             │
│ 🌟 Achievement Unlocked:                    │
│    "Problem Solver"                         │
│                                             │
│ [Try Again] [Play Next Case] [Review]       │
└─────────────────────────────────────────────┘

---

### **Ending C: Costly Save** ⭐
Requirements:
✅ Accused correct suspect (eventually)
✅ Completed recovery
✅ Credits remaining: 0-19
┌─────────────────────────────────────────────┐
│ 💰 COSTLY SAVE                              │
├─────────────────────────────────────────────┤
│                                             │
│           ⭐ CASE SOLVED ⭐                  │
│                                             │
│ You recovered Rashid's account, but it took │
│ heavy reliance on external support and      │
│ multiple wrong turns cost valuable credits. │
│                                             │
│ FINAL STATS:                                │
│ ├─ Credits Used: 92/100                     │
│ ├─ Investigation Accuracy: 60%              │
│ ├─ Recovery Time: Slow                      │
│ ├─ Wrong accusations: 1-2                   │
│ └─ Heavy support dependency                 │
│                                             │
│ 🎓 What Happened:                           │
│ ✓ Eventually identified phishing attack     │
│ ⚠️ Multiple wrong paths explored             │
│ ⚠️ Relied heavily on paid services           │
│ ⚠️ Recovery sequence had mistakes            │
│                                             │
│ 💬 Rashid says:                             │
│ "I got my account back, which is great! But │
│ it was stressful waiting while you figured  │
│ things out. Maybe next time it'll be faster?"│
│                                             │
│ 💡 What To Practice:                        │
│ • Read starter clues more carefully         │
│ • Focus on evidence before guessing         │
│ • Learn recovery sequence (email → password │
│   → sessions → 2FA)                         │
│ • Use glossary to understand terms          │
│                                             │
│ 📚 Recommended:                             │
│ Replay this case to improve your score!     │
│                                             │
│ [Retry Case] [View Solution] [Next Case]    │
└─────────────────────────────────────────────┘

---

### **Ending D: Case Failed** ❌
Requirements:
❌ Never accused correct suspect
OR
❌ Credits dropped below 0
OR
❌ Failed to revoke sessions (attacker regained access)
┌─────────────────────────────────────────────┐
│ ❌ CASE FAILED                              │
├─────────────────────────────────────────────┤
│                                             │
│        Investigation Incomplete              │
│                                             │
│ The account was not fully secured. Either   │
│ you ran out of investigation credits, made  │
│ too many wrong accusations, or failed to    │
│ properly revoke the attacker's access.      │
│                                             │
│ WHAT WENT WRONG:                            │
│                                             │
│ [If credits ran out:]                       │
│ ├─ Credits remaining: -5                    │
│ ├─ Too many wrong guesses drained budget    │
│ └─ Investigation abandoned                  │
│                                             │
│ [If didn't revoke sessions:]                │
│ ├─ Attacker's session still active          │
│ ├─ They regained control after 2 hours      │
│ └─ Posted more scam content                 │
│                                             │
│ [If never found correct suspect:]           │
│ ├─ Wrong suspect accused multiple times     │
│ ├─ Real attacker (Suspect A) not identified │
│ └─ Rashid's account remains compromised     │
│                                             │
│ 💬 Rashid says:                             │
│ "I'm still locked out of my account, and my │
│ followers are still getting scam messages.  │
│ This is really bad... 😔"                   │
│                                             │
│ 🎓 Learning Opportunity:                    │
│ Don't worry! Cybersecurity investigations   │
│ are tough. Let's review what happened:      │
│                                             │
│ ✓ The correct suspect was: Suspect A       │
│ ✓ Key evidence you might have missed:      │
│    • Phishing link domain (LC2)             │
│    • Victim clicked and entered password    │
│      (LC3)                                  │
│    • Fake Meta support profile (LC1)        │
│                                             │
│ 💡 Tips for Next Time:                      │
│ • Start with FREE starter clues             │
│ • Use glossary to understand terms          │
│ • Ask victim strategic questions early      │
│ • Don't guess suspects without evidence     │
│ • Always check the domain of links!         │
│                                             │
│ [View Full Solution] [Retry Case] [Tutorial]│
└─────────────────────────────────────────────┘

---

## 📊 **OPTIMAL PATH WALKTHROUGH**
### **(For Students Who Get Stuck)**
🗺️ FASTEST SOLUTION PATH (80 Credits Used)
Step-by-step guide to solving the case efficiently:
PHASE 1: GATHER FREE EVIDENCE (0 credits)
──────────────────────────────────────────────

Read all 5 starter clues carefully
Notice keywords: "DM warning", "30 minutes",
"link", "login alert"
Hypothesis: Looks like phishing or password theft

Credits: 100/100
──────────────────────────────────────────────
PHASE 2: INVESTIGATE THE DM (13 credits)
──────────────────────────────────────────────
4. Starter Clue 3 → "Check sender profile" (-5)
└─ Unlocks LC1: Fake support account!

Starter Clue 3 → "Reveal link preview" (-8)
└─ Unlocks LC2: Phishing domain!

Key findings:

Domain is instagram-appeal-center.com (FAKE)
Sender is @meta_support.verify_center (2 weeks old)

Credits: 87/100
──────────────────────────────────────────────
PHASE 3: CONFIRM VICTIM ACTIONS (4 credits)
──────────────────────────────────────────────
6. Victim Chat → Q1: "Did you click any link?" (-4)
└─ Unlocks LC3: Victim entered password on
fake site!
SMOKING GUN: Victim gave password to phishing site.
Credits: 83/100
──────────────────────────────────────────────
PHASE 4: VERIFY TIMING (5 credits)
──────────────────────────────────────────────
7. Starter Clue 4 → "View full login details" (-5)
└─ Unlocks LC5: Two unknown devices logged in
right after 7:21 PM
Timeline matches: Click → Login within 2 minutes
Credits: 78/100
──────────────────────────────────────────────
PHASE 5: ACCUSE SUSPECT A (10 credits)
──────────────────────────────────────────────
8. Suspect Board → Accuse Suspect A (-10)
Evidence presented:
🔴 LC2: Phishing domain
🔴 LC3: Victim entered credentials
🟡 LC1: Fake support profile
🟡 LC5: Login timing
✅ CORRECT! +10 bonus
Credits: 78/100
──────────────────────────────────────────────
PHASE 6: RECOVERY ACTIONS (53 credits)
──────────────────────────────────────────────
9. Secure email account (-8)
10. Reset Instagram password (-8)
11. Revoke unknown sessions (-8)
12. Enable 2FA (-8)
13. Remove connected apps check (-8)
14. Post warning story (-5)
15. Report fake account (-5)
Total recovery cost: 50 credits
Credits: 28/100
──────────────────────────────────────────────
FINAL RESULT:
✅ Case solved correctly
✅ Account fully secured
✅ 28 credits remaining
🏆 Ending: B (Good Investigator)
To achieve Ending A (Elite):

Skip Step 7 (login details not critical)
Skip Step 13 (app check unnecessary if no evidence)
This saves 13 credits → 41 remaining
If 50+ credits remain, you get Elite rank!
──────────────────────────────────────────────


---

## 🎯 **WHAT STUDENTS LEARN**

### **Technical Skills**
1. ✅ How to identify phishing links by examining domains
2. ✅ Difference between real and fake official accounts
3. ✅ How to check login activity and revoke sessions
4. ✅ Importance of HTTPS vs HTTP
5. ✅ Proper account recovery sequence (email first!)
6. ✅ Setting up 2FA correctly
7. ✅ Recognizing social engineering tactics

### **Critical Thinking Skills**
1. ✅ Evidence-based decision making
2. ✅ Resource management (credit budgeting)
3. ✅ Pattern recognition in attack timelines
4. ✅ Weighing clue strength (strong vs supporting)
5. ✅ Systematic investigation methodology

### **Real-World Awareness**
1. ✅ Instagram phishing is a real, common threat
2. ✅ Attackers use urgency and fear to manipulate
3. ✅ One click can compromise your entire account
4. ✅ Recovery is harder than prevention
5. ✅ Cybercrime is organized and international
6. ✅ External support (police, platforms) exists but isn't instant

---

## 🎮 **GAME FLOW SUMMARY**
START
↓
Read 5 Free Starter Clues
↓
Choose Investigation Path
├─→ Investigate DM (Best path)
├─→ Investigate Timeline
├─→ Ask Victim Questions
└─→ Buy External Support (Expensive)
↓
Gather Evidence
├─→ Unlock Clues (3-8 credits each)
├─→ Use Tech Wiki (Free, learn terms)
└─→ Build Suspect Profile
↓
Have Enough Evidence?
├─→ NO: Keep investigating
└─→ YES: Accuse Suspect
↓
Correct Accusation?
├─→ NO: -15 penalty, get hint, retry
└─→ YES: +10 bonus, unlock Recovery
↓
Recovery Phase
├─→ Secure Email
├─→ Change Password
├─→ Revoke Sessions
├─→ Enable 2FA
├─→ Remove Apps
├─→ Warn Followers
└─→ Report Attacker
↓
Calculate Final Score
├─→ 50+ credits → Ending A (Elite)
├─→ 20-49 credits → Ending B (Good)
├─→ 0-19 credits → Ending C (Costly)
└─→ <0 OR failed recovery → Ending D (Failed)
↓
Show Results
├─→ "What You Learned" summary
├─→ Achievement badges
├─→ Option to replay or try Case 02
└─→ Share score (optional)
END

---

## 🚀 **IMPLEMENTATION CHECKLIST**

### **Phase 1: Core Mechanics (MVP)**
- [ ] Credit system (100 start, costs per action)
- [ ] 5 starter clues (all readable for free)
- [ ] 12 locked clues (unlockable via investigations)
- [ ] 4 suspects with profiles
- [ ] Victim chat (7 questions)
- [ ] Accusation system (cost + penalties)
- [ ] Recovery action menu (7 steps)
- [ ] 4 endings based on credits + actions
- [ ] Evidence locker UI (shows collected clues)
- [ ] Suspect board UI (shows confidence meters)

### **Phase 2: Educational Features**
- [ ] Tech Wiki with 15 terms
- [ ] Inline tooltips for critical terms
- [ ] Search functionality in glossary
- [ ] Learning checkpoint quiz (after 3 lookups)
- [ ] Clue strength indicators (🔴🟡⚪)
- [ ] "What You Learned" summary screen
- [ ] Optimal path walkthrough (for stuck students)

### **Phase 3: Polish & Analytics**
- [ ] Teacher dashboard (student progress tracking)
- [ ] Glossary usage analytics
- [ ] Wrong path feedback (educational, not punishing)
- [ ] Recovery sequence validation (warns if wrong order)
- [ ] Achievement system
- [ ] Score sharing feature
- [ ] Replay value (randomization OR Case 02/03)

### **Phase 4: Accessibility & UX**
- [ ] Mobile-friendly responsive design
- [ ] Credit counter with color coding (green/yellow/red)
- [ ] Tutorial/onboarding for first-time players
- [ ] Hint system (unlocks after 2 wrong accusations)
- [ ] Progress saving (auto-save investigation state)
- [ ] Dark mode option
- [ ] Text size adjustment
- [ ] Keyboard navigation support

---

## 📦 **READY-TO-USE CONTENT**

All dialogue, clue text, glossary definitions, and UI copy are written above in student-friendly language. You can copy-paste directly into your game!

### **Quick Reference:**
- **Starter Clues:** Section "STARTER CLUES (Free to View)"
- **Locked Clues:** Section "LOCKED CLUES (Investigation Tree)"
- **Victim Chat:** Section "VICTIM CHAT (Interactive Questions)"
- **External Support:** Section "EXTERNAL SUPPORT (Paid Services)"
- **Glossary:** Section "TECH WIKI / GLOSSARY BOT"
- **Endings:** Section "SCORING & ENDINGS"
- **Suspect Profiles:** Section "SUSPECT BOARD & DEDUCTION SYSTEM"

---

## 🎓 **FINAL NOTES FOR EDUCATORS**

### **Classroom Integration Tips:**
1. **Pre-Game Discussion (10 min):**
   - Ask: "Has anyone ever gotten a suspicious message?"
   - Discuss: What made it suspicious?

2. **During Gameplay (30-40 min):**
   - Let students play individually or in pairs
   - Encourage glossary use (it's free!)
   - Resist urge to give answers - let them learn from mistakes

3. **Post-Game Debrief (15 min):**
   - What clues were most helpful?
   - Did anyone accuse the wrong suspect first?
   - How would you avoid this in real life?

4. **Extension Activity:**
   - Have students create their own "Case 02" scenario
   - Share real phishing examples from news
   - Practice checking actual URLs together

### **Assessment Ideas:**
- **Formative:** Monitor glossary usage and quiz scores
- **Summative:** Case completion + "What You Learned" reflection
- **Bonus:** Challenge students to beat the game with 60+ credits remaining