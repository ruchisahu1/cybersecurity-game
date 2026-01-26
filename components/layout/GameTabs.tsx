'use client';

import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { TABS } from '@/data/gameConfig';
import { TabId, GamePhase } from '@/types';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  requiresPhase?: GamePhase;
}

export function GameTabs() {
  const { state, dispatch } = useGame();

  const handleTabChange = useCallback((tabId: TabId) => {
    dispatch({ type: 'CHANGE_TAB', tab: tabId });
  }, [dispatch]);

  const isTabUnlocked = useCallback((tab: TabConfig): boolean => {
    if (!tab.requiresPhase) return true;
    return state.gamePhase === tab.requiresPhase || state.gamePhase === 'ended';
  }, [state.gamePhase]);

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide">
          {(TABS as readonly TabConfig[]).map((tab) => {
            const isActive = state.currentTab === tab.id;
            const isUnlocked = isTabUnlocked(tab);

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => isUnlocked && handleTabChange(tab.id as TabId)}
                disabled={!isUnlocked}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium
                  whitespace-nowrap transition-colors
                  border-b-2 -mb-px
                  ${!isUnlocked
                    ? 'border-transparent text-slate-600 cursor-not-allowed'
                    : isActive
                      ? 'border-cyan-500 text-cyan-400 bg-slate-900/50'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">
                  {!isUnlocked ? '🔒' : tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                {!isUnlocked && (
                  <span className="hidden md:inline text-xs text-slate-600">
                    (Locked)
                  </span>
                )}
                {isUnlocked && tab.requiresPhase && state.gamePhase === tab.requiresPhase && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500/20 text-green-400 rounded animate-pulse">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
