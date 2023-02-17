import { takeLeading } from 'redux-saga/effects';
import { MEMBERSHIPS_FETCH } from '../constants';
import { membershipsFetchSaga } from './membershipsFetchSaga';

export function* rootMembershipsSaga() {
   yield takeLeading(MEMBERSHIPS_FETCH, membershipsFetchSaga);
}
