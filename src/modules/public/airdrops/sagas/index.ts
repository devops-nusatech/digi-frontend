import { takeLeading, takeLatest } from 'redux-saga/effects';
import { AIRDROPS_FETCH, AIRDROP_FETCH } from '../constants';
import { airdropsSaga } from './airdropsSaga';
import { airdropSaga } from './airdropSaga';

export function* rootAirdropsSaga() {
   yield takeLeading(AIRDROPS_FETCH, airdropsSaga);
   yield takeLatest(AIRDROP_FETCH, airdropSaga);
}
