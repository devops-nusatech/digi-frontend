export type Membership = {
   tier_id: number;
   tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'influencer' | '';
   unique: boolean;
   requirement: Requirement;
   benefit: Benefit;
}

export type Benefit = {
   claim: number;
   direct_reff: number;
   sub_reff: number;
   withdraw_limit_24: number;
   withdraw_limit_1month: number;
   maker_fee: number;
   taker_fee: number;
   trade_access: boolean;
   withdraw_access: boolean;
   p2p_access: boolean;
}

export type Requirement = {
   kyc: number;
   reff: number;
   trx_vol: number;
}
