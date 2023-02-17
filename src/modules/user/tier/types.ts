import { Membership } from 'modules';

export type Tier = {
   tier_id: number;
   tier: Membership['tier'];
   lates_claim: number | null;
   monthly_trx: number;
   reff: number;
}
