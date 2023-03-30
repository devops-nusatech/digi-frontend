import { CommonError } from '../../types';
import {
   TIER_FETCH,
   TIER_DATA,
   TIER_ERROR,
   TIER_CLAIM_FETCH,
   TIER_CLAIM_DATA,
   TIER_CLAIM_ERROR,
} from './constants';
import { Tier } from './types';

export interface TierFetch {
   type: typeof TIER_FETCH;
}

export interface TierData {
   type: typeof TIER_DATA;
   payload: Tier;
}

export interface TierError {
   type: typeof TIER_ERROR;
   error: CommonError;
}

export interface TierClaimFetch {
   type: typeof TIER_CLAIM_FETCH;
}

export interface TierClaimData {
   type: typeof TIER_CLAIM_DATA;
   payload: {
      tier: number;
   };
}

export interface TierClaimError {
   type: typeof TIER_CLAIM_ERROR;
   error: CommonError;
}

export type TierAction =
   | TierFetch
   | TierData
   | TierError
   | TierClaimFetch
   | TierClaimData
   | TierClaimError;

export const tierFetch = (): TierFetch => ({
   type: TIER_FETCH,
});

export const tierData = (payload: TierData['payload']): TierData => ({
   type: TIER_DATA,
   payload,
});

export const tierError = (error: CommonError): TierError => ({
   type: TIER_ERROR,
   error,
});

export const tierClaimFetch = (): TierClaimFetch => ({
   type: TIER_CLAIM_FETCH,
});

export const tierClaimData = (
   payload: TierClaimData['payload']
): TierClaimData => ({
   type: TIER_CLAIM_DATA,
   payload,
});

export const tierClaimError = (error: CommonError): TierClaimError => ({
   type: TIER_CLAIM_ERROR,
   error,
});
