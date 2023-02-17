import { CommonError } from '../../types';
import { MEMBERSHIPS_DATA, MEMBERSHIPS_ERROR, MEMBERSHIPS_FETCH } from './constants';
import { Membership } from './types';

export interface MembershipsFetch {
   type: typeof MEMBERSHIPS_FETCH;
}

export interface MembershipsData {
   type: typeof MEMBERSHIPS_DATA;
   payload: Membership[];
}

export interface MembershipsError {
   type: typeof MEMBERSHIPS_ERROR;
   error: CommonError;
}

export type MembershipsAction =
   MembershipsFetch
   | MembershipsData
   | MembershipsError;

export const membershipsFetch = (): MembershipsFetch => ({
   type: MEMBERSHIPS_FETCH,
});

export const membershipsData = (payload: MembershipsData['payload']): MembershipsData => ({
   type: MEMBERSHIPS_DATA,
   payload,
});

export const membershipsError = (error: CommonError): MembershipsError => ({
   type: MEMBERSHIPS_ERROR,
   error,
});
