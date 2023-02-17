import { CommonState } from '../../types';
import { AirdropsAction } from './actions';
import {
   AIRDROPS_DATA,
   AIRDROPS_ERROR,
   AIRDROPS_FETCH,
   AIRDROP_DATA,
   AIRDROP_ERROR,
   AIRDROP_FETCH,
} from './constants';
import { Airdrop, AirdropDetail, PeriodStatus, Phase } from './types';

export interface AirdropsState extends CommonState {
   list: Airdrop[];
   airdrop: AirdropDetail;
   loadingDetail: boolean;
   timestamp?: number;
}

const defaultAirdropDetail: AirdropDetail = {
   amount_reward: 0,
   reward_currency: '',
   verified_user: 0,
   reff_status: false,
   reff_reward: 0,
   reff_max: 0,
   details: {
      currency_id: '',
      about: '',
      facebook: '',
      twitter: '',
      website: '',
      white_paper: '',
      medium: '',
      telegram_group: '',
      instragam: '',
   },
   id: '',
   title: '',
   status: '',
   user_joined: 0,
   price_pool: 0,
   user_max: 0,
   image: '',
   requirement: {
      tier: '',
      transaction: false,
      pair: '',
      vol: 0
   },
   task: [
      {
         id_step: 0,
         title: '',
         type: '',
         link: '',
         api_key: '',
         system_checking: '',
      },
   ],
   periods: [
      {
         phase: Phase.Airdrop,
         start: 1673945851,
         end: 1673945851,
         status: PeriodStatus.Runing,
      }
   ]
}

export const initialAirdropsState: AirdropsState = {
   list: [],
   airdrop: defaultAirdropDetail,
   loadingDetail: false
};

export const airdropsReducer = (state = initialAirdropsState, action: AirdropsAction) => {
   switch (action.type) {
      case AIRDROPS_FETCH:
         return {
            ...state,
            loading: true,
            timestamp: Math.floor(Date.now() / 1000),
         };
      case AIRDROPS_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload,
         };
      case AIRDROPS_ERROR:
      case AIRDROP_FETCH:
         return {
            ...state,
            loadingDetail: true,
         };
      case AIRDROP_DATA:
         return {
            ...state,
            loadloadingDetailing: false,
            airdrop: action.payload,
         };
      case AIRDROP_ERROR:
         return {
            ...state,
            loadloadingDetailing: false,
            error: action.error
         };
      default:
         return state;
   }
};
