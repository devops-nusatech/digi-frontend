import { CommonError } from 'modules/types';
import { NEWS2_FETCH, NEWS2_DATA, NEWS2_ERROR } from './constants';
import { News2Fetch, News2Data, News2Error } from './types';

export type News2Actions = News2Fetch | News2Data | News2Error;

export const news2Fetch = (payload: News2Fetch['payload']): News2Fetch => ({
   type: NEWS2_FETCH,
   payload
});

export const news2Data = (payload: News2Data['payload']): News2Data => ({
   type: NEWS2_DATA,
   payload
});

export const news2Error = (error: CommonError): News2Error => ({
   type: NEWS2_ERROR,
   error
})
