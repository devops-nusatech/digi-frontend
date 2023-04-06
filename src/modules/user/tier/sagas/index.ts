import { takeLeading } from 'redux-saga/effects';
import { TIER_CLAIM_FETCH } from '../constants';
import { tierClaimSaga } from './tierClaimSaga';

export function* rootTierSaga() {
   yield takeLeading(TIER_CLAIM_FETCH, tierClaimSaga);
}
