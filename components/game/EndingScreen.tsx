'use client';

import { useState, useCallback, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import {
  calculateGameStats,
  generateEnding,
  generateShareData,
  shareScore,
} from '@/lib/gameLogic';
import { Ending, GameStats, Achievement } from '@/types/endings';

// ============================================
// STARS DISPLAY COMPONENT
// ============================================

interface StarsDisplayProps {
  count: number;
  maxStars?: number;
}

function StarsDisplay({ count, maxStars = 3 }: StarsDisplayProps) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          className={`text-4xl ${
            index < count ? 'animate-pulse' : 'opacity-20'
          }`}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

// ============================================
// STAT CARD COMPONENT
// ============================================

interface StatCardProps {
  label: string;
  value: string;
  isGood: boolean;
}

function StatCard({ label, value, isGood }: StatCardProps) {
  return (
    <div
      className={`
        p-3 rounded-lg border
        ${isGood
          ? 'bg-green-500/10 border-green-500/30'
          : 'bg-red-500/10 border-red-500/30'
        }
      `}
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-lg font-bold ${isGood ? 'text-green-400' : 'text-red-400'}`}>
        {value}
      </p>
    </div>
  );
}

// ============================================
// ACHIEVEMENT BADGE COMPONENT
// ============================================

interface AchievementBadgeProps {
  achievement: Achievement;
}

function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
      <span className="text-3xl">{achievement.icon}</span>
      <div>
        <p className="font-medium text-amber-400">{achievement.name}</p>
        <p className="text-xs text-amber-200/70">{achievement.description}</p>
      </div>
    </div>
  );
}

// ============================================
// ENDING SCREEN COMPONENT
// ============================================

export function EndingScreen() {
  const { state, dispatch } = useGame();
  const [shareStatus, setShareStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calculate stats and ending
  const stats = useMemo(() => calculateGameStats(state), [state]);
  const ending = useMemo(() => generateEnding(stats), [stats]);

  // Get rank-specific colors
  const getRankColors = (rank: Ending['rank']) => {
    switch (rank) {
      case 'A':
        return {
          bg: 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20',
          border: 'border-amber-500/50',
          text: 'text-amber-400',
        };
      case 'B':
        return {
          bg: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
          border: 'border-cyan-500/50',
          text: 'text-cyan-400',
        };
      case 'C':
        return {
          bg: 'bg-gradient-to-br from-slate-500/20 to-gray-500/20',
          border: 'border-slate-500/50',
          text: 'text-slate-400',
        };
      case 'D':
      default:
        return {
          bg: 'bg-gradient-to-br from-red-500/20 to-rose-500/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
        };
    }
  };

  const rankColors = getRankColors(ending.rank);

  const handleShare = useCallback(async () => {
    const shareData = generateShareData(ending, stats);
    const success = await shareScore(shareData);
    setShareStatus(success ? 'success' : 'error');
    setTimeout(() => setShareStatus('idle'), 3000);
  }, [ending, stats]);

  const handleRetry = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);

  const handleAction = useCallback((actionId: string) => {
    switch (actionId) {
      case 'retry':
        handleRetry();
        break;
      case 'share':
        handleShare();
        break;
      case 'next_case':
        // For now, just show an alert - in a real app, this would navigate to next case
        alert('Next case coming soon!');
        break;
      case 'review':
        dispatch({ type: 'SET_PHASE', phase: 'investigation' });
        dispatch({ type: 'CHANGE_TAB', tab: 'evidence' });
        break;
      case 'solution':
        // Show solution - for now, just go to evidence
        dispatch({ type: 'SET_PHASE', phase: 'investigation' });
        dispatch({ type: 'CHANGE_TAB', tab: 'evidence' });
        break;
      case 'tutorial':
        // Would navigate to tutorial
        alert('Tutorial coming soon!');
        break;

      case 'home':
        window.location.href = "https://missionx.junkbot.co/user/gamified";
        break;
    }
  }, [dispatch, handleRetry, handleShare]);

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className={`rounded-2xl border ${rankColors.bg} ${rankColors.border} overflow-hidden`}>
          {/* Header */}
          <div className="p-8 text-center border-b border-slate-700/50">
            {/* Stars */}
            {ending.stars > 0 && (
              <div className="mb-4">
                <StarsDisplay count={ending.stars} />
              </div>
            )}

            {/* Title */}
            <h1 className={`text-3xl font-bold ${rankColors.text} mb-2`}>
              {ending.title}
            </h1>
            <p className="text-xl text-slate-300">{ending.subtitle}</p>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-slate-700/50">
            <p className="text-slate-300 text-center leading-relaxed">
              {ending.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
              Final Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ending.statsBreakdown.map((stat, index) => (
                <StatCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  isGood={stat.isGood}
                />
              ))}
            </div>
          </div>

          {/* What You Learned */}
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
              {ending.rank === 'D' ? 'Key Information' : 'What You Mastered'}
            </h2>
            <ul className="space-y-2">
              {ending.whatYouLearned.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className={ending.rank === 'D' ? 'text-amber-400' : 'text-green-400'}>
                    {ending.rank === 'D' ? '💡' : '✓'}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements (if any) */}
          {ending.improvements && ending.improvements.length > 0 && (
            <div className="p-6 border-b border-slate-700/50 bg-amber-500/5">
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-4">
                {ending.rank === 'D' ? 'Tips for Next Time' : 'Room for Improvement'}
              </h2>
              <ul className="space-y-2">
                {ending.improvements.map((item, index) => (
                  <li
                    key={index}
                    className={`text-sm ${item === '' ? 'h-2' : 'text-amber-200/80'}`}
                  >
                    {item && (
                      <>
                        <span className="text-amber-400">•</span> {item}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {ending.achievements.length > 0 && (
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
                🌟 Achievements Unlocked
              </h2>
              <div className="space-y-3">
                {ending.achievements.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          )}

          {/* Victim Message */}
          <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
              💬 Rashid says:
            </h2>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-slate-300 italic">"{ending.victimMessage}"</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {ending.actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all
                    flex items-center gap-2
                    ${action.primary
                      ? `${rankColors.bg} border ${rankColors.border} ${rankColors.text} hover:scale-105`
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    }
                  `}
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Share Status */}
            {shareStatus !== 'idle' && (
              <p
                className={`text-center text-sm mt-4 ${
                  shareStatus === 'success' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {shareStatus === 'success'
                  ? '✓ Score copied to clipboard!'
                  : '✗ Could not share score'}
              </p>
            )}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mt-8 p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
            📊 Detailed Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Credits Used:</span>
              <span className="text-white">{stats.creditsUsed}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Credits Remaining:</span>
              <span className="text-white">{stats.creditsRemaining}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Clues Unlocked:</span>
              <span className="text-white">{stats.cluesUnlocked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Questions Asked:</span>
              <span className="text-white">{stats.questionsAsked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Glossary Terms:</span>
              <span className="text-white">{stats.glossaryTermsLearned}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">External Services:</span>
              <span className="text-white">{stats.externalServicesUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Wrong Accusations:</span>
              <span className={stats.wrongAccusations > 0 ? 'text-red-400' : 'text-white'}>
                {stats.wrongAccusations}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sequence Errors:</span>
              <span className={stats.sequenceErrors > 0 ? 'text-amber-400' : 'text-white'}>
                {stats.sequenceErrors}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            AI Cyber Detective - Case #1: The Account Takeover
          </p>
          <p className="text-slate-600 text-xs mt-1">
            An educational cybersecurity investigation game
          </p>
        </div>
      </div>
    </div>
  );
}
