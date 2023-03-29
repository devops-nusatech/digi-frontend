import { Market, PrivateTrade, PublicTrade, Ticker } from 'modules';

export interface Translate {
   translate: (id: string) => string;
}

export type PublicTrades = {
   marketTrades: PublicTrade[];
};
export type PrivateTrades = {
   myTrades: PrivateTrade[];
};

export type CurrentMarket = {
   currentMarket: Market;
};

export type IsDisplay = {
   display: boolean;
};

export type MarketTicker = {
   marketTickers: {
      [key: string]: Ticker;
   };
};

export interface Push {
   push: (location: string, state?: unknown) => void;
}

export interface OnClick {
   onClick: (e?: any) => void;
}
export interface SetCurrentPrice {
   setCurrenPrice: (price: number) => void;
}

export type Direction = 'ascending' | 'descending' | '';

export type IsLoading = {
   isLoading?: boolean;
};
