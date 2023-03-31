import { CommonState } from '../../types';
import { GroupMemberAction } from './actions';
import {
   PROFILE_GROUP_FETCH,
   PROFILE_GROUP_DATA,
   PROFILE_GROUP_ERROR,
} from './constants';
import { GroupMember } from './types';

export interface GroupMemberState extends CommonState {
   data: GroupMember;
}

const initialGroupMemberState: GroupMemberState = {
   data: {
      uid: '',
      email: '',
      tier: '',
      alltime_trx: '',
      sum_reff: 0,
      history_claims: [],
      p2p_stats: {
         name: '',
         logo: '',
         offers_count: 0,
         success_rate: 0,
         banned_state: '',
      },
      p2p_tier: {
         id: 0,
         tier: '',
         requirement: {
            kyc: 0,
            min_transaction: 0,
            min_rate_positif: 0,
         },
         benefit: {
            fee_transaction: {
               maker_fee: '',
               taker_fee: '',
            },
            recomendation: '',
            highlight: '',
            badge_merchant: '',
            max_transaction: '',
         },
      },
      group: 'vip-0',
   },
};

export const groupMemberReducer = (
   state = initialGroupMemberState,
   action: GroupMemberAction
) => {
   switch (action.type) {
      case PROFILE_GROUP_FETCH:
         return {
            ...state,
            loading: true,
            success: false,
         };
      case PROFILE_GROUP_DATA:
         return {
            ...state,
            loading: false,
            success: true,
            data: action.payload,
         };
      case PROFILE_GROUP_ERROR:
         return {
            ...state,
            loading: false,
            success: false,
            error: action.error,
         };
      default:
         return state;
   }
};
