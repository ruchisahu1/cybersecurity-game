'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import {
  victimQuestions,
  getQuestionById,
  getCategoryColor,
  getCategoryLabel,
  VICTIM_PROFILE,
  QUESTION_COST,
} from '@/data/victimQuestions';
import { VictimQuestion } from '@/types/chat';

// ============================================
// TYPING INDICATOR COMPONENT
// ============================================

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-slate-700/50 rounded-lg w-fit">
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

// ============================================
// CHAT BUBBLE COMPONENT
// ============================================

interface ChatBubbleProps {
  type: 'question' | 'answer';
  content: string;
  isNew?: boolean;
}

function ChatBubble({ type, content, isNew }: ChatBubbleProps) {
  const isQuestion = type === 'question';

  return (
    <div
      className={`flex ${isQuestion ? 'justify-end' : 'justify-start'} ${
        isNew ? 'animate-in fade-in slide-in-from-bottom-2 duration-300' : ''
      }`}
    >
      <div
        className={`
          max-w-[85%] rounded-lg px-4 py-3
          ${isQuestion
            ? 'bg-cyan-600/20 border border-cyan-600/30 text-cyan-100'
            : 'bg-slate-700/50 border border-slate-600 text-slate-200'
          }
        `}
      >
        {!isQuestion && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-600">
            <span className="text-lg">{VICTIM_PROFILE.avatar}</span>
            <span className="text-sm font-medium text-slate-300">{VICTIM_PROFILE.name}</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

// ============================================
// QUESTION BUTTON COMPONENT
// ============================================

interface QuestionButtonProps {
  question: VictimQuestion;
  isAsked: boolean;
  canAfford: boolean;
  onAsk: (question: VictimQuestion) => void;
}

function QuestionButton({ question, isAsked, canAfford, onAsk }: QuestionButtonProps) {
  const categoryColor = getCategoryColor(question.category);
  const categoryLabel = getCategoryLabel(question.category);

  if (isAsked) {
    return (
      <div className="px-4 py-3 bg-slate-800/30 border border-slate-700 rounded-lg opacity-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 line-through">{question.shortQuestion}</span>
          <span className="text-xs text-green-500">✓ Asked</span>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onAsk(question)}
      disabled={!canAfford}
      className={`
        w-full px-4 py-3 rounded-lg text-left transition-all
        border hover:scale-[1.01]
        ${canAfford
          ? 'bg-slate-800/50 border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800'
          : 'bg-slate-800/30 border-slate-700 cursor-not-allowed opacity-50'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className={`text-sm font-medium ${canAfford ? 'text-white' : 'text-slate-500'}`}>
            {question.shortQuestion}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded border ${categoryColor}`}>
              {categoryLabel}
            </span>
          </div>
        </div>
        <div className={`text-xs font-mono px-2 py-1 rounded ${canAfford ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-slate-500'}`}>
          {question.cost} credits
        </div>
      </div>
    </button>
  );
}

// ============================================
// VICTIM CHAT COMPONENT
// ============================================

export function VictimChat() {
  const { state, dispatch } = useGame();
  const [isTyping, setIsTyping] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<VictimQuestion | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const canAfford = useCallback(
    (cost: number) => state.credits >= cost,
    [state.credits]
  );

  // Get asked question IDs from chat history
  const askedQuestionIds = state.chatHistory.map((chat) => {
    // Find the question by matching the question text
    const matchingQuestion = victimQuestions.find((q) => q.question === chat.question);
    return matchingQuestion?.id;
  }).filter(Boolean) as string[];

  // Scroll to bottom when chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [state.chatHistory, isTyping]);

  const handleAskQuestion = useCallback(
    (question: VictimQuestion) => {
      if (!canAfford(question.cost) || isTyping) return;

      // Set pending question and show typing
      setPendingQuestion(question);
      setIsTyping(true);

      // Simulate typing delay (1.5-3 seconds based on answer length)
      const typingDelay = Math.min(1500 + question.answer.length * 5, 3000);

      setTimeout(() => {
        // Add chat message
        dispatch({
          type: 'ADD_CHAT',
          question: question.question,
          answer: question.answer,
          cost: question.cost,
        });

        // Unlock associated clues
        question.unlocksClueIds.forEach((clueId) => {
          if (!state.unlockedClues.includes(clueId)) {
            dispatch({ type: 'UNLOCK_CLUE', clueId, cost: 0 });
          }
        });

        setIsTyping(false);
        setPendingQuestion(null);
      }, typingDelay);
    },
    [canAfford, dispatch, isTyping, state.unlockedClues]
  );

  // Available questions (not yet asked)
  const availableQuestions = victimQuestions.filter(
    (q) => !askedQuestionIds.includes(q.id)
  );

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Chat with Victim</h2>
        <p className="text-slate-400 text-sm">
          Ask questions to gather information. Each question costs{' '}
          <span className="text-cyan-400 font-mono">{QUESTION_COST} credits</span>.
        </p>
      </div>

      {/* Victim Profile Card */}
      <div className="mb-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{VICTIM_PROFILE.avatar}</div>
          <div>
            <h3 className="text-lg font-bold text-white">{VICTIM_PROFILE.name}</h3>
            <p className="text-sm text-cyan-400">{VICTIM_PROFILE.username}</p>
            <p className="text-xs text-slate-500">{VICTIM_PROFILE.description}</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {state.chatHistory.length === 0 && !isTyping ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <p className="text-slate-400 text-sm mb-2">
                  Start the conversation with {VICTIM_PROFILE.name}
                </p>
                <p className="text-slate-500 text-xs">
                  Select a question below to learn more about what happened
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Existing chat messages */}
              {state.chatHistory.map((chat, index) => (
                <div key={chat.id} className="space-y-3">
                  <ChatBubble type="question" content={chat.question} />
                  <ChatBubble type="answer" content={chat.answer} />
                </div>
              ))}

              {/* Pending question (being typed) */}
              {isTyping && pendingQuestion && (
                <div className="space-y-3">
                  <ChatBubble type="question" content={pendingQuestion.question} isNew />
                  <div className="flex justify-start">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Questions Panel */}
        <div className="border-t border-slate-700 bg-slate-800/30">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-300">
                {availableQuestions.length > 0
                  ? `Choose a question (${availableQuestions.length} remaining)`
                  : 'All questions asked'}
              </p>
              <span className="text-xs text-slate-500">
                {askedQuestionIds.length}/{victimQuestions.length} asked
              </span>
            </div>

            {availableQuestions.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {victimQuestions.map((question) => (
                  <QuestionButton
                    key={question.id}
                    question={question}
                    isAsked={askedQuestionIds.includes(question.id)}
                    canAfford={canAfford(question.cost) && !isTyping}
                    onAsk={handleAskQuestion}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                <p className="text-green-400 text-sm">
                  ✓ You&apos;ve asked all available questions
                </p>
                <p className="text-green-200/60 text-xs mt-1">
                  Review the Evidence Locker to see what you&apos;ve unlocked
                </p>
              </div>
            )}
          </div>

          {/* Tip */}
          <div className="px-4 pb-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-400 flex items-start gap-2">
                <span>💡</span>
                <span>
                  <strong>Tip:</strong> Ask strategic questions! Critical questions (🔴) 
                  reveal the most important evidence. Some answers will automatically 
                  unlock clues in your Evidence Locker.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex gap-4">
        <div className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs">
          <span className="text-slate-400">Questions Asked: </span>
          <span className="text-white font-medium">{askedQuestionIds.length}</span>
        </div>
        <div className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs">
          <span className="text-slate-400">Credits Spent on Chat: </span>
          <span className="text-cyan-400 font-medium">
            {state.chatHistory.reduce((sum, chat) => sum + (chat.cost || QUESTION_COST), 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
