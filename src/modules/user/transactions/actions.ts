import { CommonError } from '../../types';
import {
   TRANSACTIONS_FETCH,
   TRANSACTIONS_DATA,
   TRANSACTIONS_ERROR,
} from './constants';
import { Transaction } from './types';

export interface TransactionsFetch {
   type: typeof TRANSACTIONS_FETCH;
}

export interface TransactionData {
   type: typeof TRANSACTIONS_DATA;
   payload: Transaction[];
}

export interface TransactionsError {
   type: typeof TRANSACTIONS_ERROR;
   error: CommonError;
}

export type TransactionAction =
   | TransactionsFetch
   | TransactionData
   | TransactionsError;

export const transactionsFetch = (): TransactionsFetch => ({
   type: TRANSACTIONS_FETCH,
});

export const transactionsData = (
   payload: TransactionData['payload']
): TransactionData => ({
   type: TRANSACTIONS_DATA,
   payload,
});

export const transactionsError = (error: CommonError): TransactionsError => ({
   type: TRANSACTIONS_ERROR,
   error,
});
