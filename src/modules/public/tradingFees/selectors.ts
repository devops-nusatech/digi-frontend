import { RootState } from '../..';
import { TradingFeesState } from './reducer';
import { TradingFee } from './types';

const selectTradingFeesState = (state: RootState): TradingFeesState => state.public.tradingFees;

export const selectTradingFees = (state: RootState): TradingFee[] =>
   selectTradingFeesState(state).list;
