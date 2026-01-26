'use client';

import { useState, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { getTermById } from '@/data/glossary';
import { FIRST_LOOKUP_COST, REPEAT_LOOKUP_COST } from '@/types/glossary';

// ============================================
// GLOSSARY TOOLTIP COMPONENT
// ============================================

interface GlossaryTooltipProps {
  termId: string;
  children?: React.ReactNode;
  onLearnMore?: (termId: string) => void;
}

export function GlossaryTooltip({ termId, children, onLearnMore }: GlossaryTooltipProps) {
  const { state, dispatch } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const term = getTermById(termId);
  const isLookedUp = state.glossaryLookups.includes(termId);
  const cost = isLookedUp ? 0 : FIRST_LOOKUP_COST; // First lookup is free

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    
    // Track lookup (first time only, and it's free)
    if (!isLookedUp) {
      dispatch({ type: 'LOOKUP_GLOSSARY', termId, cost: FIRST_LOOKUP_COST });
    }
  }, [dispatch, isLookedUp, termId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLearnMore = useCallback(() => {
    setIsOpen(false);
    onLearnMore?.(termId);
  }, [onLearnMore, termId]);

  if (!term) {
    return <span>{children || termId}</span>;
  }

  return (
    <span className="relative inline-block">
      {/* Trigger */}
      <button
        onClick={handleOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 
                   underline decoration-dotted underline-offset-2 cursor-help transition-colors"
      >
        {children || term.term}
        <span className="text-xs opacity-75">[?]</span>
      </button>

      {/* Tooltip Popup */}
      {isOpen && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72
                     bg-slate-800 border border-slate-600 rounded-lg shadow-xl
                     animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-slate-600" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-slate-800" />
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-xl">{term.icon}</span>
              <div>
                <h4 className="font-semibold text-white text-sm">{term.term}</h4>
                <span className="text-xs text-slate-500">{term.category}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {term.shortDefinition}
            </p>

            {onLearnMore && (
              <button
                onClick={handleLearnMore}
                className="mt-3 w-full px-3 py-1.5 bg-purple-600/20 border border-purple-500/30
                         text-purple-400 text-xs rounded hover:bg-purple-600/30 transition-colors"
              >
                Learn More →
              </button>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

// ============================================
// INLINE TERM HIGHLIGHTER
// ============================================

interface HighlightTermsProps {
  text: string;
  onLearnMore?: (termId: string) => void;
}

// Map of keywords to term IDs
const KEYWORD_MAP: Record<string, string> = {
  'phishing': 'phishing',
  'phish': 'phishing',
  '2fa': 'two_factor_auth',
  'two-factor': 'two_factor_auth',
  'two factor': 'two_factor_auth',
  'session': 'session',
  'sessions': 'session',
  'domain': 'domain',
  'domains': 'domain',
  'revoke': 'revoke_sessions',
  'otp': 'otp',
  'one-time password': 'otp',
  'social engineering': 'social_engineering',
  'https': 'https',
  'http': 'https',
  'credential harvesting': 'credential_harvesting',
  'osint': 'osint',
  'ip address': 'ip_address',
  'vpn': 'vpn',
};

export function HighlightTerms({ text, onLearnMore }: HighlightTermsProps) {
  // Simple implementation - find and highlight known terms
  // For production, you'd want a more sophisticated approach
  
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Sort keywords by length (longest first) to avoid partial matches
  const sortedKeywords = Object.keys(KEYWORD_MAP).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    const matches = remaining.match(regex);
    
    if (matches) {
      const splitParts = remaining.split(regex);
      remaining = '';
      
      for (let i = 0; i < splitParts.length; i++) {
        if (i % 2 === 0) {
          remaining += splitParts[i];
        } else {
          parts.push(
            <GlossaryTooltip
              key={key++}
              termId={KEYWORD_MAP[keyword]}
              onLearnMore={onLearnMore}
            >
              {splitParts[i]}
            </GlossaryTooltip>
          );
        }
      }
    }
  }

  if (remaining) {
    parts.push(<span key={key}>{remaining}</span>);
  }

  return <>{parts.length > 0 ? parts : text}</>;
}
