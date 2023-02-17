import { RootState } from '../..';
import { AirdropsState } from './reducer';
import { Airdrop, AirdropDetail } from './types';

const selectAirdropsState = (state: RootState): AirdropsState => state.public.airdrops;

export const selectAirdrops = (state: RootState): Airdrop[] =>
   selectAirdropsState(state).list;

export const selectAirdrop = (state: RootState): AirdropDetail =>
   selectAirdropsState(state).airdrop;

export const selectAirdropsLoading = (state: RootState): boolean | undefined =>
   selectAirdropsState(state).loading;

export const selectAirdropLoading = (state: RootState): boolean =>
   selectAirdropsState(state).loadingDetail;

export const selectAirdropsTimestamp = (state: RootState): number | undefined =>
   selectAirdropsState(state).timestamp;

export const selectShouldFetchAirdrops = (state: RootState): boolean =>
   !selectAirdropsTimestamp(state) && !selectAirdropsLoading(state);
