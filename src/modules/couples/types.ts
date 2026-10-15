/**
 * Module: Couples & Family Formation (Future Extension Module)
 * Architectural Domain Boundary for private relational applications.
 *
 * Privacy & Consent Rule:
 * Each partner's information, shared reflections, permissions, and consent
 * must be explicitly distinguished. Linking accounts does NOT grant unrestricted
 * access to private individual draft reflections.
 */

export type PartnerConsentStatus = 'PENDING' | 'ACCEPTED' | 'REVOKED';

export interface CoupleProfile {
  id: string;
  partnerOneId: string;
  partnerTwoId: string;
  anniversaryDate?: Date;
  status: PartnerConsentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntimacyPrompt {
  id: string;
  category: 'EMOTIONAL' | 'SPIRITUAL' | 'COMMUNICATION' | 'APPRECIATION';
  promptId: string; // Translation key or text ID
  promptEn: string;
  recommendedDurationMinutes: number;
}

export interface CoupleCheckInSubmission {
  id: string;
  coupleId: string;
  partnerId: string;
  promptId: string;
  isSharedWithPartner: boolean; // Explicit partner consent flag
  sharedAt?: Date;
  notes?: string;
}

export interface ReconciliationStep {
  stepNumber: number;
  title: string;
  scriptureReference: string;
  reflectionPrompt: string;
}
