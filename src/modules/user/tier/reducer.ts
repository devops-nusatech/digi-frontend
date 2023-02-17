import { CommonState } from '../../types';
import { TierAction } from './actions';
import {
   TIER_FETCH,
   TIER_DATA,
   TIER_ERROR,
   TIER_CLAIM_FETCH,
   TIER_CLAIM_DATA,
   TIER_CLAIM_ERROR
} from './constants';
import { Tier } from './types';

export type TierState = CommonState & {
   list: Tier;
}

export const defaultTier: Tier = {
   tier: '',
   lates_claim: 0,
   monthly_trx: 0,
   reff: 0,
   tier_id: 0
}

export const initialTierState: TierState = {
   list: defaultTier,
};

export const tierReducer = (state = initialTierState, action: TierAction) => {
   switch (action.type) {
      case TIER_FETCH:
         return {
            ...state,
            loading: true,
         };
      case TIER_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload,
         };
      case TIER_ERROR:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      case TIER_CLAIM_FETCH:
         return {
            ...state,
            loading: true,
         };
      case TIER_CLAIM_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload.tier,
         };
      case TIER_CLAIM_ERROR:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      default:
         return state;
   }
};
