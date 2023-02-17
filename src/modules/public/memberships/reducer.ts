import { CommonState } from '../../types';
import { MembershipsAction } from './actions';
import {
   MEMBERSHIPS_DATA,
   MEMBERSHIPS_ERROR,
   MEMBERSHIPS_FETCH,
} from './constants';
import { Membership } from './types';

export interface MembershipsState extends CommonState {
   list: Membership[];
   loading: boolean;
   timestamp?: number;
}

export const initialMembershipsState: MembershipsState = {
   list: [],
   loading: false,
};

export const membershipsReducer = (state = initialMembershipsState, action: MembershipsAction) => {
   switch (action.type) {
      case MEMBERSHIPS_FETCH:
         return {
            ...state,
            loading: true,
            timestamp: Math.floor(Date.now() / 1000),
         };
      case MEMBERSHIPS_DATA:
         return {
            ...state,
            loading: false,
            list: action.payload,
         };
      case MEMBERSHIPS_ERROR:
         return {
            ...state,
            loading: false,
         };
      default:
         return state;
   }
};
