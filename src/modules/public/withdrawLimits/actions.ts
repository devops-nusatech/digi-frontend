import { WITHDRAW_LIMITS_DATA } from './constants';
import { WithdrawLimits } from './types';

export interface WithdrawLimitsData {
   type: typeof WITHDRAW_LIMITS_DATA;
   payload: WithdrawLimits[];
}
export type WithdrawLimitsAction = WithdrawLimitsData;

export const withdrawLimitsData = (payload: WithdrawLimitsData['payload']): WithdrawLimitsData => ({
   type: WITHDRAW_LIMITS_DATA,
   payload,
});
