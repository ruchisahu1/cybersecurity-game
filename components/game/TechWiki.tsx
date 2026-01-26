'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import { LearningQuiz } from './LearningQuiz';
import {
  glossaryTerms,
  getTermById,
  getTermsByCategory,
  searchTerms,
  getCategoryColor,
  getCategoryLabel,
  getRandomQuiz,
} from '@/data/glossary';
import {
  GlossaryTerm,
  FIRST_LOOKUP_COST,
  REPEAT_LOOKUP_COST,
  QUIZ_TRIGGER_COUNT,
} from '@/types/glossary';

// ============================================
// TERM CARD COMPONENT
// ============================================

interface TermCardProps {
  term: GlossaryTerm;
  isLookedUp: boolean;
  onSelect: (term: GlossaryTerm) => void;
}

function TermCard({ term, isLookedUp, onSelect }: TermCardProps) {
  const categoryColor = getCategoryColor(term.category);
  const categoryLabel = getCategoryLabel(term.category);

  return (
    <button
      onClick={() => onSelect(term)}
      className={`
        w-full p-4 rounded-lg border text-left transition-all
        hover:scale-[1.01]
        ${isLookedUp
          ? 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
          : 'bg-slate-800/50 border-slate-600 hover:border-purple-500/50'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{term.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-white truncate">{term.term}</h3>
            {isLookedUp && (
              <span className="text-xs text-green-500">✓</span>
            )}
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            {term.shortDefinition}
          </p>
        </div>
        <span className={`text-xs px-2 py-1 rounded border flex-shrink-0 ${categoryColor}`}>
          {categoryLabel}
        </span>
      </div>
    </button>
  );
}

// ============================================
// TERM DETAIL MODAL
// ============================================

interface TermDetailProps {
  term: GlossaryTerm;
  onClose: () => void;
  onSelectRelated: (termId: string) => void;
}

function TermDetail({ term, onClose, onSelectRelated }: TermDetailProps) {
  const categoryColor = getCategoryColor(term.category);
  const categoryLabel = getCategoryLabel(term.category);

  return (
    <div className="flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50 flex-shrink-0">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{term.icon}</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{term.term}</h2>
            <span className={`inline-block mt-1 text-xs px-2 py-1 rounded border ${categoryColor}`}>
              {categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* What It Is */}
        <div>
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">
            What It Is
          </h3>
          <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {term.definition.whatItIs}
          </p>
        </div>

        {/* Real-World Example */}
        <div>
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">
            Real-World Example
          </h3>
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {term.definition.realWorldExample}
            </p>
          </div>
        </div>

        {/* In This Game */}
        <div>
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">
            In This Game
          </h3>
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <p className="text-sm text-cyan-100 whitespace-pre-wrap leading-relaxed">
              {term.definition.inThisGame}
            </p>
          </div>
        </div>

        {/* How To Spot / Tips */}
        {term.definition.howToSpot.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-2">
              How To Spot / Remember
            </h3>
            <ul className="space-y-2">
              {term.definition.howToSpot.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-purple-400 flex-shrink-0">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pro Tip */}
        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <h4 className="text-sm font-semibold text-amber-400 mb-1">Pro Tip</h4>
              <p className="text-sm text-amber-100/80 whitespace-pre-wrap">
                {term.definition.proTip}
              </p>
            </div>
          </div>
        </div>

        {/* Related Terms */}
        {term.relatedTerms.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Related Terms
            </h3>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relatedId) => {
                const relatedTerm = getTermById(relatedId);
                if (!relatedTerm) return null;
                return (
                  <button
                    key={relatedId}
                    onClick={() => onSelectRelated(relatedId)}
                    className="px-3 py-1.5 text-sm bg-purple-500/20 text-purple-400 
                             rounded border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                  >
                    {relatedTerm.icon} {relatedTerm.term}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ============================================
// TECH WIKI COMPONENT
// ============================================

export function TechWiki() {
  const { state, dispatch } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<GlossaryTerm['category'] | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [lastLookupCount, setLastLookupCount] = useState(state.glossaryLookups.length);

  // Check if there's a pre-selected term from navigation (e.g., from Evidence Locker)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTermId = localStorage.getItem('selectedGlossaryTerm');
      if (storedTermId) {
        const term = getTermById(storedTermId);
        if (term) {
          // Track lookup if first time
          if (!state.glossaryLookups.includes(term.id)) {
            dispatch({ type: 'LOOKUP_GLOSSARY', termId: term.id, cost: FIRST_LOOKUP_COST });
          }
          setSelectedTerm(term);
        }
        // Clear the stored term
        localStorage.removeItem('selectedGlossaryTerm');
      }
    }
  }, [dispatch, state.glossaryLookups]);

  // Check if we should show quiz (every 3 new lookups)
  useEffect(() => {
    const currentCount = state.glossaryLookups.length;
    const newLookups = currentCount - lastLookupCount;
    
    if (newLookups > 0 && currentCount >= QUIZ_TRIGGER_COUNT && currentCount % QUIZ_TRIGGER_COUNT === 0) {
      // Trigger quiz
      setShowQuiz(true);
    }
    
    setLastLookupCount(currentCount);
  }, [state.glossaryLookups.length, lastLookupCount]);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    if (searchQuery) {
      terms = searchTerms(searchQuery);
    }

    if (categoryFilter !== 'all') {
      terms = terms.filter((t) => t.category === categoryFilter);
    }

    return terms;
  }, [searchQuery, categoryFilter]);

  // Stats
  const criticalTerms = getTermsByCategory('critical');
  const lookedUpCritical = criticalTerms.filter((t) =>
    state.glossaryLookups.includes(t.id)
  ).length;

  const handleSelectTerm = useCallback((term: GlossaryTerm) => {
    // Track lookup if first time (it's free)
    if (!state.glossaryLookups.includes(term.id)) {
      dispatch({ type: 'LOOKUP_GLOSSARY', termId: term.id, cost: FIRST_LOOKUP_COST });
    }
    setSelectedTerm(term);
  }, [dispatch, state.glossaryLookups]);

  const handleSelectRelatedTerm = useCallback((termId: string) => {
    const term = getTermById(termId);
    if (term) {
      handleSelectTerm(term);
    }
  }, [handleSelectTerm]);

  const handleCloseDetail = useCallback(() => {
    setSelectedTerm(null);
  }, []);

  const handleQuizComplete = useCallback((correct: boolean) => {
    const quiz = getRandomQuiz(completedQuizIds);
    if (quiz) {
      setCompletedQuizIds((prev) => [...prev, quiz.id]);
    }
    setShowQuiz(false);
  }, [completedQuizIds]);

  const currentQuiz = useMemo(() => {
    return getRandomQuiz(completedQuizIds);
  }, [completedQuizIds]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Tech Wiki</h2>
        <p className="text-slate-400">
          Learn cybersecurity concepts. First lookup of each term is{' '}
          <span className="text-green-400 font-medium">FREE</span>.
        </p>
      </div>

      {/* Progress Card */}
      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-400 font-medium">Learning Progress</p>
            <p className="text-xs text-purple-300/70 mt-1">
              {lookedUpCritical}/{criticalTerms.length} critical terms learned
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-400">
              {state.glossaryLookups.length}
            </p>
            <p className="text-xs text-purple-300/70">terms studied</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${(lookedUpCritical / criticalTerms.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 pl-10
                     text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            🔎
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Terms' },
          { id: 'critical', label: '🔴 Critical' },
          { id: 'helpful', label: '🟡 Helpful' },
          { id: 'advanced', label: '⚪ Advanced' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
              ${categoryFilter === cat.id
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length > 0 ? (
        <div className="space-y-3">
          {/* Critical Terms Section */}
          {categoryFilter === 'all' && (
            <>
              <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-2">
                🔴 Critical Terms (Must Know)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {filteredTerms
                  .filter((t) => t.category === 'critical')
                  .map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      isLookedUp={state.glossaryLookups.includes(term.id)}
                      onSelect={handleSelectTerm}
                    />
                  ))}
              </div>

              <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-2">
                🟡 Helpful Terms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {filteredTerms
                  .filter((t) => t.category === 'helpful')
                  .map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      isLookedUp={state.glossaryLookups.includes(term.id)}
                      onSelect={handleSelectTerm}
                    />
                  ))}
              </div>

              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                ⚪ Advanced (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredTerms
                  .filter((t) => t.category === 'advanced')
                  .map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      isLookedUp={state.glossaryLookups.includes(term.id)}
                      onSelect={handleSelectTerm}
                    />
                  ))}
              </div>
            </>
          )}

          {/* Filtered view */}
          {categoryFilter !== 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTerms.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  isLookedUp={state.glossaryLookups.includes(term.id)}
                  onSelect={handleSelectTerm}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-slate-400">No terms match your search</p>
        </div>
      )}

      {/* Most Looked Up Section */}
      {state.glossaryLookups.length > 0 && categoryFilter === 'all' && !searchQuery && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-slate-300 mb-4">
            📊 Your Learned Terms
          </h3>
          <div className="flex flex-wrap gap-2">
            {state.glossaryLookups.map((termId) => {
              const term = getTermById(termId);
              if (!term) return null;
              return (
                <button
                  key={termId}
                  onClick={() => handleSelectTerm(term)}
                  className="px-3 py-1.5 text-sm bg-green-500/20 text-green-400 
                           rounded border border-green-500/30 hover:bg-green-500/30 transition-colors"
                >
                  {term.icon} {term.term}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Term Detail Modal */}
      <Modal isOpen={selectedTerm !== null} onClose={handleCloseDetail}>
        {selectedTerm && (
          <TermDetail
            term={selectedTerm}
            onClose={handleCloseDetail}
            onSelectRelated={handleSelectRelatedTerm}
          />
        )}
      </Modal>

      {/* Learning Quiz Modal */}
      {currentQuiz && (
        <LearningQuiz
          quiz={currentQuiz}
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
