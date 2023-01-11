import { CommonError } from './../../types';
import { ConfigUpdateDataType } from './types';
import { CONFIG_UPDATE_FETCH, CONFIG_UPDATE_DATA, CONFIG_UPDATE_ERROR } from './constants';

export interface ConfigUpdateFetch {
   type: typeof CONFIG_UPDATE_FETCH;
   payload: ConfigUpdateDataType;
}
export interface ConfigUpdateData {
   type: typeof CONFIG_UPDATE_DATA;
   payload: ConfigUpdateDataType;
}
export interface ConfigUpdateError {
   type: typeof CONFIG_UPDATE_ERROR;
   error: CommonError;
}

export type ConfigUpdateAction = ConfigUpdateFetch | ConfigUpdateData | ConfigUpdateError;

export const configUpdateFetch = (payload: ConfigUpdateFetch['payload']): ConfigUpdateFetch => ({
   type: CONFIG_UPDATE_FETCH,
   payload
});
export const configUpdateData = (payload: ConfigUpdateData['payload']): ConfigUpdateData => ({
   type: CONFIG_UPDATE_DATA,
   payload
});
export const configUpdateError = (error: CommonError): ConfigUpdateError => ({
   type: CONFIG_UPDATE_ERROR,
   error
});
