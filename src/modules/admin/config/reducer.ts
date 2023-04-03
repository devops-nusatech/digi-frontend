import { CommonError, CommonState } from './../../types';
import { ConfigUpdateDataType } from './types';
import { ConfigUpdateAction } from './actions';
import {
   CONFIG_UPDATE_FETCH,
   CONFIG_UPDATE_DATA,
   CONFIG_UPDATE_ERROR,
} from './constants';

export type ConfigUpdateState = CommonState & {
   data?: ConfigUpdateDataType;
   loading: boolean;
   success: boolean;
   error?: CommonError;
};

export const initialConfigUpdateState: ConfigUpdateState = {
   loading: false,
   success: false,
};

export const configUpdateReducer = (
   state = initialConfigUpdateState,
   action: ConfigUpdateAction
) => {
   switch (action.type) {
      case CONFIG_UPDATE_FETCH:
         return {
            ...state,
            loading: true,
            success: false,
            data: undefined,
         };
      case CONFIG_UPDATE_DATA:
         if (action.payload) {
         } else {
         }
         return {
            ...state,
            loading: false,
            success: true,
            data: action.payload,
         };

      case CONFIG_UPDATE_ERROR:
         return {
            ...state,
         };
      default:
         return state;
   }
};
