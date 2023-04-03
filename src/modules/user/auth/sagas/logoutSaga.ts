import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from 'api';
import { sendError } from 'modules';
import { loginRequire2FA } from '../../auth';
import { resetHistory } from '../../history';
import { userOpenOrdersReset } from '../../openOrders';
import { userReset } from '../../profile';
import { logoutData, logoutError, LogoutFetch } from '../actions';

const requestOptions: RequestOptions = {
   apiVersion: 'barong',
};

export function* logoutSaga(action: LogoutFetch) {
   try {
      yield call(API.delete(requestOptions), '/identity/sessions');
      yield put(logoutData());
      yield put(userReset());
      localStorage.removeItem('csrfToken');
      yield put(userOpenOrdersReset());
      yield put(loginRequire2FA({ require2fa: false }));
      yield put(resetHistory());
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: logoutError,
            },
         })
      );
   }
}
