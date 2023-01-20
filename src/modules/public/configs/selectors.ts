import { RootState } from '../..';
import { CommonError } from '../../types';
import { Configs, Sonic } from './types';

export const selectConfigs = (state: RootState): Configs =>
   state.public.configs.data;

export const selectSonic = (state: RootState): Sonic =>
   state.public.configs.sonic;

export const selectConfigsSuccess = (state: RootState): boolean =>
   state.public.configs.success;

export const selectConfigsLoading = (state: RootState): boolean =>
   state.public.configs.loading;

export const selectConfigsError = (state: RootState): CommonError | undefined =>
   state.public.configs.error;
