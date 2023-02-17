import { RootState } from '../..';
import { MembershipsState } from './reducer';
import { Membership } from './types';

const selectMembershipsState = (state: RootState): MembershipsState => state.public.memberships;

export const selectMemberships = (state: RootState): Membership[] =>
   selectMembershipsState(state).list;

export const selectMembershipsLoading = (state: RootState): boolean | undefined =>
   selectMembershipsState(state).loading;

export const selectMembershipsTimestamp = (state: RootState): number | undefined =>
   selectMembershipsState(state).timestamp;

export const selectShouldFetchMemberships = (state: RootState): boolean =>
   !selectMembershipsTimestamp(state) && !selectMembershipsLoading(state);
