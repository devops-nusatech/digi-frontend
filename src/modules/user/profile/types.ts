import { Label } from '../kyc';

export interface Profile {
   first_name: string;
   last_name: string;
   dob: string;
   address: string;
   postcode: string;
   city: string;
   country: string;
   state: string;
   created_at: string;
   updated_at: string;
   metadata?: string;
}

export interface Phone {
   country: string;
   number: string;
   validated_at: string | null;
}

export type ReferralID = {
   uid: string;
   username: string;
   email: string;
   level: number;
   tier: string;
   p2p_tier: string;
};

export type TierCuk =
   | 'bronze'
   | 'silver'
   | 'gold'
   | 'platinum'
   | 'diamond'
   | 'influencer'
   | '';

export type User = {
   email: string;
   uid: string;
   role: string;
   level: number;
   otp: boolean;
   state: string;
   referral_id: ReferralID[];
   referral_uid: string;
   data: string;
   tier: TierCuk;
   alltime_trx: string;
   username: string;
   labels: Label[];
   phones: Phone[];
   profiles: Profile[];
   data_storages: any[];
   created_at: string;
   updated_at: string;
};
