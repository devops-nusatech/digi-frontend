import { CommonError } from '../../types';
import {
   TIER_CLAIM_FETCH,
   TIER_CLAIM_DATA,
   TIER_CLAIM_ERROR,
} from './constants';
import { TierClaim } from './types';

export interface TierClaimFetch {
   type: typeof TIER_CLAIM_FETCH;
}

export interface TierClaimData {
   type: typeof TIER_CLAIM_DATA;
   payload: TierClaim;
}

export interface TierClaimError {
   type: typeof TIER_CLAIM_ERROR;
   error: CommonError;
}

export type TierAction = TierClaimFetch | TierClaimData | TierClaimError;

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
