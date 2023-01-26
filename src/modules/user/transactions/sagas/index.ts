import { takeLatest } from 'redux-saga/effects';
import { TRANSACTIONS_FETCH } from '../constants';
import { transactionsSaga } from './transactionsSaga';

export function* rootTransactionsSaga() {
   yield takeLatest(TRANSACTIONS_FETCH, transactionsSaga);
}
