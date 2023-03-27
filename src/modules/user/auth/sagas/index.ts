import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    AUTH_ENTROPY_PASSWORD_FETCH,
    AUTH_LOGOUT_FETCH,
    AUTH_LOGIN_FETCH,
    AUTH_REGISTER_FETCH,
    AUTH_VERIFICATION_FETCH,
} from '../constants';
import { entropyPassword } from './entropyPassword';
import { logoutSaga } from './logoutSaga';
import { loginSaga } from './loginSaga';
import { registerSaga } from './registerSaga';
import { verificationSaga } from './verificationSaga';

export function* rootAuthSaga() {
    yield takeEvery(AUTH_LOGIN_FETCH, loginSaga);
    yield takeEvery(AUTH_REGISTER_FETCH, registerSaga);
    yield takeEvery(AUTH_VERIFICATION_FETCH, verificationSaga);
    yield takeEvery(AUTH_LOGOUT_FETCH, logoutSaga);
    yield takeLatest(AUTH_ENTROPY_PASSWORD_FETCH, entropyPassword);
}
