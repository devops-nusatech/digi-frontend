import { CommonError, CommonState } from '../../types';
import {
   TRANSACTIONS_FETCH,
   TRANSACTIONS_DATA,
   TRANSACTIONS_ERROR
} from './constants';
import { Transaction } from './types'
import { TransactionAction } from './actions'

export interface TransactionsState extends CommonState {
   list: Transaction[];
   loading: boolean;
   error?: CommonError;
}

export const initialTransactionsState: TransactionsState = {
   list: [],
   loading: false,
};

export const transactionsReducer = (state = initialTransactionsState, action: TransactionAction) => {
   switch (action.type) {
      case TRANSACTIONS_FETCH:
         return {
            ...state,
            loading: true,
         };
      case TRANSACTIONS_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload,
         };
      case TRANSACTIONS_ERROR:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      default:
         return state;
   }
};
