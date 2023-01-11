export interface Currency {
   id: string;
   status: string;
   name: string;
   description: string;
   homepage: string;
   price: string;
   type: string;
   precision: number;
   position: number;
   icon_url: string;
   networks: Network[];
}

export interface Network {
   blockchain_key: string;
   currency_id: string;
   deposit_enabled: boolean;
   withdrawal_enabled: boolean;
   deposit_fee: string;
   min_deposit_amount: string;
   withdraw_fee: string;
   min_withdraw_amount: string;
   base_factor: number;
   explorer_transaction: string;
   explorer_address: string;
   description: string;
   warning: string;
   protocol: string;
   min_confirmations: number;
   parent_id: string;
}


// export interface Currency {
//     id: string;
//     name: string;
//     symbol: string;
//     explorer_transaction: string;
//     explorer_address: string;
//     type: string;
//     deposit_fee: string;
//     min_confirmations: number;
//     min_deposit_amount: string;
//     withdraw_fee: string;
//     min_withdraw_amount: string;
//     withdraw_limit_24h: string;
//     withdraw_limit_72h: string;
//     deposit_enabled: boolean;
//     withdrawal_enabled: boolean;
//     base_factor: number;
//     precision: number;
//     icon_url: string;
//     status: string;
// }
