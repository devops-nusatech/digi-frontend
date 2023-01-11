import { CommonError } from '../../types';
import {
    CONFIGS_DATA,
    CONFIGS_ERROR,
    CONFIGS_FETCH,
    SONIC_FETCH,
    SONIC_DATA,
    SONIC_ERROR
} from './constants';
import { Configs, Sonic } from './types';

export interface ConfigsFetch {
    type: typeof CONFIGS_FETCH;
}

export interface ConfigsData {
    type: typeof CONFIGS_DATA;
    payload: Configs;
}

export interface ConfigsError {
    type: typeof CONFIGS_ERROR;
    error: CommonError;
}
export interface SonicFetch {
    type: typeof SONIC_FETCH;
}

export interface SonicData {
    type: typeof SONIC_DATA;
    payload: Sonic;
}

export interface SonicError {
    type: typeof SONIC_ERROR;
    error: CommonError;
}

export type ConfigsAction =
    ConfigsFetch
    | ConfigsData
    | ConfigsError
    | SonicFetch
    | SonicData
    | SonicError;

export const configsFetch = (): ConfigsFetch => ({
    type: CONFIGS_FETCH,
});

export const configsData = (payload: ConfigsData['payload']): ConfigsData => ({
    type: CONFIGS_DATA,
    payload,
});

export const configsError = (error: CommonError): ConfigsError => ({
    type: CONFIGS_ERROR,
    error,
});

export const sonicFetch = (): SonicFetch => ({
    type: SONIC_FETCH,
});

export const sonicData = (payload: SonicData['payload']): SonicData => ({
    type: SONIC_DATA,
    payload,
});

export const sonicError = (error: CommonError): SonicError => ({
    type: SONIC_ERROR,
    error,
});
