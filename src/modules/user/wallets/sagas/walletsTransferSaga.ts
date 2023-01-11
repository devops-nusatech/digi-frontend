import { call, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { getCsrfToken } from '../../../../helpers';
import { walletsTransferData, walletsTransferError, WalletsTransferFetch } from '../actions';

const walletsTransferOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'peatio',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* walletsTransferSaga(action: WalletsTransferFetch) {
   try {
      yield call(API.post(walletsTransferOptions(getCsrfToken())), '/account/internal_transfers', action.payload);
      yield put(walletsTransferData());
      yield put(alertPush({message: ['success.transfer.action'], type: 'success'}));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
               actionError: walletsTransferError,
         },
      }));
   }
}
