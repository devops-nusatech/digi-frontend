import { takeEvery, takeLatest } from 'redux-saga/effects';
import { TRANSFER_CREATE, DETAIL_USER_CREATE } from '../constants';
import { transferSaga } from './transferSaga';
import { detailUserSaga } from './detailUserSaga';

export function* rootTransferSaga() {
   yield takeEvery(TRANSFER_CREATE, transferSaga);
   yield takeLatest(DETAIL_USER_CREATE, detailUserSaga);
}
