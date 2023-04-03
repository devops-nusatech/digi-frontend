
export type Membership = {
   id: number;
   tier: Tier;
   unique: string;
   requirement: Requirement;
   benefit: Benefit;
};

type Tier =
   | 'bronze'
   | 'silver'
   | 'gold'
   | 'platinum'
   | 'diamond'
   | 'influencer'
   | '';

type Benefit = {
   claim: string;
   direct_reff: string;
   sub_reff: string;
   withdraw_limit_24: string;
   withdraw_limit_1month: string;
   maker_fee: string;
   taker_fee: string;
   trade_access: string | boolean;
   withdraw_access: string | boolean;
   p2p_access: string;
};

type Requirement = {
   kyc: number;
   reff: number;
   trx_vol: string;
};
