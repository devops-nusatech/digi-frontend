import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { transactionsData, transactionsError, TransactionsFetch } from '../actions';
import { Transaction } from '../types';

const requestOptions: RequestOptions = {
   apiVersion: 'peatio',
};

export function* transactionsSaga(action: TransactionsFetch) {
   try {
      const data: Transaction[] = yield call(API.get(requestOptions), '/account/transactions');
      yield put(transactionsData(data));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: transactionsError,
         },
      }));
   }
}
