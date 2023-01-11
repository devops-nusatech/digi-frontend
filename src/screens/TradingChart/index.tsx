import React from 'react'
import { TradingChart as Chart } from './configs'
import { useMarketsFetch, useMarketsTickersFetch } from 'hooks';

export const TradingChart = () => {
   useMarketsFetch();
   useMarketsTickersFetch();
   return <Chart />
}
