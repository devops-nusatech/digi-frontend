import { RootState } from '../..';
import { MembershipsState } from './reducer';
import { Membership } from './types';

const selectMembershipsState = (state: RootState): MembershipsState => state.public.memberships;

export const selectMemberships = (state: RootState): Membership[] =>
   selectMembershipsState(state).list;
