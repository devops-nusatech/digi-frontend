import { takeLeading } from 'redux-saga/effects';
import { TIER_FETCH } from '../constants';
import { tierFetchSaga } from './tierFetchSaga';

export function* rootTierSaga() {
   yield takeLeading(TIER_FETCH, tierFetchSaga);
}
