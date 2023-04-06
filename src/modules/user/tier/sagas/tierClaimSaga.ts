import { call, put } from 'redux-saga/effects';
import { sendError } from 'modules';
import { API, RequestOptions } from 'api';
import { tierClaimData, tierClaimError } from '../actions';
import { getCsrfToken } from 'helpers';

const tierClaimOptions = (csrfToken?: string): RequestOptions => {
   return {
      apiVersion: 'peatio',
      headers: { 'X-CSRF-Token': csrfToken },
   };
};

export function* tierClaimSaga() {
   try {
      const tier = yield call(
         API.post(tierClaimOptions(getCsrfToken())),
         'account/tiers/claim'
      );
      yield put(tierClaimData(tier));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: tierClaimError,
            },
         })
      );
   }
}
