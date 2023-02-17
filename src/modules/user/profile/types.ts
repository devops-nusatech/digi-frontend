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

export type User = {
   username?: string;
   email: string;
   level: number;
   otp: boolean;
   role: string;
   state: string;
   uid: string;
   profiles: Profile[];
   csrf_token?: string;
   data?: string;
   referal_uid: string | null;
   labels: Label[];
   phone: Phone[];
   group?: string;
   created_at: string;
   updated_at: string;
}


// export interface User {
//     uid: string;
//     username?: string;
//     email: string;
//     level: number;
//     otp: boolean;
//     state: string;
//     referal_uid: string | null;
//     //  referral_uid: string | null;
//     csrf_token?: string;
//     role: string;
//     data?: string;
//     profiles: Profile[];
//     labels: Label[];
//     phone: Phone[];
//    //  phone: Phone[];
//     data_storages?: any[];
//     created_at: string;
//     updated_at: string;
// }
