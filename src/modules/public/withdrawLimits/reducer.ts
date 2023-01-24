import { CommonState } from '../../types';
import { WithdrawLimitsAction } from './actions';
import { WITHDRAW_LIMITS_DATA } from './constants';
import { WithdrawLimits } from './types';

export interface WithdrawLimitsState extends CommonState {
   list: WithdrawLimits[];
}

export const initialWithdrawLimitsState: WithdrawLimitsState = {
   list: [],
};

export const withdrawLimitsReducer = (state = initialWithdrawLimitsState, action: WithdrawLimitsAction) => {
   switch (action.type) {
      case WITHDRAW_LIMITS_DATA:
         return {
            ...state,
            list: action.payload,
         };
      default:
         return state;
   }
};
