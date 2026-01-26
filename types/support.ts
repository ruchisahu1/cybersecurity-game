// ============================================
// EXTERNAL SUPPORT TYPES
// ============================================

export type SupportClueStrength = 'none' | 'supporting' | 'strong' | 'ultimate';

export interface ExternalSupportService {
  id: string;
  name: string;
  provider: string;
  icon: string;
  cost: number;
  description: string;
  whatYouGet: string[];
  whatYouDontGet?: string[];
  response: string;
  unlocks: string[];
  unlocksRecoveryPhase: boolean;
  clueStrength: SupportClueStrength;
  pointsTo?: string; // suspect ID
}

export interface PurchasedService {
  serviceId: string;
  purchasedAt: number;
}
