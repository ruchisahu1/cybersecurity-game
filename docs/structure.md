cybersecurity-game/
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing/start screen
│   ├── game/
│   │   └── page.tsx             # Main game interface
│   └── globals.css              # Tailwind imports
│
├── components/
│   ├── game/
│   │   ├── EvidenceLocker.tsx   # Shows collected clues
│   │   ├── VictimChat.tsx       # Chat interface
│   │   ├── Timeline.tsx         # Event timeline
│   │   ├── SuspectBoard.tsx     # 4 suspects display
│   │   ├── TechWiki.tsx         # Glossary
│   │   ├── ExternalSupport.tsx  # Paid services
│   │   ├── RecoveryPhase.tsx    # Account recovery
│   │   └── EndingScreen.tsx     # Results
│   ├── ui/
│   │   ├── CreditCounter.tsx    # Shows remaining credits
│   │   ├── ClueCard.tsx         # Reusable clue display
│   │   ├── Tooltip.tsx          # Inline glossary
│   │   └── Modal.tsx            # Popups
│   └── layout/
│       ├── GameTabs.tsx         # Tab navigation
│       └── Header.tsx           # Game header
│
├── context/
│   └── GameContext.tsx          # Global game state
│
├── data/
│   ├── clues.ts                 # All clue content
│   ├── suspects.ts              # Suspect profiles
│   ├── glossary.ts              # Tech wiki terms
│   ├── victimQuestions.ts       # Chat questions
│   └── gameConfig.ts            # Costs, rules
│
├── lib/
│   ├── gameLogic.ts             # Core game mechanics
│   └── utils.ts                 # Helper functions
│
├── types/
│   ├── game.ts                  # GameState, GameAction types
│   ├── clue.ts                  # Clue interface
│   ├── suspect.ts               # Suspect interface
│   ├── glossary.ts              # GlossaryTerm interface
│   └── index.ts                 # Re-export all types
│
├── hooks/
│   ├── useGame.ts               # Game context hook
│   └── useLocalStorage.ts       # Persistence hook
│
├── docs/
│   ├── BLUEPRINT.md             # Full game design
│   └── COMPONENT_GUIDE.md       # Architecture docs
│
├── .cursorrules                 # Cursor AI context
├── .gitignore
├── package.json
├── tsconfig.json                # TypeScript config
├── next.config.js
├── tailwind.config.ts           # Tailwind TypeScript config
└── README.md