import { call, put } from 'redux-saga/effects';
import { Membership, sendError } from '../../..';
import { membershipsData, membershipsError } from '../actions';

import axios from 'axios';

const fetchMemberships = async () => {
   const url = 'http://149.28.140.240:8080/v2/tier_user/list_tier';
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
