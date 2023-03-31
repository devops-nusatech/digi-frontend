export type GroupMember = {
   uid: string;
   email: string;
   tier: Tier;
   alltime_trx: string;
   sum_reff: number;
   history_claims: HistoryClaim[];
   p2p_stats: P2PStats;
   p2p_tier: P2PTier;
   group?: Group;
};

type Tier =
   | 'bronze'
   | 'silver'
   | 'gold'
   | 'platinum'
   | 'diamond'
   | 'influencer'
   | '';

type HistoryClaim = {
   name: string;
   trade_access: string;
   withdraw_access: string;
   p2p_access: string;
   is_claim: boolean | string;
   reward_claim: number;
   state: string;
};

type P2PStats = {
   name: string;
   logo: string;
   offers_count: number;
   success_rate: number;
   banned_state: string;
};

type P2PTier = {
   id: number;
   tier: string;
   requirement: Requirement;
   benefit: Benefit;
};

type Benefit = {
   fee_transaction: FeeTransaction;
   recomendation: string;
   highlight: string;
   badge_merchant: string;
   max_transaction: string;
};

type FeeTransaction = {
   maker_fee: string;
   taker_fee: string;
};

type Requirement = {
   kyc: number;
   min_transaction: number;
   min_rate_positif: number;
};

type Group =
   | 'vip-0'
   | 'vip-1'
   | 'vip-2'
   | 'vip-3'
   | 'any'
   | 'bot'
   | 'temporary';
