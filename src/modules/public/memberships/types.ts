export type Membership = {
   tier_id: number;
   tier:
      | 'bronze'
      | 'silver'
      | 'gold'
      | 'platinum'
      | 'diamond'
      | 'influencer'
      | '';
   unique: boolean;
   requirements: Requirement;
   benefits: Benefit;
};

export type Benefit = {
   claim: number;
   direct_reff: string;
   sub_reff: string;
   withdraw_limit_24: string;
   withdraw_limit_1month: string;
   maker_fee: string;
   taker_fee: string;
   trade_access: boolean;
   withdraw_access: boolean;
   p2p_access: boolean;
};

export type Requirement = {
   kyc: number;
   reff: number;
   trx_vol: number;
};
