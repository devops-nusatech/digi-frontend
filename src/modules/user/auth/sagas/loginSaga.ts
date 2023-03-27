import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { changeLanguage } from '../../../public/i18n';
import { userData } from '../../profile';
import {
   loginData,
   loginError,
   LoginFetch,
   loginRequire2FA,
   registerRequireVerification,
} from '../actions';

const sessionsConfig: RequestOptions = {
   apiVersion: 'barong',
};

export function* loginSaga(action: LoginFetch) {
   try {
      const user = yield call(API.post(sessionsConfig), '/identity/sessions', action.payload);

      if (user.state === 'pending') {
         yield put(registerRequireVerification({ requireVerification: true }));
      } else {
         if (user.data && JSON.parse(user.data).language) {
            yield put(changeLanguage(JSON.parse(user.data).language));
         }
         yield put(userData({ user }));

         localStorage.setItem('csrfToken', user.csrf_token);
         yield put(loginRequire2FA({ require2fa: user.otp }));
      }

      yield put(loginData());
   } catch (error) {
      if (error.code === 401 && error.message.indexOf('identity.session.missing_otp') > -1) {
         yield put(loginRequire2FA({ require2fa: true }));
         yield put(loginData());
      } else {
         yield put(sendError({
            error: error,
            processingType: 'alert',
            extraOptions: {
               actionError: loginError,
            },
         }));
      }
   }
}
