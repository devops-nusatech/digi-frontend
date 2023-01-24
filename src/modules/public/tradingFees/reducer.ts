import { CommonState } from '../../types';
import { TradingFeesAction } from './actions';
import { TRADING_FEES_DATA } from './constants';
import { TradingFee } from './types';

export interface TradingFeesState extends CommonState {
   list: TradingFee[];
}

export const initialTradingFeesState: TradingFeesState = {
   list: [],
};

export const tradingFeesReducer = (state = initialTradingFeesState, action: TradingFeesAction) => {
   switch (action.type) {
      case TRADING_FEES_DATA:
         return {
            ...state,
            list: action.payload,
         };
      default:
         return state;
   }
};
