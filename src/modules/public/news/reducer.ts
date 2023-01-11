import { NEWS_FETCH, NEWS_DATA, NEWS_ERROR } from './constants';
import { CommonState } from 'modules/types';
import { NewsActions } from './actions';
import { News } from './types';

export interface NewsState extends CommonState {
   list: News[];
   loading: boolean;
   timestamp?: number;
}

export const initialNewsState: NewsState = {
   list: [],
   loading: false
}

export const newsReducer = (state = initialNewsState, action: NewsActions) => {
   switch (action.type) {
      case NEWS_FETCH:
         return {
            ...state,
            loading: true,
            timestamp: Math.floor(Date.now() / 1000)
         };
      case NEWS_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload
         };
      case NEWS_ERROR:
         return {
            ...state,
            loading: false
         };
      default:
         return state;
   }
}
