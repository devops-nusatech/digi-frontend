import { call, put } from 'redux-saga/effects';
import { sendError } from 'modules';
import { airdropsData, airdropsError } from '../actions';
import { Airdrop } from './../types';

import axios from 'axios';

const fetchAirdrops = async () => {
   const url = 'http://149.28.140.240:8080/v2/airdrop/list';
   const { data } = await axios.get<Airdrop>(url);
   return data;
};

export function* airdropsSaga() {
   try {
      const airdrops: Airdrop[] = yield call(fetchAirdrops);
      yield put(airdropsData(airdrops));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: airdropsError,
         },
      }));
   }
}
