'use client';

import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { GAME_CONFIG } from '@/data/gameConfig';

export default function HomePage() {
  const { dispatch } = useGame();

  const handleStartGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <span className="text-8xl" role="img" aria-label="Lock">
            🔐
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          AI Cyber Detective
        </h1>
        <p className="text-xl text-cyan-400 font-medium mb-2">
          Account Recovery Investigation
        </p>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Someone has taken over your friend&apos;s social media account. 
          Can you figure out who did it and help them recover?
        </p>

        {/* Start button */}
        <Link
          href="/game"
          onClick={handleStartGame}
          className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 
                     text-white font-semibold text-lg rounded-lg transition-colors
                     shadow-lg shadow-cyan-500/25"
        >
          <span>Start Investigation</span>
          <span>→</span>
        </Link>

        {/* Game info */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyan-400">
              {GAME_CONFIG.initialCredits}
            </div>
            <div className="text-xs text-slate-500 mt-1">Starting Credits</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">4</div>
            <div className="text-xs text-slate-500 mt-1">Suspects</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-400">1</div>
            <div className="text-xs text-slate-500 mt-1">Culprit</div>
          </div>
        </div>

        {/* How to play */}
        <div className="mt-12 text-left bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">How to Play</h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">1.</span>
              <span>
                <strong className="text-slate-300">Investigate</strong> — 
                Chat with the victim, examine evidence, and review the timeline
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">2.</span>
              <span>
                <strong className="text-slate-300">Spend wisely</strong> — 
                Every action costs credits. Run out and the investigation ends
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">3.</span>
              <span>
                <strong className="text-slate-300">Make your accusation</strong> — 
                When you know who did it, accuse the right suspect
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">4.</span>
              <span>
                <strong className="text-slate-300">Recover the account</strong> — 
                Help your friend regain access and secure their account
              </span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-slate-600">
          An educational game about cybersecurity and account protection
        </p>
      </div>
    </main>
  );
}
