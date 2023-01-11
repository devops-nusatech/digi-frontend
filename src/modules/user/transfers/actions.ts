import { CommonError } from 'modules';
import { TRANSFER_CREATE, TRANSFER_SUCCESS, TRANSFER_ERROR } from './constants';
import { Transfer } from './types';

export interface TransferCreate {
   type: typeof TRANSFER_CREATE;
   payload: Transfer
};
export interface TransferSuccess {
   type: typeof TRANSFER_SUCCESS;
};
export interface TransferError {
   type: typeof TRANSFER_ERROR;
   error: CommonError;
};
export type TransferAction = TransferCreate | TransferSuccess | TransferError;


export const transferCreate = (payload: TransferCreate['payload']): TransferCreate => ({
   type: TRANSFER_CREATE,
   payload
});
export const transferSuccess = (): TransferSuccess => ({
   type: TRANSFER_SUCCESS,
});
export const transferError = (error: CommonError): TransferError => ({
   type: TRANSFER_ERROR,
   error,
});
