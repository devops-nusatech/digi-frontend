import { takeLeading } from 'redux-saga/effects';
import { NEWS_FETCH } from '../constants';
import { newsFetchSaga } from './newsFetchSaga';

export function* rootNewsSaga() {
   yield takeLeading(NEWS_FETCH, newsFetchSaga)
}
