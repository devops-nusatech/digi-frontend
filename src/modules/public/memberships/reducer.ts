import { MembershipsAction } from './actions';
import {
   MEMBERSHIPS_DATA,
} from './constants';
import { Membership } from './types';

export interface MembershipsState {
   list: Membership[];
}

export const initialMembershipsState: MembershipsState = {
   list: [],
};

export const membershipsReducer = (state = initialMembershipsState, action: MembershipsAction) => {
   switch (action.type) {
      case MEMBERSHIPS_DATA:
         return {
            ...state,
            list: action.payload,
         };
      default:
         return state;
   }
};
