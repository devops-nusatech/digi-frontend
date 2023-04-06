import { CommonState } from '../../types';
import { TierAction } from './actions';
import {
   TIER_CLAIM_FETCH,
   TIER_CLAIM_DATA,
   TIER_CLAIM_ERROR,
} from './constants';
import { TierClaim } from './types';

export type TierState = CommonState & {
   list?: TierClaim;
};

export const initialTierClaimState: TierState = {
   loading: false,
};

export const tierReducer = (
   state = initialTierClaimState,
   action: TierAction
) => {
   switch (action.type) {
      case TIER_CLAIM_FETCH:
         return {
            ...state,
            loading: true,
         };
      case TIER_CLAIM_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload,
         };
      case TIER_CLAIM_ERROR:
         return {
            ...state,
            loading: false,
            error: action.error,
         };
      default:
         return state;
   }
};
