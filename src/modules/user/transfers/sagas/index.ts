import { takeEvery } from 'redux-saga/effects';
import { TRANSFER_CREATE } from '../constants';
import { transferSaga } from './transferSaga';

export function* rootTransferSaga() {
   yield takeEvery(TRANSFER_CREATE, transferSaga);
}
