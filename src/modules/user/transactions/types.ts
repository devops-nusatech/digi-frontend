export interface Transaction {
   address: string;
   currency: string;
   amount: string;
   fee: string;
   txid: string;
   state: string;
   note: string;
   confirmations: number;
   created_at: Date;
   updated_at: Date;
   type: string;
}
