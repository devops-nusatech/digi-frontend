import { Membership } from 'modules';
import { Label } from '../kyc';

interface Profile {
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

interface Phone {
   country: string;
   number: string;
   validated_at: string | null;
}

type P2PTier = {
   id: number;
   name: string;
   maker_fee: string;
   taker_fee: string;
   max_transaction: string;
};

type ReferralID = {
   uid: string;
   username: string;
   email: string;
   level: number;
   tier: string;
   p2p_tier: string;
};

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
   tier: Membership['tier'];
   alltime_trx: string;
   p2p_tier: P2PTier;
   username: string;
   labels: Label[];
   phones: Phone[];
   profiles: Profile[];
   data_storages: any[];
   created_at: string;
   updated_at: string;
   myTier: Membership;
};
