'use client';

import { useState, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import { QuizQuestion, QUIZ_REWARD } from '@/types/glossary';

// ============================================
// LEARNING QUIZ COMPONENT
// ============================================

interface LearningQuizProps {
  quiz: QuizQuestion;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (correct: boolean) => void;
}

export function LearningQuiz({ quiz, isOpen, onClose, onComplete }: LearningQuizProps) {
  const { dispatch } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(answerId);
  }, [isSubmitted]);

  const handleSubmit = useCallback(() => {
    if (!selectedAnswer || isSubmitted) return;

    const correct = selectedAnswer === quiz.correctAnswerId;
    setIsCorrect(correct);
    setIsSubmitted(true);

    // Award credits for correct answer
    if (correct) {
      dispatch({ type: 'SPEND_CREDITS', amount: -QUIZ_REWARD }); // Negative = add credits
    }
  }, [selectedAnswer, isSubmitted, quiz.correctAnswerId, dispatch]);

  const handleContinue = useCallback(() => {
    onComplete(isCorrect);
    // Reset state
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [isCorrect, onComplete]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-slate-700 ${
          isSubmitted
            ? isCorrect
              ? 'bg-green-500/20'
              : 'bg-red-500/20'
            : 'bg-purple-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {isSubmitted ? (isCorrect ? '🎉' : '📚') : '💡'}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isSubmitted
                  ? isCorrect
                    ? 'Correct!'
                    : 'Not Quite!'
                  : 'Quick Knowledge Check!'}
              </h2>
              <p className="text-sm text-slate-400">
                {isSubmitted
                  ? isCorrect
                    ? `+${QUIZ_REWARD} credits earned`
                    : 'No penalty - keep learning!'
                  : 'Test your understanding'}
              </p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          {!isSubmitted ? (
            <>
              <p className="text-white font-medium mb-6">{quiz.question}</p>

              {/* Options */}
              <div className="space-y-3">
                {quiz.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    className={`
                      w-full px-4 py-3 rounded-lg text-left transition-all
                      border text-sm
                      ${selectedAnswer === option.id
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                        ${selectedAnswer === option.id
                          ? 'border-purple-500 bg-purple-500 text-white'
                          : 'border-slate-500 text-slate-500'
                        }
                      `}>
                        {option.id.toUpperCase()}
                      </span>
                      <span>{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`
                  w-full mt-6 px-4 py-3 rounded-lg font-medium transition-colors
                  ${selectedAnswer
                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                Submit Answer
              </button>
            </>
          ) : (
            <>
              {/* Result */}
              <div className={`p-4 rounded-lg border mb-6 ${
                isCorrect
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-slate-800/50 border-slate-600'
              }`}>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {isCorrect ? quiz.explanation : quiz.wrongExplanation}
                </pre>
              </div>

              {/* Show correct answer if wrong */}
              {!isCorrect && (
                <div className="mb-6">
                  <p className="text-sm text-slate-400 mb-2">Correct answer:</p>
                  <div className="px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 font-medium">
                      {quiz.options.find((o) => o.id === quiz.correctAnswerId)?.text}
                    </span>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className={`
                  w-full px-4 py-3 rounded-lg font-medium transition-colors
                  ${isCorrect
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }
                `}
              >
                {isCorrect ? 'Continue (+5 credits)' : 'Continue Learning'}
              </button>
            </>
          )}
        </div>

        {/* Related Terms */}
        {isSubmitted && quiz.relatedTerms.length > 0 && (
          <div className="px-6 pb-6">
            <p className="text-xs text-slate-500 mb-2">Related terms to review:</p>
            <div className="flex flex-wrap gap-2">
              {quiz.relatedTerms.map((termId) => (
                <span
                  key={termId}
                  className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded border border-purple-500/30"
                >
                  {termId.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
