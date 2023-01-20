import { call, put } from 'redux-saga/effects';
import { newsData, newsError } from '../actions';
import { NewsFetch } from '../types';
import { sendError } from 'modules';
import axios from 'axios';

const fetchNews = (page?: string, limit?: string) => {
   const apiKey = '3c91665a1b107878484d3b3316';
   const url = `https://news.digiassetindo.com/ghost/api/v3/content/posts/?key=${apiKey}&limit=25&filter=tag%3Anews`
   const res = axios.get(url);
   return res;
}

export function* newsFetchSaga(action: NewsFetch) {
   try {
      const news = yield call(fetchNews);
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
