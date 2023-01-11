// import { CommonError } from 'modules';
import { TRANSFER_CREATE, TRANSFER_SUCCESS, TRANSFER_ERROR } from './constants';
// import { Transfer } from './types';
import { TransferAction } from './actions';

export interface TransferState {
   isLoading: boolean;
   isSuccess: boolean;
   isError: boolean;
};

export const initialTransferState: TransferState = {
   isLoading: false,
   isSuccess: false,
   isError: false
}

export const transferReducer = (state = initialTransferState, action: TransferAction) => {
   switch (action.type) {
      case TRANSFER_CREATE:
         return {
            isLoading: true,
            isSuccess: false,
            isError: false
         }
      case TRANSFER_SUCCESS:
         return {
            isLoading: false,
            isSuccess: true,
            isError: false
         }
      case TRANSFER_ERROR:
         return {
            isLoading: false,
            isSuccess: false,
            isError: true,
         }
      default:
         return state;
   }
}
