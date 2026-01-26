'use client';

import { useState, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { Modal } from '@/components/ui/Modal';
import {
  externalSupportServices,
  getServiceById,
  getStrengthColor,
  getStrengthLabel,
} from '@/data/externalSupport';
import { ExternalSupportService } from '@/types/support';
import { GAME_CONFIG } from '@/data/gameConfig';

// ============================================
// SERVICE CARD COMPONENT
// ============================================

interface ServiceCardProps {
  service: ExternalSupportService;
  isPurchased: boolean;
  canAfford: boolean;
  onSelect: (service: ExternalSupportService) => void;
}

function ServiceCard({ service, isPurchased, canAfford, onSelect }: ServiceCardProps) {
  const strengthColor = getStrengthColor(service.clueStrength);
  const strengthLabel = getStrengthLabel(service.clueStrength);

  return (
    <div
      className={`
        relative bg-slate-800/50 border rounded-lg overflow-hidden
        transition-all duration-300
        ${isPurchased
          ? 'border-green-500/50'
          : canAfford
            ? 'border-slate-600 hover:border-cyan-500/50 cursor-pointer hover:scale-[1.01]'
            : 'border-slate-700 opacity-60'
        }
      `}
      onClick={() => !isPurchased && canAfford && onSelect(service)}
    >
      {/* Purchased Badge */}
      {isPurchased && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
          PURCHASED
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl">{service.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{service.name}</h3>
            <p className="text-sm text-slate-400">{service.provider}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-4">
          {service.description}
        </p>

        {/* What You Get */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">What you get:</p>
          <ul className="space-y-1">
            {service.whatYouGet.slice(0, 3).map((item, index) => (
              <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence Strength */}
        {service.clueStrength !== 'none' && (
          <div className="mb-4">
            <span className={`inline-block px-2 py-1 text-xs rounded border ${strengthColor}`}>
              {strengthLabel}
            </span>
            {service.pointsTo && (
              <span className="ml-2 text-xs text-slate-500">
                → Points to {service.pointsTo.replace('suspect_', 'Suspect ').toUpperCase()}
              </span>
            )}
          </div>
        )}

        {/* Unlocks Recovery */}
        {service.unlocksRecoveryPhase && (
          <div className="mb-4 p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
            <p className="text-xs text-cyan-400 flex items-center gap-2">
              <span>🔓</span>
              <span>Unlocks Recovery Phase</span>
            </p>
          </div>
        )}

        {/* Cost / Action */}
        <div className="pt-4 border-t border-slate-700">
          {isPurchased ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(service);
              }}
              className="w-full px-4 py-2 bg-green-600/20 border border-green-500/30 
                       text-green-400 rounded-lg text-sm font-medium hover:bg-green-600/30 transition-colors"
            >
              View Report
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-cyan-400">{service.cost}</span>
                <span className="text-sm text-slate-500 ml-1">credits</span>
              </div>
              <button
                disabled={!canAfford}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${canAfford
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                {canAfford ? 'Purchase' : 'Not Enough Credits'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONFIRMATION DIALOG
// ============================================

interface ConfirmDialogProps {
  service: ExternalSupportService;
  canAfford: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ service, canAfford, onConfirm, onCancel }: ConfirmDialogProps) {
  const strengthColor = getStrengthColor(service.clueStrength);
  const strengthLabel = getStrengthLabel(service.clueStrength);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-amber-500/10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h2 className="text-lg font-bold text-white">Confirm Purchase</h2>
            <p className="text-sm text-amber-400">This is an expensive service!</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Service Info */}
        <div className="flex items-start gap-4 mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <span className="text-4xl">{service.icon}</span>
          <div>
            <h3 className="font-bold text-white">{service.name}</h3>
            <p className="text-sm text-slate-400">{service.provider}</p>
          </div>
        </div>

        {/* Cost Warning */}
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Service Cost:</span>
            <span className="text-2xl font-bold text-red-400">-{service.cost} credits</span>
          </div>
          <p className="text-xs text-red-300/70 mt-2">
            This is {service.cost >= 30 ? 'a premium' : 'an expensive'} service. 
            Make sure you need this information before purchasing.
          </p>
        </div>

        {/* What You Get */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-300 mb-2">What you'll receive:</p>
          <ul className="space-y-2">
            {service.whatYouGet.map((item, index) => (
              <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What You Don't Get */}
        {service.whatYouDontGet && service.whatYouDontGet.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-300 mb-2">What you won't get:</p>
            <ul className="space-y-2">
              {service.whatYouDontGet.map((item, index) => (
                <li key={index} className="text-sm text-slate-500 flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Evidence Strength */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-slate-400">Evidence value:</span>
          <span className={`px-2 py-1 text-xs rounded border ${strengthColor}`}>
            {strengthLabel}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className={`
              flex-1 px-4 py-3 rounded-lg font-medium transition-colors
              ${canAfford
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            Purchase (-{service.cost})
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SERVICE RESPONSE MODAL
// ============================================

interface ServiceResponseProps {
  service: ExternalSupportService;
  onClose: () => void;
}

function ServiceResponse({ service, onClose }: ServiceResponseProps) {
  const strengthColor = getStrengthColor(service.clueStrength);
  const strengthLabel = getStrengthLabel(service.clueStrength);

  return (
    <div className="flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50 flex-shrink-0">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{service.icon}</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{service.name}</h2>
            <p className="text-sm text-slate-400">{service.provider}</p>
          </div>
          {service.clueStrength !== 'none' && (
            <span className={`px-2 py-1 text-xs rounded border ${strengthColor}`}>
              {strengthLabel}
            </span>
          )}
        </div>
      </div>

      {/* Response Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
          <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
            {service.response}
          </pre>
        </div>

        {/* Unlocks Info */}
        {service.unlocksRecoveryPhase && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔓</span>
              <div>
                <p className="text-green-400 font-medium">Recovery Phase Unlocked!</p>
                <p className="text-sm text-green-200/70">
                  You can now access account recovery actions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Points To */}
        {service.pointsTo && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Evidence points to:</strong>{' '}
              {service.pointsTo.replace('suspect_', 'Suspect ').toUpperCase()}
            </p>
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
// EXTERNAL SUPPORT COMPONENT
// ============================================

export function ExternalSupport() {
  const { state, dispatch } = useGame();
  const [selectedService, setSelectedService] = useState<ExternalSupportService | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  // Track purchased services (stored in recoveryActions for simplicity)
  const purchasedServiceIds = state.recoveryActions.filter((id) =>
    externalSupportServices.some((s) => s.id === id)
  );

  const canAfford = useCallback(
    (cost: number) => state.credits >= cost,
    [state.credits]
  );

  const handleSelectService = useCallback((service: ExternalSupportService) => {
    setSelectedService(service);
    
    // If already purchased, show response directly
    if (purchasedServiceIds.includes(service.id)) {
      setShowResponse(true);
    } else {
      setShowConfirm(true);
    }
  }, [purchasedServiceIds]);

  const handleConfirmPurchase = useCallback(() => {
    if (!selectedService || !canAfford(selectedService.cost)) return;

    // Spend credits
    dispatch({ type: 'SPEND_CREDITS', amount: selectedService.cost });

    // Mark as purchased (using recovery actions)
    dispatch({ type: 'COMPLETE_RECOVERY_ACTION', actionId: selectedService.id });

    // Unlock recovery phase if applicable
    if (selectedService.unlocksRecoveryPhase) {
      dispatch({ type: 'SET_PHASE', phase: 'recovery' });
    }

    // Show response
    setShowConfirm(false);
    setShowResponse(true);
  }, [selectedService, canAfford, dispatch]);

  const handleCancel = useCallback(() => {
    setShowConfirm(false);
    setSelectedService(null);
  }, []);

  const handleCloseResponse = useCallback(() => {
    setShowResponse(false);
    setSelectedService(null);
  }, []);

  // Calculate total possible spend
  const totalServiceCost = externalSupportServices.reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">External Support</h2>
        <p className="text-slate-400">
          Hire professional services for advanced investigation. These are{' '}
          <span className="text-amber-400 font-medium">expensive</span> — use wisely!
        </p>
      </div>

      {/* Warning Banner */}
      <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="text-amber-400 font-medium">Premium Services</h4>
            <p className="text-amber-200/70 text-sm mt-1">
              These services cost between {Math.min(...externalSupportServices.map((s) => s.cost))}-
              {Math.max(...externalSupportServices.map((s) => s.cost))} credits each. 
              You may not need all of them to solve the case. Consider your budget carefully!
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {externalSupportServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isPurchased={purchasedServiceIds.includes(service.id)}
            canAfford={canAfford(service.cost)}
            onSelect={handleSelectService}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
          <span className="text-slate-400 text-sm">Services Purchased: </span>
          <span className="text-cyan-400 font-medium">
            {purchasedServiceIds.length}/{externalSupportServices.length}
          </span>
        </div>
        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
          <span className="text-slate-400 text-sm">Credits Spent: </span>
          <span className="text-amber-400 font-medium">
            {purchasedServiceIds.reduce((sum, id) => {
              const service = getServiceById(id);
              return sum + (service?.cost ?? 0);
            }, 0)}
          </span>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="text-slate-300 font-medium">Pro Tip</h4>
            <p className="text-slate-500 text-sm mt-1">
              The Meta Support Ticket unlocks the Recovery Phase, which you'll need to 
              complete the game. Other services provide evidence that can strengthen 
              your case against suspects.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirm && selectedService !== null} onClose={handleCancel}>
        {selectedService && (
          <ConfirmDialog
            service={selectedService}
            canAfford={canAfford(selectedService.cost)}
            onConfirm={handleConfirmPurchase}
            onCancel={handleCancel}
          />
        )}
      </Modal>

      {/* Response Modal */}
      <Modal isOpen={showResponse && selectedService !== null} onClose={handleCloseResponse}>
        {selectedService && (
          <ServiceResponse
            service={selectedService}
            onClose={handleCloseResponse}
          />
        )}
      </Modal>
    </div>
  );
}
