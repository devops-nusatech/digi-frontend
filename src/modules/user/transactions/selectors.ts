import { CommonError } from './../../types';
import { RootState } from '../../';
import { Transaction } from './types';

export const selectTransactions = (state: RootState): Transaction[] =>
   state.user.transactions.list;

export const selectTransactionsloading = (state: RootState): boolean =>
   state.user.transactions.loading;

export const selectTransactionsError = (state: RootState): CommonError | undefined =>
   state.user.transactions.error;
