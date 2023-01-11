import { call, put } from 'redux-saga/effects';
import { sendError, Sonic } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { setBlocklistStatus } from '../../blocklistAccess';
import { sonicData, sonicError, SonicFetch } from '../actions';

const sonicOptions: RequestOptions = {
    apiVersion: 'sonic',
};

export function* sonicFetchSaga(action: SonicFetch) {
    try {
        const sonic: Sonic = yield call(API.get(sonicOptions), '/public/config');
        yield put(sonicData(sonic));
        yield put(setBlocklistStatus({ status: 'allowed' }));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: sonicError,
            },
        }));
    }
}
