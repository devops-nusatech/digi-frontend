import { call, put } from 'redux-saga/effects';
import { newsData, newsError } from '../actions';
import { News, NewsFetch } from '../types';
import { sendError } from 'modules';
import axios from 'axios';

const fetchNews = async (action: NewsFetch['payload']) => {
   const apiKey = '3c91665a1b107878484d3b3316';
   const url = `https://news.digiassetindo.com/ghost/api/v3/content/posts/?key=${apiKey}${typeof action?.limit !== 'undefined' && `&limit=${action?.limit}`
      }${typeof action?.tag !== 'undefined' && `&filter=tag%3A${action?.tag}`}`;
   const { data } = await axios.get<News>(url);
   return data;
};

export function* newsFetchSaga(action: NewsFetch) {
   try {
      const { posts }: { posts: News[] } = yield call(fetchNews, {
         ...(typeof action.payload?.limit !== 'undefined' && {
            limit: action.payload?.limit,
         }),
         ...(typeof action.payload?.tag !== 'undefined' && {
            tag: action.payload?.tag,
         }),
      });
      yield put(newsData(posts));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: newsError,
            },
         })
      );
   }
}
