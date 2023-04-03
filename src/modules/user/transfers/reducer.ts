// import { CommonError } from 'modules';
import {
   TRANSFER_CREATE,
   TRANSFER_SUCCESS,
   TRANSFER_ERROR,
   DETAIL_USER_CREATE,
   DETAIL_USER_DATA,
   DETAIL_USER_ERROR,
} from './constants';
// import { Transfer } from './types';
import { TransferAction } from './actions';
import { User, defaultUser } from 'modules';

export interface TransferState {
   isLoading: boolean;
   isSuccess: boolean;
   isError: boolean;
   detailUserLoading: boolean;
   detailUserData: User;
   detailUserError: boolean;
}

export const initialTransferState: TransferState = {
   isLoading: false,
   isSuccess: false,
   isError: false,
   detailUserLoading: false,
   detailUserData: defaultUser,
   detailUserError: false,
};

export const transferReducer = (
   state = initialTransferState,
   action: TransferAction
) => {
   switch (action.type) {
      case TRANSFER_CREATE:
         return {
            ...state,
            isLoading: true,
            isSuccess: false,
            isError: false,
         };
      case TRANSFER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            isSuccess: true,
            isError: false,
         };
      case TRANSFER_ERROR:
         return {
            ...state,
            isLoading: false,
            isSuccess: false,
            isError: true,
         };
      case DETAIL_USER_CREATE:
         return {
            ...state,
            detailUserLoading: true,
            detailUserError: false,
         };
      case DETAIL_USER_DATA:
         return {
            ...state,
            detailUserLoading: false,
            detailUserData: action.payload,
            detailUserError: false,
         };
      case DETAIL_USER_ERROR:
         return {
            ...state,
            detailUserLoading: false,
            detailUserData: false,
            detailUserError: true,
         };
      default:
         return state;
   }
};
