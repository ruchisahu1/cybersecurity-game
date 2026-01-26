'use client';

import { useGame } from '@/context/GameContext';

export function CreditCounter() {
  const { state } = useGame();
  
  const getColorClass = () => {
    if (state.credits <= 20) return 'text-red-500 bg-red-500/10';
    if (state.credits <= 50) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-emerald-500 bg-emerald-500/10';
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${getColorClass()}`}
      role="status"
      aria-label={`${state.credits} credits remaining`}
    >
      <span className="text-xl" aria-hidden="true">💰</span>
      <span>{state.credits}</span>
      <span className="text-sm font-normal opacity-75">credits</span>
    </div>
  );
}
