import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { registerData, registerError, registerFetch, registerRequireVerification } from '../actions';

const registerConfig: RequestOptions = {
    apiVersion: 'barong',
};

export function* registerSaga(action: registerFetch) {
    try {
        yield call(API.post(registerConfig), '/identity/users', action.payload);
        yield put(registerRequireVerification({ requireVerification: true }));
        yield put(registerData());
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: registerError,
            },
        }));
    }
}
