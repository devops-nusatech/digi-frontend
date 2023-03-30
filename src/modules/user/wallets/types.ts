export interface Wallet {
   currency: string;
   name: string;
   type: 'fiat' | 'coin';
   fixed: number;
   account_type: string;
   balance?: string;
   locked?: string;
   iconUrl?: string;
   active?: boolean;
   deposit_addresses?: WalletAddress[];
   virtual_account?: VirtualAccount[];
   networks: WalletBlockchain[];
   status?: string;
}

export interface WalletBlockchain {
   blockchain_key: string;
   currency_id?: string;
   deposit_enabled?: boolean;
   withdrawal_enabled?: boolean;
   deposit_fee?: string;
   min_deposit_amount?: string;
   withdraw_fee: string;
   min_withdraw_amount?: string;
   base_factor?: number;
   explorer_transaction?: string;
   explorer_address?: string;
   description?: string;
   warning?: string;
   protocol: string;
   min_confirmations?: number;
   parent_id?: string;
}

export interface WalletAddress {
   address: string;
   currencies: string[];
   state?: string;
   blockchain_key: string;
}

export interface WalletWithdrawCCY {
   amount: string;
   currency: string;
   otp: string;
   beneficiary_id: string;
}
export interface WalletTransfer {
   amount: string;
   currency: string;
   otp: string;
   username_or_uid: string;
}

export interface WalletWithdrawFiat {
   amount: string;
   currency: string;
   currency_type: string;
   otp: string;
   beneficiary_id: string;
}

export interface AccountInterface {
   currency: string;
   balance?: string;
   locked?: string;
   deposit_address?: WalletAddress;
}

export type Balance = {
   balance: string;
   currency: string;
   deposit_addresses?: WalletAddress[];
   locked: string;
   virtual_account?: VirtualAccount[];
};

export type VirtualAccount = {
   currency_id: string;
   bank: string;
   number: string;
   merchant_code: number;
   name: string;
};
