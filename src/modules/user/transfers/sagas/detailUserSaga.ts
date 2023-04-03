import { call, put } from 'redux-saga/effects';
import { sendError } from 'modules';
import { API, RequestOptions } from 'api';
import { getCsrfToken } from 'helpers';
import { detailUserData, DetailUserCreate, detailUserError } from '../actions';

const detailUserOptions = (csrfToken?: string): RequestOptions => ({
   apiVersion: 'barong',
   headers: { 'X-CSRF-Token': csrfToken },
});

export function* detailUserSaga(action: DetailUserCreate) {
   try {
      const detailUser = yield call(
         API.post(detailUserOptions(getCsrfToken())),
         '/public/uid',
         action.payload
      );
      yield put(detailUserData(detailUser));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: detailUserError,
            },
         })
      );
   }
}
