export * from './types';

/**
 * Architectural Extension Point for Our Covenant Love Couples App.
 *
 * When enabled in future releases:
 * 1. Database schema will introduce encrypted partner journals with zero-knowledge or separate tenant keys.
 * 2. Mobile applications (iOS/Android via React Native/Flutter) will connect to /api/v1/couples/* endpoints.
 * 3. Identity and session tokens will distinguish individual member vs shared couple context.
 */
export const COUPLES_MODULE_CONFIG = {
  version: '1.0.0-draft',
  status: 'STAGED_ARCHITECTURE',
  supportedPromptsCategories: ['EMOTIONAL', 'SPIRITUAL', 'COMMUNICATION', 'APPRECIATION'] as const,
};
