import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import {
   userOrdersHistoryData,
   userOrdersHistoryError,
   UserOrdersHistoryFetch,
} from '../actions';

const ordersOptions: RequestOptions = {
   apiVersion: 'peatio',
};

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
   try {
      const {
         pageIndex,
         limit,
         core,
         market,
         time_from,
         time_to,
         type,
         ord_type,
         order_by,
      } = action.payload;
      const params =
         core === 'all'
            ? ''
            : `${typeof market !== 'undefined' ? `&market=${market}` : ''}${
                 typeof type !== 'undefined' && type !== ''
                    ? `&type=${type}`
                    : ''
              }${
                 typeof ord_type !== 'undefined' && ord_type !== ''
                    ? `&ord_type=${ord_type}`
                    : ''
              }${
                 typeof order_by !== 'undefined' && order_by !== ''
                    ? `&order_by=${order_by}`
                    : ''
              }${
                 typeof time_from !== 'undefined'
                    ? `&time_from=${time_from}`
                    : ''
              }${
                 typeof time_to !== 'undefined' ? `&time_to=${time_to}` : ''
              }&state[]=wait&state[]=trigger_wait`;
      const data = yield call(
         API.get(ordersOptions),
         `/market/orders?page=${pageIndex + 1}&limit=${limit}${params}`
      );
      let nextPageExists = false;

      if (data.length === limit) {
         const checkData = yield call(
            API.get(ordersOptions),
            `/market/orders?page=${
               (pageIndex + 1) * limit + 1
            }&limit=${1}${params}`
         );

         if (checkData.length === 1) {
            nextPageExists = true;
         }
      }

      yield put(
         userOrdersHistoryData({ list: data, nextPageExists, pageIndex })
      );
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: userOrdersHistoryError,
            },
         })
      );
   }
}
