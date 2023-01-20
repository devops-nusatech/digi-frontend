import { takeLatest } from 'redux-saga/effects';
import { CONFIGS_FETCH, SONIC_FETCH } from '../constants';
import { configsFetchSaga } from './configsFetchSaga';
import { sonicFetchSaga } from './sonicFetchSaga';

export function* rootConfigsSaga() {
   yield takeLatest(CONFIGS_FETCH, configsFetchSaga);
   yield takeLatest(SONIC_FETCH, sonicFetchSaga);
}
