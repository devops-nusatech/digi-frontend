import { RootState } from 'modules';
import { TierClaim } from './types';

export const selectTierClaimLoading = (state: RootState) =>
   state.user.tier.loading!;

export const selectTierClaim = (state: RootState): TierClaim =>
   state.user.tier.list!;
