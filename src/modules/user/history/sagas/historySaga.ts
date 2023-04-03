import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, defaultStorageLimit, RequestOptions } from '../../../../api';
import { getHistorySagaParam, sliceArray } from '../../../../helpers';
import { failHistory, HistoryFetch, successHistory } from '../actions';

const config: RequestOptions = {
   apiVersion: 'peatio',
};

type CoreEndpoint = {
   transactions: string;
   deposits: string;
   withdraws: string;
   trades: string;
   transfers: string;
};

export function* historySaga(action: HistoryFetch) {
   try {
      const { core, limit, page } = action.payload;
      const coreEndpoint: CoreEndpoint = {
         transactions: '/account/transactions',
         deposits: '/account/deposits',
         withdraws: '/account/withdraws',
         trades: '/market/trades',
         transfers: '/account/internal_transfers',
      };
      const params = getHistorySagaParam(action.payload);
      const data = yield call(
         API.get(config),
         `${coreEndpoint[core]}?${params}`
      );

      let nextPageExists = false;

      if (limit && data.length === limit) {
         const testActionPayload = {
            ...action.payload,
            page: (page + 1) * limit,
            limit: 1,
         };
         const testParams = getHistorySagaParam(testActionPayload);
         const checkData = yield call(
            API.get(config),
            `${coreEndpoint[core]}?${testParams}`
         );

         if (checkData.length === 1) {
            nextPageExists = true;
         }
      }
      let updatedData = data;

      if (core === 'trades') {
         updatedData = sliceArray(data, defaultStorageLimit());
      }

      yield put(successHistory({ list: updatedData, page, nextPageExists }));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: failHistory,
            },
         })
      );
   }
}
