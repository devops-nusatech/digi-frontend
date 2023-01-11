import { Beneficiary, Ticker } from 'modules';

export interface Params {
   id: string;
}

export type WalletType = 'fiat' | 'coin';

export const defaultBeneficiary: Beneficiary = {
   id: 0,
   currency: '',
   name: '',
   state: '',
   data: {
       address: '',
   },
};


export const defaultTicker: Ticker = {
   amount: '0',
   avg_price: '0',
   high: '0',
   last: '0',
   low: '0',
   open: '0',
   price_change_percent: '+0.00%',
   volume: '0'
};
