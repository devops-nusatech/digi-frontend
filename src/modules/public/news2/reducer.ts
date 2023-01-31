import { NEWS2_FETCH, NEWS2_DATA, NEWS2_ERROR } from './constants';
import { CommonState } from 'modules/types';
import { News2Actions } from './actions';
import { News } from 'modules';

export interface News2State extends CommonState {
   list: News[];
   loading: boolean;
   timestamp?: number;
}

export const initialNews2State: News2State = {
   list: [],
   loading: false
}

export const news2Reducer = (state = initialNews2State, action: News2Actions) => {
   switch (action.type) {
      case NEWS2_FETCH:
         return {
            ...state,
            loading: true,
            timestamp: Math.floor(Date.now() / 1000)
         };
      case NEWS2_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload
         };
      case NEWS2_ERROR:
         return {
            ...state,
            loading: false
         };
      default:
         return state;
   }
}
