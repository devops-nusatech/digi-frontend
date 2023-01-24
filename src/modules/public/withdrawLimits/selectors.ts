import { RootState } from '../..';
import { WithdrawLimitsState } from './reducer';
import { WithdrawLimits } from './types';

const selectWithdrawLimitsState = (state: RootState): WithdrawLimitsState => state.public.withdrawLimits;

export const selectWithdrawLimits = (state: RootState): WithdrawLimits[] =>
   selectWithdrawLimitsState(state).list;
