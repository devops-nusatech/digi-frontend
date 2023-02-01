import { call, put } from 'redux-saga/effects';
import { news2Data, news2Error } from '../actions';
import { News2Fetch } from '../types';
import { sendError, News } from 'modules';
import axios from 'axios';

const fetchNews = async (action: News2Fetch['payload']) => {
   const apiKey2 = '42540eb9712803a79aaeb06f65';
   const url = `https://www.digiassetindo.com/blog/ghost/api/v3/content/posts/?key=${apiKey2}&limit=${action && action.limit
      }&filter=tag%3A${action && action.tag}`;
   const { data } = await axios.get<News>(url);
   return data;
};

export function* news2FetchSaga(action: News2Fetch) {
   try {
      const { posts }: { posts: News[] } = yield call(fetchNews, action.payload);
      // const { posts }: { posts: News[] } = yield call(fetchNews, {
      //    ...(typeof action.payload?.limit !== 'undefined' && {
      //       limit: action.payload?.limit,
      //    }),
      //    ...(typeof action.payload?.tag !== 'undefined' && {
      //       tag: action.payload?.tag,
      //    }),
      // });
      yield put(news2Data(posts));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: news2Error,
            },
         })
      );
   }
}
