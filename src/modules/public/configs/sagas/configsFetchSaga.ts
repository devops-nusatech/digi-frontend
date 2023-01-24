import { call, put } from 'redux-saga/effects';
import { sendError, tradingFeesData, withdrawLimitsData } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { setBlocklistStatus } from '../../blocklistAccess';
import { configsData, configsError, ConfigsFetch } from '../actions';

const configsOptions: RequestOptions = {
   apiVersion: 'barong',
};

const configsOtherOptions: RequestOptions = {
   apiVersion: 'peatio',
};

export function* configsFetchSaga(action: ConfigsFetch) {
   try {
      const configs = yield call(API.get(configsOptions), '/identity/configs');
      const { withdraw_limits, trading_fees } = yield call(API.get(configsOtherOptions), '/public/config');
      yield put(configsData(configs));
      yield put(withdrawLimitsData(withdraw_limits));
      yield put(tradingFeesData(trading_fees));
      yield put(setBlocklistStatus({ status: 'allowed' }));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: configsError,
         },
      }));
   }
}
