import { WithdrawLimit } from './../types';
import { call, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { withdrawLimitData, withdrawLimitError, WithdrawLimitFetch } from '../actions';

const withdrawOption: RequestOptions = {
   apiVersion: 'peatio',
};

export function* withdrawLimitSaga(action: WithdrawLimitFetch) {
   try {
      const withdrawLimit: WithdrawLimit[] = yield call(API.get(withdrawOption), '/public/withdraw_limits');
      yield put(withdrawLimitData(withdrawLimit));
      yield put(alertPush({ message: ['success.withdraw.action'], type: 'success' }));
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
