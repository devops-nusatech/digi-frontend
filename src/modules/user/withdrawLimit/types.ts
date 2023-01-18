// export interface WithdrawLimit {
//     limit: number | string;
//     period: number;
//     withdrawal_amount: number | string;
//     currency: string;
// }
export interface WithdrawLimit {
   id: number;
   group: string;
   kyc_level: string;
   limit_24_hour: string;
   limit_1_month: string;
   created_at?: string;
   updated_at?: string;
}
