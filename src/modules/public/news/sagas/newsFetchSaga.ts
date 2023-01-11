import { call, put, takeLeading } from 'redux-saga/effects';
import { newsData, newsError } from '../actions';
import { NEWS_FETCH } from '../constants';
import { NewsFetch } from '../types';
import { sendError } from 'modules';
import { API, RequestOptions } from 'api';

const newsOptions: RequestOptions = {
   apiVersion: 'news',
};

export function* rootNewsSaga() {
   yield takeLeading(NEWS_FETCH, newsFetchSaga)
}

export function* newsFetchSaga(action: NewsFetch) {
   try {
      const news = yield call(API.get(newsOptions), '/?key=3c91665a1b107878484d3b3316');
      yield put(newsData(news.posts));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: newsError
         }
      }));
   }
}
