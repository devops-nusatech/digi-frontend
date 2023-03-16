import { call, put } from 'redux-saga/effects';
import { Membership, sendError } from '../../..';
import { membershipsData, membershipsError } from '../actions';

import axios from 'axios';

const fetchMemberships = async () => {
   const url = 'http://139.180.130.141:3000/api/v2/tiers/config';
   const { data } = await axios.get<Membership>(url);
   return data;
};

export function* membershipsFetchSaga() {
   try {
      const memberships: Membership[] = yield call(fetchMemberships);
      yield put(membershipsData(memberships));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: membershipsError,
         },
      }));
   }
}
