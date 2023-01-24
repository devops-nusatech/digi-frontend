import { TRADING_FEES_DATA } from './constants';
import { TradingFee } from './types';

export interface TradingFeeData {
   type: typeof TRADING_FEES_DATA;
   payload: TradingFee[];
}
export type TradingFeesAction = TradingFeeData;

export const tradingFeesData = (payload: TradingFeeData['payload']): TradingFeeData => ({
   type: TRADING_FEES_DATA,
   payload,
});
