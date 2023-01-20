import { CommonError } from 'modules/types';
import { NEWS_FETCH, NEWS_DATA, NEWS_ERROR } from './constants';
import { NewsFetch, NewsData, NewsError } from './types';

export type NewsActions = NewsFetch | NewsData | NewsError;

export const newsFetch = (payload: NewsFetch['payload']): NewsFetch => ({
   type: NEWS_FETCH,
   payload
});

export const newsData = (payload: NewsData['payload']): NewsData => ({
   type: NEWS_DATA,
   payload
});

export const newsError = (error: CommonError): NewsError => ({
   type: NEWS_ERROR,
   error
})
