import { marketsData } from './../../markets/actions';
import { currenciesData } from './../../currencies/actions';
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
      const { withdraw_limits, trading_fees, currencies, markets } = yield call(API.get(configsOtherOptions), '/public/config');
      const configs = yield call(API.get(configsOptions), '/identity/configs');
      yield put(currenciesData(currencies));
      yield put(marketsData(markets));
      yield put(withdrawLimitsData(withdraw_limits));
      yield put(tradingFeesData(trading_fees));
      yield put(configsData(configs));
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
