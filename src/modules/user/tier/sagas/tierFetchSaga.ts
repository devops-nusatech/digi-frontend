import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { sendError } from '../../..';
import { tierData, tierError } from '../actions';
import { Tier } from '../types';

const fetchTier = async () => {
   const url = 'http://149.28.140.240:8080/v2/tier_user/mytier';
   const { data } = await axios.get<Tier>(url);
   return data;
};

export function* tierFetchSaga() {
   try {
      const tier: Tier = yield call(fetchTier);
      yield put(tierData(tier));
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: tierError,
            },
         })
      );
   }
}
