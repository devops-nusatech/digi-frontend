import { CommonError } from '../../types';
import {
   CONFIGS_DATA,
   CONFIGS_ERROR,
   CONFIGS_FETCH,
} from './constants';

export interface ConfigsFetch {
   type: typeof CONFIGS_FETCH;
}

export interface ConfigsData {
   type: typeof CONFIGS_DATA;
}

export interface ConfigsError {
   type: typeof CONFIGS_ERROR;
   error: CommonError;
}

export type ConfigsAction =
   ConfigsFetch
   | ConfigsData
   | ConfigsError;

export const configsFetch = (): ConfigsFetch => ({
   type: CONFIGS_FETCH,
});

export const configsData = (): ConfigsData => ({
   type: CONFIGS_DATA,
});

export const configsError = (error: CommonError): ConfigsError => ({
   type: CONFIGS_ERROR,
   error,
});
