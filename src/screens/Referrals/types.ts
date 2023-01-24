export interface Referral {
   reff: number;
   reff_list: ReffList[];
   reff_active: number;
}

export interface ReffList {
   uid: string;
   tier: string;
   email: string;
   kyc_level: number;
}
