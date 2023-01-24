import { WithdrawLimit } from './../types';
import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { withdrawLimitData, withdrawLimitError, WithdrawLimitFetch } from '../actions';
import { getCsrfToken } from 'helpers';

const withdrawOption = (csrfToken?: string): RequestOptions => ({
   apiVersion: 'peatio',
   headers: { 'X-CSRF-Token': csrfToken },
});

export function* withdrawLimitSaga(action: WithdrawLimitFetch) {
   try {
      const withdrawLimit: WithdrawLimit = yield call(API.get(withdrawOption(getCsrfToken())), '/account/withdraws/sums');
      yield put(withdrawLimitData(withdrawLimit));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: withdrawLimitError,
         },
      }));
   }
}
