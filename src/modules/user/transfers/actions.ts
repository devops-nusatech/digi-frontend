import { CommonError, User } from 'modules';
import {
   TRANSFER_CREATE,
   TRANSFER_SUCCESS,
   TRANSFER_ERROR,
   DETAIL_USER_CREATE,
   DETAIL_USER_DATA,
   DETAIL_USER_ERROR,
} from './constants';
import { DetailUser, Transfer } from './types';

export interface TransferCreate {
   type: typeof TRANSFER_CREATE;
   payload: Transfer;
}
export interface TransferSuccess {
   type: typeof TRANSFER_SUCCESS;
}
export interface TransferError {
   type: typeof TRANSFER_ERROR;
   error: CommonError;
}

export interface DetailUserCreate {
   type: typeof DETAIL_USER_CREATE;
   payload: DetailUser;
}
export interface DetailUserData {
   type: typeof DETAIL_USER_DATA;
   payload: User;
}
export interface DetailUserError {
   type: typeof DETAIL_USER_ERROR;
   error: CommonError;
}
export type TransferAction =
   | TransferCreate
   | TransferSuccess
   | TransferError
   | DetailUserCreate
   | DetailUserData
   | DetailUserError;

export const transferCreate = (
   payload: TransferCreate['payload']
): TransferCreate => ({
   type: TRANSFER_CREATE,
   payload,
});
export const transferSuccess = (): TransferSuccess => ({
   type: TRANSFER_SUCCESS,
});
export const transferError = (error: CommonError): TransferError => ({
   type: TRANSFER_ERROR,
   error,
});
export const detailUserCreate = (
   payload: DetailUserCreate['payload']
): DetailUserCreate => ({
   type: DETAIL_USER_CREATE,
   payload,
});
export const detailUserData = (
   payload: DetailUserData['payload']
): DetailUserData => ({
   type: DETAIL_USER_DATA,
   payload,
});
export const detailUserError = (error: CommonError): DetailUserError => ({
   type: DETAIL_USER_ERROR,
   error,
});
