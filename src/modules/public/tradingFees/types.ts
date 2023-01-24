export type TradingFee = {
   id: number;
   group: string;
   market_id: string;
   market_type: 'spot' | 'fiat';
   maker: number;
   taker: number;
   created_at: string;
   updated_at: string;
}
