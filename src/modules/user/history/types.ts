import { CommonState } from '../../types';
import { Transaction } from '../transactions';
export interface PublicTrade {
   id: number;
   price: string;
   total?: string;
   amount: string;
   market: string;
   created_at: string;
   taker_type: string;
   price_change?: string;
}

export interface PrivateTrade extends PublicTrade {
   side?: string;
   order_id?: number;
}

export interface PrivateTradeEvent {
   id: number;
   price: string;
   amount: string;
   total: string;
   fee_currency: string;
   fee: string;
   fee_amount: string;
   market: string;
   market_type: string;
   created_at: Date;
   taker_type: string;
   side: string;
   order_id: number;
}

export interface PrivateTradesState extends CommonState {
   list: PrivateTrade[];
}

export type MakerType = 'buy' | 'sell';

export interface Withdraw {
   id: number;
   currency: string;
   type: string;
   blockchain_key: string;
   amount: string;
   fee: string;
   blockchain_txid: string;
   rid: string;
   protocol: string;
   state: string;
   confirmations: number;
   note: null;
   transfer_type: string;
   created_at: Date;
   updated_at: Date;
   done_at: Date;
}

export interface Deposit {
   id: number;
   currency: string;
   blockchain_key: string;
   protocol: string;
   warning: null;
   amount: string;
   fee: string;
   txid: string;
   confirmations: number;
   state: string;
   transfer_type: string;
   created_at: Date;
   completed_at: Date;
   tid: string;
}


export interface InternalTransfer {
   currency: string;
   id: number;
   sender_username: string;
   receiver_username: string;
   sender_uid: string;
   receiver_uid: string;
   direction: string;
   amount: string;
   status: string;
   created_at: Date;
   updated_at: Date;
}

export type WalletHistoryElement = Withdraw | Deposit | PrivateTrade | InternalTransfer | Transaction;
export type WalletHistoryList = WalletHistoryElement[];
