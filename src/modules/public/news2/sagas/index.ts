import { takeLeading } from 'redux-saga/effects';
import { NEWS2_FETCH } from '../constants';
import { news2FetchSaga } from './newsFetchSaga';

export function* rootNews2Saga() {
   yield takeLeading(NEWS2_FETCH, news2FetchSaga)
}
