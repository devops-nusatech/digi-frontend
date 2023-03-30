import { MEMBERSHIPS_DATA } from './constants';
import { Membership } from './types';

export interface MembershipsData {
   type: typeof MEMBERSHIPS_DATA;
   payload: Membership[];
}

export type MembershipsAction =  MembershipsData;

export const membershipsData = (payload: MembershipsData['payload']): MembershipsData => ({
   type: MEMBERSHIPS_DATA,
   payload,
});
