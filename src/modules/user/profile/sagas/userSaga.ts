import { call, put, select } from 'redux-saga/effects';
import { API, RequestOptions } from 'api';
import { sendError, RootState, Membership, User } from 'modules';
import { userData, userError } from '../actions';

const userOptions: RequestOptions = {
   apiVersion: 'barong',
};

export const getMembership = (state: RootState) =>
   state.public.memberships.list;

export function* userSaga() {
   try {
      const user: User = yield call(API.get(userOptions), '/resource/users/me');
      const memberships: Membership[] = yield select(getMembership);
      if (!user?.myTier) {
         const myTier = memberships.find(
            e => e.tier.toLowerCase() === user.tier.toLowerCase()
         )!;
         yield put(userData({ user: { ...user, myTier } }));
      }
   } catch (error) {
      yield put(
         sendError({
            error,
            processingType: 'alert',
            extraOptions: {
               actionError: userError,
            },
         })
      );
   }
}
