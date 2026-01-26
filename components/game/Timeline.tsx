'use client';

import { useState, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import {
  timelineEvents,
  TimelineEvent,
  isEventVisible,
  isEventUnlocked,
  getSortedEvents,
  getSeverityColor,
  calculateTimelineProgress,
} from '@/data/timeline';

// ============================================
// EVENT CARD COMPONENT
// ============================================

interface EventCardProps {
  event: TimelineEvent;
  isUnlocked: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: (event: TimelineEvent) => void;
}

function EventCard({ event, isUnlocked, isFirst, isLast, onSelect }: EventCardProps) {
  const colors = getSeverityColor(isUnlocked ? event.severity : 'normal');

  return (
    <div className="relative pl-12">
      {/* Timeline connector line */}
      <div
        className={`
          absolute left-[1.0625rem] w-0.5
          ${isFirst ? 'top-4' : 'top-0'}
          ${isLast ? 'h-4' : 'bottom-0'}
          ${isUnlocked ? 'bg-slate-600' : 'bg-slate-700/50'}
        `}
      />

      {/* Timeline dot */}
      <div
        className={`
          absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 border-slate-900
          ${isUnlocked ? colors.dot : 'bg-slate-700'}
          ${isUnlocked && event.severity === 'critical' ? 'animate-pulse' : ''}
        `}
      />

      {/* Event content */}
      <button
        onClick={() => isUnlocked && onSelect(event)}
        disabled={!isUnlocked}
        className={`
          w-full text-left p-4 rounded-lg border transition-all
          ${isUnlocked
            ? `${colors.bg} ${colors.border} hover:scale-[1.01] cursor-pointer`
            : 'bg-slate-800/30 border-slate-700/50 cursor-not-allowed'
          }
        `}
      >
        {/* Time */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-lg ${isUnlocked ? '' : 'opacity-50'}`}>
            {isUnlocked ? event.icon : '🔒'}
          </span>
          <span
            className={`text-xs font-mono ${
              isUnlocked ? 'text-cyan-400' : 'text-slate-600'
            }`}
          >
            {isUnlocked ? event.time : '???'}
          </span>
          {isUnlocked && event.severity === 'critical' && (
            <span className="px-1.5 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">
              CRITICAL
            </span>
          )}
        </div>

        {/* Title & Description */}
        {isUnlocked ? (
          <>
            <h3 className={`font-medium ${colors.text}`}>{event.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{event.description}</p>
            {event.details && (
              <p className="text-xs text-slate-500 mt-2">
                Click to view details
              </p>
            )}
          </>
        ) : (
          <>
            <h3 className="font-medium text-slate-600">Event Hidden</h3>
            <p className="text-sm text-slate-600 mt-1">
              {event.partialContent || 'Unlock clues to reveal this event'}
            </p>
          </>
        )}
      </button>
    </div>
  );
}

// ============================================
// EVENT DETAIL MODAL
// ============================================

interface EventDetailProps {
  event: TimelineEvent;
  onClose: () => void;
}

function EventDetail({ event, onClose }: EventDetailProps) {
  const colors = getSeverityColor(event.severity);

  return (
    <div className="max-w-lg">
      {/* Header */}
      <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{event.icon}</span>
          <div>
            <span className="text-sm font-mono text-cyan-400">{event.time}</span>
            <h2 className={`text-xl font-bold ${colors.text}`}>{event.title}</h2>
          </div>
        </div>
        <p className="text-slate-300 mt-2">{event.description}</p>
      </div>

      {/* Details */}
      {event.details && event.details.length > 0 && (
        <div className="p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Event Details
          </h3>
          <ul className="space-y-2">
            {event.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="text-slate-500">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Severity indicator */}
      <div className={`p-4 mx-6 mb-6 rounded-lg ${colors.bg} border ${colors.border}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <span className={`text-sm font-medium ${colors.text}`}>
            {event.severity === 'critical'
              ? 'Critical Event - Key moment in the attack'
              : event.severity === 'warning'
              ? 'Warning - Suspicious activity detected'
              : 'Normal event'}
          </span>
        </div>
      </div>

      {/* Close button */}
      <div className="p-6 pt-0">
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
// PROGRESS BAR COMPONENT
// ============================================

interface ProgressBarProps {
  revealed: number;
  total: number;
  percentage: number;
}

function ProgressBar({ revealed, total, percentage }: ProgressBarProps) {
  return (
    <div className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">Timeline Progress</span>
        <span className="text-sm font-mono text-cyan-400">
          {revealed}/{total} events revealed
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percentage < 100 && (
        <p className="text-xs text-slate-500 mt-2">
          💡 Unlock more clues to reveal hidden events
        </p>
      )}
    </div>
  );
}

// ============================================
// LEGEND COMPONENT
// ============================================

function Legend() {
  return (
    <div className="mb-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">Legend</h3>
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-slate-400">Critical (Attack Action)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-slate-400">Warning (Suspicious)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-500" />
          <span className="text-slate-400">Normal Event</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-700" />
          <span className="text-slate-400">Locked</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN TIMELINE COMPONENT
// ============================================

export function Timeline() {
  const { state } = useGame();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Get visible and unlocked events
  const visibleEvents = useMemo(() => {
    const events = timelineEvents.filter((event) =>
      isEventVisible(event, state.unlockedClues)
    );
    return getSortedEvents(events);
  }, [state.unlockedClues]);

  // Calculate progress
  const progress = useMemo(
    () => calculateTimelineProgress(state.unlockedClues),
    [state.unlockedClues]
  );

  // Check if event is unlocked
  const checkUnlocked = (event: TimelineEvent) =>
    isEventUnlocked(event, state.unlockedClues);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">📅 Event Timeline</h2>
        <p className="text-slate-400">
          Track the sequence of events leading to the account compromise.
          The attack happened fast - under 15 minutes from DM to full takeover.
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar {...progress} />

      {/* Legend */}
      <Legend />

      {/* Timeline */}
      <div className="relative">
        <div className="space-y-4">
          {visibleEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              isUnlocked={checkUnlocked(event)}
              isFirst={index === 0}
              isLast={index === visibleEvents.length - 1}
              onSelect={setSelectedEvent}
            />
          ))}
        </div>
      </div>

      {/* Attack Summary */}
      {progress.percentage >= 70 && (
        <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h3 className="text-sm font-semibold text-red-400 mb-2">
            ⚠️ Attack Analysis
          </h3>
          <p className="text-sm text-red-200/80">
            Total attack duration: <strong>~12 minutes</strong> (7:18 PM → 7:30 PM)
          </p>
          <p className="text-xs text-red-200/60 mt-1">
            The attacker moved extremely fast, changing password and email within 
            minutes of receiving the stolen credentials. This is why immediate 
            action during recovery is critical.
          </p>
        </div>
      )}

      {/* Hint when mostly locked */}
      {progress.percentage < 50 && (
        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">
            💡 Investigation Tip
          </h3>
          <p className="text-sm text-slate-500">
            Many timeline events are still hidden. To reveal more:
          </p>
          <ul className="text-sm text-slate-500 mt-2 space-y-1">
            <li>• Check the <strong>Evidence Locker</strong> for clues to unlock</li>
            <li>• Ask <strong>Rashid</strong> questions in Victim Chat</li>
            <li>• Investigate suspicious DMs and links</li>
          </ul>
        </div>
      )}

      {/* Event Detail Modal */}
      <Modal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </Modal>
    </div>
  );
}
