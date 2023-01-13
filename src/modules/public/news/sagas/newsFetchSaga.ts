import { call, put, takeLeading } from 'redux-saga/effects';
import { newsData, newsError } from '../actions';
import { NEWS_FETCH } from '../constants';
import { NewsFetch } from '../types';
import { sendError } from 'modules';
// import { RequestOptions } from 'api';

import axios from 'axios';

// const newsOptions: RequestOptions = {
//    apiVersion: 'news',
// };

export function* rootNewsSaga() {
   yield takeLeading(NEWS_FETCH, newsFetchSaga)
}

const newsUrl = (page?: string, limit?: string) => axios.get('https://news.digiassetindo.com/ghost/api/v3/content/posts/?key=3c91665a1b107878484d3b3316')

export function* newsFetchSaga(action: NewsFetch) {
   try {
      const news = yield call(newsUrl);
      yield put(newsData(news.data.posts));
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
