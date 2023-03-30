import { call, put } from 'redux-saga/effects';
import {
   marketsData,
   currenciesData,
   tradingFeesData,
   withdrawLimitsData,
   setBlocklistStatus,
   sendError,
   blockchainsData,
   membershipsData
} from 'modules';
import { API, RequestOptions } from 'api';
import { configsData, configsError } from '../actions';

const configsOptions: RequestOptions = {
   apiVersion: 'peatio',
};

export function* configsFetchSaga() {
   try {
      const { currencies, markets, trading_fees, tier_fees, withdraw_limits, blockchains } = yield call(
         API.get(configsOptions),
         '/public/config'
      );
      yield put(currenciesData(currencies));
      yield put(marketsData(markets));
      yield put(withdrawLimitsData(withdraw_limits));
      yield put(tradingFeesData(trading_fees));
      yield put(membershipsData(tier_fees));
      yield put(blockchainsData(blockchains));
      yield put(configsData());
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
