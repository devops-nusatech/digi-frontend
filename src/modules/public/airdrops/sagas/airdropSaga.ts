import { call, put } from 'redux-saga/effects';
import { sendError } from 'modules';
import { airdropData, airdropError, AirdropFetch } from '../actions';
import { Airdrop, AirdropDetail } from './../types';

import axios from 'axios';

const fetchAirdrop = async (payload: AirdropFetch['payload']) => {
   const url = `http://149.28.140.240:8080/v2/airdrop/detail/${payload.id}`;
   const { data } = await axios.get<Airdrop>(url);
   return data;
};

export function* airdropSaga(action: AirdropFetch) {
   try {
      const airdrop: AirdropDetail = yield call(fetchAirdrop, action.payload);
      yield put(airdropData(airdrop));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: airdropError,
         },
      }));
   }
}
