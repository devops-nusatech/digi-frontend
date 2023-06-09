import { call, put } from 'redux-saga/effects';
import { alertPush, defaultUser, sendError } from 'modules';
import { API, RequestOptions } from 'api';
import { getCsrfToken } from 'helpers';
import {
   transferSuccess,
   TransferCreate,
   transferError,
   detailUserData,
} from '../actions';

const transferOptions = (csrfToken?: string): RequestOptions => ({
   apiVersion: 'peatio',
   headers: { 'X-CSRF-Token': csrfToken },
});

export function* transferSaga(action: TransferCreate) {
   try {
      yield call(
         API.post(transferOptions(getCsrfToken())),
         '/account/internal_transfers',
         action.payload
      );
      yield put(transferSuccess());
      yield put(
         alertPush({
            message: ['success.transfer.action'],
            type: 'success',
         })
      );
      yield put(detailUserData(defaultUser));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: transferError,
            },
         })
      );
   }
}
