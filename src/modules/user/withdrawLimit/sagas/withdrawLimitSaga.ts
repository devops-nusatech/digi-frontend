import { getCsrfToken } from 'helpers';
import { call, put } from 'redux-saga/effects';
import { WithdrawLimit } from './../types';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import {
   withdrawLimitData,
   withdrawLimitError,
   WithdrawLimitFetch,
} from '../actions';

const withdrawOption = (csrfToken?: string): RequestOptions => ({
   apiVersion: 'peatio',
   headers: { 'X-CSRF-Token': csrfToken },
});

export function* withdrawLimitSaga(action: WithdrawLimitFetch) {
   try {
      const withdrawLimit: WithdrawLimit = yield call(
         API.get(withdrawOption(getCsrfToken())),
         '/account/withdraws/sums'
      );
      yield put(withdrawLimitData(withdrawLimit));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: withdrawLimitError,
            },
         })
      );
   }
}
