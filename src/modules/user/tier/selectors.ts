import { RootState } from '../..';
import { TierState } from './reducer';
import { Tier } from './types';

const selectTierState = (state: RootState): TierState => state.user.tier;

export const selectTier = (state: RootState): Tier =>
   selectTierState(state).list;

export const selectTierLoading = (state: RootState): boolean | undefined =>
   selectTierState(state).loading;
